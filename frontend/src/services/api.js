import axios from 'axios';

// In dev, Vite proxies /api -> http://localhost:8000 (see vite.config.js).
// In prod, set VITE_API_BASE_URL to the deployed backend origin.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Central error normalization so components don't each write their own
// try/catch shape-guessing.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail || error.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);
