// API Configuration for Django Backend Integration
// Update this file when connecting to your Django backend

export const API_CONFIG = {
  // Base URL for Django backend API
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  
  // API Endpoints - update these to match your Django URLs
  ENDPOINTS: {
    // Authentication endpoints
    LOGIN: '/auth/login/',
    REGISTER_STEP1: '/auth/register/step1/',
    REGISTER_STEP2: '/auth/register/step2/',
    USER_PROFILE: '/auth/me/',
    
    // Payment endpoints
    INITIATE_PAYMENT: '/payments/initiate/',
    PAYMENT_CALLBACK: '/payments/callback/',
    
    // Referral endpoints
    GET_REFERRAL_CODE: '/referrals/code/',
    GET_REFERRALS: '/referrals/',
    
    // User endpoints
    DASHBOARD: '/users/dashboard/',
    UPDATE_PROFILE: '/users/profile/',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
