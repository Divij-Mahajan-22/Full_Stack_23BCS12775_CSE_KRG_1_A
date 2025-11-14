import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as authService from '@/services/authService';
import { STORAGE_KEYS } from '@/utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { token, email, name, role, userId } = response.data;

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        
        const userData = {
          id: userId,
          email,
          name,
          role,
        };
        
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        setUser(userData);

        toast.success(`Welcome back, ${name}!`);

        // ✅ FIXED - Navigate to correct dashboard based on role
        if (role === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else if (role === 'DRIVER') {
          navigate('/driver', { replace: true });
        } else {
          navigate('/dashboard', { replace: true }); // PASSENGER
        }

        return { success: true };
      } else {
        toast.error(response.message || 'Login failed');
        return { success: false };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
      return { success: false };
    }
  };

  const register = async (formData) => {
    try {
      // ✅ FIXED - Role can now be PASSENGER or DRIVER
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || '',
        role: formData.role || 'PASSENGER', // Default to PASSENGER if not specified
      };

      const response = await authService.register(registerData);

      if (response.success && response.data) {
        const { token, email, name, role, userId } = response.data;

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        
        const userData = {
          id: userId,
          email,
          name,
          role,
        };
        
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        setUser(userData);

        toast.success(`Welcome aboard, ${name}! 🎉`);

        // ✅ FIXED - Navigate to correct dashboard based on registered role
        if (role === 'DRIVER') {
          navigate('/driver', { replace: true });
        } else {
          navigate('/dashboard', { replace: true }); // PASSENGER
        }

        return { success: true };
      } else {
        toast.error(response.message || 'Registration failed');
        return { success: false };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  };

  const refreshUserProfile = async () => {
    try {
      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        const updatedUser = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          trustScore: response.data.trustScore,
          phone: response.data.phone,
        };
        
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return { success: true, data: updatedUser };
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
