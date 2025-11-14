import axios from 'axios';
import { apiConfig } from '@/config/api.config';
import { STORAGE_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';

// ✅ Debug log
console.log('🔧 Creating Axios instance with:', apiConfig.baseURL);

// Create axios instance
const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Debug log
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      hasToken: !!token,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    // ✅ Debug log
    console.log('📥 API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response.data;
  },
  (error) => {
    // ✅ Debug log
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data,
    });

    // Handle different error types
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          toast.error('Unauthorized. Please login again.');
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access denied.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data?.message || 'Something went wrong.');
      }
    } else if (error.request) {
      toast.error('Network error. Cannot connect to server.');
      console.error('Network Error - Is backend running on http://localhost:8081?');
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;
