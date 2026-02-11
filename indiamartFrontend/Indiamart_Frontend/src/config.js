// Single API base for all backend calls. Use env in production.
export const API_BASE = import.meta.env.VITE_API_URL || 'https://indiamart3-backend.onrender.com';

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
