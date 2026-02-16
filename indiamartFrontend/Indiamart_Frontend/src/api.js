import { API_BASE } from './config';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Timeout wrapper — prevents requests from hanging forever on Render cold starts
function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .then((res) => { clearTimeout(id); return res; })
    .catch((err) => {
      clearTimeout(id);
      if (err.name === 'AbortError') throw new Error('Request timed out. Backend may be starting up — try again in 30s.');
      throw err;
    });
}

async function safeJson(res) {
  const text = await res.text();
  if (!text) {
    if (res.ok) return { status: true };
    throw new Error('Empty response from server.');
  }
  try {
    return JSON.parse(text);
  } catch {
    if (text.startsWith('<')) {
      throw new Error('Server returned a page instead of data. Is the backend running at ' + API_BASE + '?');
    }
    throw new Error(text || 'Invalid response from server.');
  }
}

// ── Product Cache ── instant loads on repeat visits
const PRODUCT_CACHE_KEY = 'cachedProducts';
const PRODUCT_CACHE_TS_KEY = 'cachedProductsTs';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedProducts() {
  try {
    const ts = parseInt(localStorage.getItem(PRODUCT_CACHE_TS_KEY) || '0');
    if (Date.now() - ts < CACHE_TTL) {
      const data = JSON.parse(localStorage.getItem(PRODUCT_CACHE_KEY));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}
  return null;
}

function setCachedProducts(products) {
  try {
    localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(products));
    localStorage.setItem(PRODUCT_CACHE_TS_KEY, String(Date.now()));
  } catch {}
}

export const setBudget = async (userId, token, budget) => {
  const response = await fetch(`${API_BASE}/user/${userId}/budget`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ budget }),
  });
  return safeJson(response);
};

export const getBudget = async (userId, token) => {
  const response = await fetch(`${API_BASE}/user/${userId}/budget`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return safeJson(response);
};

export const validateCartBudget = async (userId, token) => {
  const response = await fetch(`${API_BASE}/user/${userId}/cart/check-budget`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return safeJson(response);
};

export const getProducts = async (query = {}) => {
  const params = new URLSearchParams(query).toString();
  const response = await fetch(`${API_BASE}/products${params ? `?${params}` : ''}`);
  return safeJson(response);
};

export const getAllProducts = async () => {
  // Return cache instantly, refresh in background
  const cached = getCachedProducts();
  try {
    const response = await fetchWithTimeout(`${API_BASE}/allp`, {}, 10000);
    const data = await safeJson(response);
    const list = data.products || data || [];
    const arr = Array.isArray(list) ? list : [];
    if (arr.length > 0) setCachedProducts(arr);
    return { products: arr };
  } catch (err) {
    if (cached) return { products: cached, fromCache: true };
    throw err;
  }
};

export const getProduct = async (productId) => {
  const response = await fetchWithTimeout(`${API_BASE}/product/${productId}`, {}, 10000);
  return safeJson(response);
};

export const getPriceHistory = async (productId) => {
  const response = await fetchWithTimeout(`${API_BASE}/product/${productId}/price-history`, {}, 10000);
  return safeJson(response);
};

export const getBudgetPlans = async (budget) => {
  const budgetNum = parseFloat(budget);
  const userId = localStorage.getItem('userId') || 'guest';

  // Try backend first with short timeout
  try {
    const response = await fetchWithTimeout(`${API_BASE}/user/${userId}/budget-plan`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ budget: budgetNum }),
    }, 8000);
    const data = await safeJson(response);
    if (data.status && data.plans) return data;
  } catch {}

  // Client-side fallback: generate plans from cached/fetched products
  let products = getCachedProducts();
  if (!products || products.length === 0) {
    try {
      const res = await getAllProducts();
      products = res.products || [];
    } catch {
      return { status: false, message: 'Cannot reach server. Please try again.' };
    }
  }

  const byPrice = [...products].sort((a, b) => a.price - b.price);
  const byRating = [...products].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));

  const greedyPlan = (sorted) => {
    let plan = [], sum = 0;
    for (const p of sorted) {
      if (sum + p.price <= budgetNum) { plan.push(p); sum += p.price; }
    }
    return plan;
  };

  const plan1 = greedyPlan(byPrice);
  const plan2 = greedyPlan(byRating);

  // Plan 3: category variety
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
  let plan3 = [], sum3 = 0;
  for (const cat of cats) {
    const best = products.filter(p => p.category === cat).sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    for (const p of best) {
      if (sum3 + p.price <= budgetNum && !plan3.find(x => x._id === p._id)) {
        plan3.push(p); sum3 += p.price; break;
      }
    }
  }
  const plan3Ids = new Set(plan3.map(p => p._id));
  for (const p of byRating) {
    if (!plan3Ids.has(p._id) && sum3 + p.price <= budgetNum) {
      plan3.push(p); sum3 += p.price; plan3Ids.add(p._id);
    }
  }

  const plans = [plan1, plan2, plan3].filter(p => p.length > 0);
  return { status: true, plans, clientFallback: true };
};

export const createOrder = async (items, totalAmount, address) => {
  const response = await fetchWithTimeout(`${API_BASE}/order/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ items, totalAmount, address }),
  }, 12000);
  return safeJson(response);
};

export const getMyOrders = async () => {
  const response = await fetchWithTimeout(`${API_BASE}/order/my-orders`, {
    method: 'GET',
    headers: authHeaders(),
  }, 10000);
  return safeJson(response);
};

export const createPaymentOrder = async (amount, orderId) => {
  const response = await fetchWithTimeout(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, orderId, currency: 'INR' }),
  }, 12000);
  return safeJson(response);
};

export const verifyPayment = async (payload) => {
  const response = await fetchWithTimeout(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }, 12000);
  return safeJson(response);
};

export const addToWishlist = async (productId, notifyOnPriceDrop = true, targetPrice) => {
  const response = await fetchWithTimeout(`${API_BASE}/wishlist/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ productId, notifyOnPriceDrop, targetPrice }),
  }, 10000);
  return safeJson(response);
};

export const removeFromWishlist = async (productId) => {
  const response = await fetchWithTimeout(`${API_BASE}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }, 10000);
  return safeJson(response);
};

export const getWishlist = async () => {
  const response = await fetchWithTimeout(`${API_BASE}/wishlist`, {
    method: 'GET',
    headers: authHeaders(),
  }, 10000);
  return safeJson(response);
};

// ── Real-Time Data Feed ──
export const getProductFeed = async () => {
  const response = await fetchWithTimeout(`${API_BASE}/feed/products`, {}, 10000);
  return safeJson(response);
};

export const runIngestion = async (source = 'all') => {
  const response = await fetchWithTimeout(`${API_BASE}/admin/run-ingestion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
  }, 15000);
  return safeJson(response);
};

// ── Order Confirmation Email ──
export const sendOrderConfirmation = async (orderId) => {
  const response = await fetchWithTimeout(`${API_BASE}/order/${orderId}/send-confirmation`, {
    method: 'POST',
    headers: authHeaders(),
  }, 10000);
  return safeJson(response);
};

// ── Product Ratings ──
export const rateProduct = async (productId, rating, review = '') => {
  const response = await fetchWithTimeout(`${API_BASE}/product/${productId}/rate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ rating, review }),
  }, 10000);
  return safeJson(response);
};

export const getProductRatings = async (productId) => {
  const response = await fetchWithTimeout(`${API_BASE}/product/${productId}/ratings`, {}, 10000);
  return safeJson(response);
};
