// Use local backend in dev so you don't get HTML error pages from wrong host
const inDev = import.meta.env.DEV;
const envUrl = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL;
export const API_BASE = envUrl || (inDev ? 'http://localhost:3000' : 'https://indiamart3-backend.onrender.com');

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
