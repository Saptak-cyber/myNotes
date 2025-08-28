import axios from "axios";

// Configure API base URL for different environments
// Try direct connection if proxy doesn't work
const BASE_URL = import.meta.env.DEV 
  ? "http://localhost:5001/api" 
  : import.meta.env.VITE_USE_DIRECT_API === "true" 
    ? "https://mynotes-g3jx.onrender.com/api"
    : "/api"; // Use Vercel proxy by default

console.log("🔧 Environment:", import.meta.env.MODE);
console.log("🌐 API Base URL:", BASE_URL);
console.log("🔄 Using direct API:", import.meta.env.VITE_USE_DIRECT_API);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased to 30 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    console.log(`Full URL: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;