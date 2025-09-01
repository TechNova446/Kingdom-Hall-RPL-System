import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Smartphone, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Award,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { mockApi, shouldUseMockApi } from '../services/mockApi';
import { API_CONFIG } from '../config/api';

interface PaymentData {
  phoneNumber: string;
}

const Payment: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'later'>('mpesa');
  const [showPaymentForm, setShowPaymentForm] = useState(true);
  
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const { register: registerForm, handleSubmit, formState: { errors }, watch } = useForm<PaymentData>();

  const onSubmitPayment = async (data: PaymentData) => {
    setIsLoading(true);
    try {
      if (paymentMethod === 'mpesa') {
        // Simulate M-Pesa payment
        const response = await mockApi.initiatePayment(200);
        
        toast.success('Payment initiated! Check your phone for M-Pesa prompt.');
        
        // Simulate payment success after a delay
        setTimeout(() => {
          toast.success('Payment successful! Welcome to RPL Platform.');
          updateUser({ ...user!, isPaid: true, isActive: true });
          navigate('/dashboard');
        }, 3000);
      } else {
        // Pay later option
        toast.success('Account created! You can pay later from your dashboard.');
        updateUser({ ...user!, isPaid: false, isActive: true });
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayLater = () => {
    setPaymentMethod('later');
    setShowPaymentForm(false);
  };

  const handleBackToPayment = () => {
    setPaymentMethod('mpesa');
    setShowPaymentForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <CreditCard className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Complete Your Registration
          </h2>
          <p className="mt-2 text-gray-600">
            Pay the registration fee to unlock all platform features
          </p>
        </div>

        {/* Payment Amount Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Official KNQA Certification
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">Ksh. 200</div>
            <p className="text-gray-600">One-time registration fee</p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">Full platform access</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">Official RPL certification</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">Referral system access</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">Lifetime membership</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        {showPaymentForm ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
            
            {/* M-Pesa Option */}
            <div className="mb-4">
              <button
                onClick={() => setPaymentMethod('mpesa')}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  paymentMethod === 'mpesa'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    paymentMethod === 'mpesa' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'mpesa' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <Smartphone className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">M-Pesa</div>
                    <div className="text-sm text-gray-600">Pay with your mobile phone</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Pay Later Option */}
            <div className="mb-6">
              <button
                onClick={handlePayLater}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  paymentMethod === 'later'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    paymentMethod === 'later' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'later' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Pay Later</div>
                    <div className="text-sm text-gray-600">Access dashboard now, pay later</div>
                  </div>
                </div>
              </button>
            </div>

            {/* M-Pesa Form */}
            {paymentMethod === 'mpesa' && (
              <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      className="input-field pl-10"
                      placeholder="0712345678"
                      {...registerForm('phoneNumber', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(07\d{8}|2547\d{8})$/,
                          message: 'Enter a valid Kenyan phone number'
                        }
                      })}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{(errors.phoneNumber as any)?.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">How M-Pesa payment works:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Enter your phone number</li>
                        <li>You'll receive an M-Pesa prompt</li>
                        <li>Enter your M-Pesa PIN to complete payment</li>
                        <li>You'll be redirected to your dashboard</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 text-lg font-medium relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <>
                      Pay Ksh. 200 with M-Pesa
                      <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Pay Later Confirmation */}
            {paymentMethod === 'later' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Pay Later Option:</p>
                      <p>You can access your dashboard now and complete payment later. Some features may be limited until payment is made.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit(onSubmitPayment)}
                  disabled={isLoading}
                  className="w-full btn-secondary py-3 text-lg font-medium relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      Continue to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Pay Later Confirmation */
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pay Later Selected</h3>
              <p className="text-gray-600">You can complete payment from your dashboard anytime.</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleBackToPayment}
                className="w-full btn-secondary py-3 text-lg font-medium"
              >
                <ArrowLeft className="mr-2 w-5 h-5 inline" />
                Back to Payment Options
              </button>

              <button
                onClick={handleSubmit(onSubmitPayment)}
                disabled={isLoading}
                className="w-full btn-primary py-3 text-lg font-medium relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
