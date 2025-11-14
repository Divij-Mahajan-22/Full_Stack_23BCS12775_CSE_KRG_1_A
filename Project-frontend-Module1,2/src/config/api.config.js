// API Configuration - Connected to Spring Boot Backend

// ✅ FIXED - Get environment variables correctly
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true'; // ✅ FIXED: true means mock, false means real backend

// Debug logs (remove in production)
console.log('🔧 API Configuration:');
console.log('  Base URL:', API_BASE_URL);
console.log('  Mock Mode:', MOCK_MODE);
console.log('  ENV VITE_MOCK_MODE:', import.meta.env.VITE_MOCK_MODE);

// API Endpoints - ALIGNED WITH SPRING BOOT CONTROLLERS
export const API_ENDPOINTS = {
  // Auth endpoints - AuthController
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/users/profile',
  },

  // Bus endpoints - BusController
  BUS: {
    GET_ALL: '/buses',
    GET_ACTIVE: '/buses/active',
    
    GET_BY_ID: (id) => `/buses/${id}`,
    GET_BY_ROUTE: (routeId) => `/buses?routeId=${routeId}`,
    TRACK: (busId) => `/buses/${busId}/location`,
    GET_ETA: (busId, stopId) => `/buses/${busId}/eta${stopId ? `?stopId=${stopId}` : ''}`,
    CREATE: '/buses',
    UPDATE: (id) => `/buses/${id}`,
    DELETE: (id) => `/buses/${id}`,
    UPDATE_LOCATION: '/buses/location',
  },

  // Route endpoints - RouteController
  ROUTE: {
    GET_ALL: '/routes',
    GET_BY_ID: (id) => `/routes/${id}`,
    GET_STOPS: (id) => `/routes/${id}/stops`,
    CREATE: '/routes',
    ADD_STOP: (id) => `/routes/${id}/stops`,
    UPDATE: (id) => `/routes/${id}`,
    DELETE: (id) => `/routes/${id}`,
  },

  // Driver endpoints - DriverController
  DRIVER: {
    GET_ALL: '/drivers',
    GET_BY_ID: (id) => `/drivers/${id}`,
    GET_DASHBOARD: '/drivers/dashboard',
    CREATE: '/drivers',
    ASSIGN: (id) => `/drivers/${id}/assign`,
    UPDATE: (id) => `/drivers/${id}`,
    DELETE: (id) => `/drivers/${id}`,
  },

  // Report endpoints - ReportController
  REPORT: {
    GET_ALL: '/reports/pending',
    GET_BUS_REPORTS: (busId) => `/reports/bus/${busId}`,
    GET_USER_REPORTS: '/reports/my-reports',
    CREATE: '/reports/submit',
    VALIDATE: (id) => `/reports/${id}/validate`,
    VERIFY: (id) => `/reports/${id}/verify`,
  },

  // User endpoints - UserController
  USER: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    GET_PROFILE: '/users/profile',
    UPDATE: (id) => `/users/${id}`,
    UPDATE_TRUST_SCORE: (id) => `/users/${id}/trust-score`,
  },
};

// Export configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  mockMode: MOCK_MODE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default apiConfig;
