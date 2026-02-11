import { API_BASE } from './config';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const setBudget = async (userId, token, budget) => {
  const response = await fetch(`${API_BASE}/user/${userId}/budget`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ budget }),
  });
  return response.json();
};

export const getBudget = async (userId, token) => {
  const response = await fetch(`${API_BASE}/user/${userId}/budget`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return response.json();
};

export const validateCartBudget = async (userId, token) => {
  const response = await fetch(`${API_BASE}/user/${userId}/cart/check-budget`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return response.json();
};

export const getProducts = async (query = {}) => {
  const params = new URLSearchParams(query).toString();
  const response = await fetch(`${API_BASE}/products${params ? `?${params}` : ''}`);
  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE}/allp`);
  return response.json();
};

export const getProduct = async (productId) => {
  const response = await fetch(`${API_BASE}/product/${productId}`);
  return response.json();
};

export const getPriceHistory = async (productId) => {
  const response = await fetch(`${API_BASE}/product/${productId}/price-history`);
  return response.json();
};

export const getBudgetPlans = async (budget) => {
  const userId = localStorage.getItem('userId') || 'guest';
  const response = await fetch(`${API_BASE}/user/${userId}/budget-plan`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ budget: parseFloat(budget) }),
  });
  return response.json();
};

export const createOrder = async (items, totalAmount, address) => {
  const response = await fetch(`${API_BASE}/order/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ items, totalAmount, address }),
  });
  return response.json();
};

export const getMyOrders = async () => {
  const response = await fetch(`${API_BASE}/order/my-orders`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return response.json();
};

export const createPaymentOrder = async (amount, orderId) => {
  const response = await fetch(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, orderId, currency: 'INR' }),
  });
  return response.json();
};

export const verifyPayment = async (payload) => {
  const response = await fetch(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const addToWishlist = async (productId, notifyOnPriceDrop = true, targetPrice) => {
  const response = await fetch(`${API_BASE}/wishlist/add`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ productId, notifyOnPriceDrop, targetPrice }),
  });
  return response.json();
};

export const removeFromWishlist = async (productId) => {
  const response = await fetch(`${API_BASE}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return response.json();
};

export const getWishlist = async () => {
  const response = await fetch(`${API_BASE}/wishlist`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return response.json();
};
