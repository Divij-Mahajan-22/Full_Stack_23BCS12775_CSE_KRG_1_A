import api from './api';
import { API_ENDPOINTS, apiConfig } from '@/config/api.config';

const isMockMode = apiConfig.mockMode;

// ✅ Debug log
console.log('🔧 AuthService - Mock Mode:', isMockMode);

// Login
export const login = async (credentials) => {
  console.log('🔐 Login attempt:', { email: credentials.email, isMockMode });

  if (isMockMode) {
    console.log('⚠️ Using MOCK MODE - not hitting backend');
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw new Error('Mock mode enabled - set VITE_MOCK_MODE=false in .env');
  }

  // ✅ Real backend call
  console.log('✅ Calling REAL BACKEND:', `${apiConfig.baseURL}${API_ENDPOINTS.AUTH.LOGIN}`);
  return api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

// Register
export const register = async (userData) => {
  console.log('📝 Register attempt:', { email: userData.email, role: userData.role, isMockMode });

  if (isMockMode) {
    console.log('⚠️ Using MOCK MODE - not hitting backend');
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw new Error('Mock mode enabled - set VITE_MOCK_MODE=false in .env');
  }

  // ✅ Real backend call
  console.log('✅ Calling REAL BACKEND:', `${apiConfig.baseURL}${API_ENDPOINTS.AUTH.REGISTER}`);
  return api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

// Logout
export const logout = async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  return { success: true };
};

// Get user profile
export const getProfile = async () => {
  if (isMockMode) {
    console.log('⚠️ Using MOCK MODE for profile');
    return { success: true, data: {} };
  }

  console.log('✅ Getting profile from backend');
  return api.get(API_ENDPOINTS.USER.GET_PROFILE);
};

// Update user profile
export const updateProfile = async (userId, updates) => {
  if (isMockMode) {
    return { success: true, data: updates };
  }

  return api.put(API_ENDPOINTS.USER.UPDATE(userId), updates);
};

export default {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
};
