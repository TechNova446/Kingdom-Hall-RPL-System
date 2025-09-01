import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_CONFIG, getApiUrl } from '../config/api';
import { mockApi, shouldUseMockApi } from '../services/mockApi';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isPaid: boolean;
  isActive: boolean;
  registrationStep: number;
  referralCode: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (step: number, data: any, token?: string) => Promise<any>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    axios.defaults.baseURL = API_CONFIG.BASE_URL;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    // Optional dev helper: clear token if ?reset=1 present
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === '1') {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch {}

    const checkAuth = async () => {
      if (token) {
        try {
          if (shouldUseMockApi()) {
            const userData = await mockApi.getUserProfile();
            setUser(userData);
          } else {
            const response = await axios.get(API_CONFIG.ENDPOINTS.USER_PROFILE);
            setUser(response.data);
          }
        } catch (error) {
          // For now, just clear the token if there's an error
          // In production, this would validate the token with Django
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      let response;
      
      if (shouldUseMockApi()) {
        response = { data: await mockApi.login(username, password) };
      } else {
        response = await axios.post(API_CONFIG.ENDPOINTS.LOGIN, {
          username,
          password
        });
      }

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (step: number, data: any, token?: string) => {
    try {
      let response;
      
      if (shouldUseMockApi()) {
        if (step === 1) {
          response = { data: await mockApi.registerStep1(data) };
        } else {
          response = { data: await mockApi.registerStep2(data, token || '') };
        }
      } else {
        const endpoint = step === 1 ? API_CONFIG.ENDPOINTS.REGISTER_STEP1 : API_CONFIG.ENDPOINTS.REGISTER_STEP2;
        const payload = step === 2 ? { ...data, token } : data;
        response = await axios.post(endpoint, payload);
      }
      
      if (step === 2) {
        // After step 2, user is fully registered but not yet paid
        const { token: newToken, user: userData } = response.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
      }
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
