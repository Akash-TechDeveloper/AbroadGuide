import axios from 'axios';

// Create axios instance connected to your Spring Boot backend on port 8081
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081',
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if using cookies
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      
      if (token && config.headers) {
        // Remove 'Bearer ' prefix if it exists in stored token
        const cleanToken = token.replace('Bearer ', '');
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    
    // Debug logging
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        hasAuth: !!config.headers?.Authorization,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      console.error(`❌ API Error ${status}:`, {
        url: error.config?.url,
        message,
        data: error.response.data,
      });
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.log('🔒 Unauthorized - Clearing token and redirecting to login');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('auth-storage');
            
            // Only redirect if not already on login/register page
            const currentPath = window.location.pathname;
            if (currentPath !== '/login' && currentPath !== '/register') {
              window.location.href = '/login';
            }
          }
          break;
          
        case 403:
          console.error('🚫 Access Forbidden:', message);
          break;
          
        case 404:
          console.error('🔍 Resource Not Found:', message);
          break;
          
        case 500:
          console.error('💥 Server Error:', message);
          break;
          
        default:
          console.error('⚠️ API Error:', message);
      }
      
      // Return error in consistent format
      return Promise.reject({
        status,
        message,
        data: error.response.data,
      });
    } else if (error.request) {
      // Network error - no response from server
      console.error('🌐 Network Error - No response from server');
      console.error('Backend URL:', api.defaults.baseURL);
      console.error('Please ensure:');
      console.error('1. Backend is running on port 8081');
      console.error('2. CORS is enabled in Spring Boot');
      console.error('3. No firewall is blocking the connection');
      
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check if the backend is running on port 8081.',
        data: null,
      });
    }
    
    return Promise.reject({
      status: -1,
      message: error.message || 'An unexpected error occurred',
      data: null,
    });
  }
);

// Health check function
export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/actuator/health');
    console.log('✅ Backend is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend health check failed');
    return false;
  }
};

export default api;