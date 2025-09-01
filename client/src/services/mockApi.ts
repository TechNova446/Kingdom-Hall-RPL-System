// Mock API service for frontend development
// This simulates API responses when no backend is connected

export const mockApi = {
  // Mock authentication responses
  login: async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: username,
        email: 'john.doe@example.com',
        isPaid: false,
        isActive: true,
        registrationStep: 3,
        referralCode: 'ABC12345'
      }
    };
  },

  registerStep1: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      token: 'step1-token-' + Date.now(),
      message: 'Step 1 completed successfully'
    };
  },

  registerStep2: async (data: any, token: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      token: 'step2-token-' + Date.now(),
      user: {
        id: '1',
        firstName: data.firstName || 'John',
        lastName: data.lastName || 'Doe',
        username: data.username,
        email: data.email || 'john.doe@example.com',
        isPaid: false,
        isActive: false, // Not active until payment
        registrationStep: 4, // Step 4 is payment
        referralCode: 'ABC12345'
      }
    };
  },

  getUserProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      isPaid: false,
      isActive: true,
      registrationStep: 3,
      referralCode: 'ABC12345'
    };
  },

  getDashboard: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '0712345678',
        location: 'Nairobi, Kenya',
        isPaid: false,
        isActive: true,
        registrationStep: 3,
        referralCode: 'ABC12345',
        joinedDate: new Date().toISOString()
      },
      stats: {
        totalReferrals: 2,
        successfulReferrals: 1,
        referralBonus: 0,
        isReferred: false
      },
      referrer: null
    };
  },

  getReferralCode: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      referralCode: 'ABC12345',
      referralLink: 'https://rpl-platform.com/register?ref=ABC12345'
    };
  },

  initiatePayment: async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      checkoutRequestID: 'ws_CO_' + Date.now(),
      merchantRequestID: 'MR_' + Date.now(),
      responseCode: '0',
      responseDescription: 'Success. Request accepted for processing',
      customerMessage: 'Success. Request accepted for processing'
    };
  }
};

// Helper function to check if we should use mock API
export const shouldUseMockApi = (): boolean => {
  return !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL === '';
};
