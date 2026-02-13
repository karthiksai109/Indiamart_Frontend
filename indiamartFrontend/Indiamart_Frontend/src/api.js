import { API_BASE } from './config';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

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
  const response = await fetch(`${API_BASE}/allp`);
  return safeJson(response);
};

export const getProduct = async (productId) => {
  const response = await fetch(`${API_BASE}/product/${productId}`);
  return safeJson(response);
};

export const getPriceHistory = async (productId) => {
  const response = await fetch(`${API_BASE}/product/${productId}/price-history`);
  return safeJson(response);
};

export const getBudgetPlans = async (budget) => {
  const userId = localStorage.getItem('userId') || 'guest';
  const response = await fetch(`${API_BASE}/user/${userId}/budget-plan`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ budget: parseFloat(budget) }),
  });
  return safeJson(response);
};

export const createOrder = async (items, totalAmount, address) => {
  const response = await fetch(`${API_BASE}/order/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ items, totalAmount, address }),
  });
  return safeJson(response);
};

export const getMyOrders = async () => {
  const response = await fetch(`${API_BASE}/order/my-orders`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return safeJson(response);
};

export const createPaymentOrder = async (amount, orderId) => {
  const response = await fetch(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, orderId, currency: 'INR' }),
  });
  return safeJson(response);
};

export const verifyPayment = async (payload) => {
  const response = await fetch(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return safeJson(response);
};

export const addToWishlist = async (productId, notifyOnPriceDrop = true, targetPrice) => {
  const response = await fetch(`${API_BASE}/wishlist/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ productId, notifyOnPriceDrop, targetPrice }),
  });
  return safeJson(response);
};

export const removeFromWishlist = async (productId) => {
  const response = await fetch(`${API_BASE}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return safeJson(response);
};

export const getWishlist = async () => {
  const response = await fetch(`${API_BASE}/wishlist`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return safeJson(response);
};

// ── Real-Time Data Feed ──
export const getProductFeed = async () => {
  const response = await fetch(`${API_BASE}/feed/products`);
  return safeJson(response);
};

export const runIngestion = async (source = 'all') => {
  const response = await fetch(`${API_BASE}/admin/run-ingestion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
  });
  return safeJson(response);
};

// ── Order Confirmation Email ──
export const sendOrderConfirmation = async (orderId) => {
  const response = await fetch(`${API_BASE}/order/${orderId}/send-confirmation`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return safeJson(response);
};

// ── Product Ratings ──
export const rateProduct = async (productId, rating, review = '') => {
  const response = await fetch(`${API_BASE}/product/${productId}/rate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ rating, review }),
  });
  return safeJson(response);
};

export const getProductRatings = async (productId) => {
  const response = await fetch(`${API_BASE}/product/${productId}/ratings`);
  return safeJson(response);
};
