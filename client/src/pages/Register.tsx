import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Lock, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Award,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Step1Data {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  phoneNumber: string;
  location: string;
  email: string;
}

interface Step2Data {
  username: string;
  password: string;
  confirmPassword: string;
}

interface Step3Data {
  referralCode?: string;
}

const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [registrationToken, setRegistrationToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register: registerForm, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const onSubmitStep1 = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await registerUser(1, data);
      setRegistrationToken(response.token);
      setPreviousStep(currentStep);
      setCurrentStep(2);
      toast.success('Step 1 completed! Please set up your account credentials.');
    } catch (error) {
      console.error('Step 1 error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep2 = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(2, {
        username: data.username,
        password: data.password
      }, registrationToken);
      toast.success('Account created successfully! Redirecting to payment...');
      // Redirect to payment page after successful registration
      setTimeout(() => {
        navigate('/payment');
      }, 1500);
    } catch (error) {
      console.error('Step 2 error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitStep3 = async (data: any) => {
    if (data.referralCode) {
      try {
        await axios.post('/api/referrals/apply', {
          referralCode: data.referralCode,
          token: registrationToken
        });
        toast.success('Referral code applied successfully!');
      } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to apply referral code';
        toast.error(message);
        return;
      }
    }
    setPreviousStep(currentStep);
    setCurrentStep(4);
  };

  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const phoneNumber = watch('phoneNumber');
      const response = await axios.post('/api/payments/mpesa/stkpush', {
        phoneNumber,
        token: registrationToken
      });

      toast.success('Payment request sent to your phone. Please complete the payment.');
      
      // Poll for payment status
      const paymentId = response.data.paymentId;
      pollPaymentStatus(paymentId);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Payment initiation failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const pollPaymentStatus = async (paymentId: string) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const response = await axios.get(`/api/payments/status/${paymentId}`);
        const { status } = response.data;

        if (status === 'completed') {
          clearInterval(interval);
          toast.success('Payment successful! Your account is now active.');
          navigate('/dashboard');
        } else if (status === 'failed') {
          clearInterval(interval);
          toast.error('Payment failed. Please try again.');
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          toast.error('Payment timeout. Please check your payment status.');
        }
      } catch (error) {
        console.error('Payment status check error:', error);
      }
    }, 10000); // Check every 10 seconds
  };

  const steps = [
    { number: 1, title: 'Personal Details', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Account Setup', icon: <Lock className="w-5 h-5" /> },
    { number: 3, title: 'Referral Code', icon: <Users className="w-5 h-5" /> },
    { number: 4, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-primary-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">RPL Registration</h1>
          </div>
          <p className="text-gray-600">Join the official RPL certification platform</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="card">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <form onSubmit={handleSubmit(onSubmitStep1)} className={`space-y-6 ${currentStep > previousStep ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...registerForm('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{(errors.firstName as any)?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...registerForm('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{(errors.lastName as any)?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    className="input-field"
                    {...registerForm('gender', { required: 'Gender is required' })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{(errors.gender as any)?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    className="input-field"
                    {...registerForm('age', { 
                      required: 'Age is required',
                      min: { value: 18, message: 'Must be at least 18 years old' },
                      max: { value: 100, message: 'Must be less than 100 years old' }
                    })}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">{(errors.age as any)?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="07XXXXXXXX or 254XXXXXXXXX"
                    className="input-field"
                    {...registerForm('phoneNumber', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^(07\d{8}|2547\d{8})$/,
                        message: 'Enter a valid Kenyan phone number'
                      }
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{(errors.phoneNumber as any)?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="City, County"
                    className="input-field"
                    {...registerForm('location', { required: 'Location is required' })}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{(errors.location as any)?.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="input-field"
                  {...registerForm('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Enter a valid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{(errors.email as any)?.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary inline-flex items-center px-6 py-3 hover:scale-105 transition-transform duration-200 group"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Account Setup */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit(onSubmitStep2)} className={`space-y-6 ${currentStep > previousStep ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Credentials</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  className="input-field"
                  {...registerForm('username', { 
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters' }
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{(errors.username as any)?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  className="input-field"
                  {...registerForm('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{(errors.password as any)?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  className="input-field"
                  {...registerForm('confirmPassword', { required: 'Please confirm your password' })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{(errors.confirmPassword as any)?.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={() => { setPreviousStep(currentStep); setCurrentStep(1); }}
                  className="btn-secondary inline-flex items-center px-6 py-3 hover:scale-105 transition-transform duration-200 group"
                >
                  <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary inline-flex items-center px-6 py-3 hover:scale-105 transition-transform duration-200 group"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Referral Code */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit(onSubmitStep3)} className={`space-y-6 ${currentStep > previousStep ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Referral Code (Optional)</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Have a referral code?</strong> Enter it below to unlock bonus features and help your referrer earn rewards.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 8-character referral code"
                  className="input-field"
                  {...registerForm('referralCode', {
                    pattern: {
                      value: /^[A-Z0-9]{8}$/,
                      message: 'Referral code must be 8 characters (letters and numbers only)'
                    }
                  })}
                />
                {errors.referralCode && (
                  <p className="text-red-500 text-sm mt-1">{(errors.referralCode as any)?.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => { setPreviousStep(currentStep); setCurrentStep(2); }}
                  className="btn-secondary inline-flex items-center"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className={`space-y-6 ${currentStep > previousStep ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Registration</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Registration Fee</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">Ksh. 200</div>
                <p className="text-green-700 text-sm">
                  One-time payment • Lifetime access to platform features
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Official RPL certification under KNQA framework
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access to exclusive job opportunities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Professional development resources
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Referral system with bonus rewards
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    24/7 customer support
                  </li>
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => { setPreviousStep(currentStep); setCurrentStep(3); }}
                  className="btn-secondary inline-flex items-center"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={initiatePayment}
                  disabled={isLoading}
                  className="btn-primary inline-flex items-center"
                >
                  {isLoading ? 'Processing...' : 'Pay with M-Pesa'}
                  <CreditCard className="ml-2 w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Sign in</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
