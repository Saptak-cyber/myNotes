import axios from "axios";

// Prefer explicit base URL via env in production deployments (e.g., Vercel)
// Fallbacks: dev localhost → relative /api for same-origin backends
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
const isProd = import.meta.env.MODE === "production";
const BASE_URL = envBaseUrl
  ? envBaseUrl
  : isProd
    ? "/api"
    : "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage
    const token = localStorage.getItem('supabase_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Token expired or invalid, remove from storage
      localStorage.removeItem('supabase_token');
      // Optionally redirect to login or refresh the page
      window.location.reload();
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;