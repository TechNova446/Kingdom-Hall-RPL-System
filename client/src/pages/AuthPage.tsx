import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight,
  Eye,
  EyeOff,
  Award,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register: registerForm, handleSubmit, formState: { errors }, watch, reset } = useForm();

  const switchForm = (toLogin: boolean) => {
    // Kept for compatibility but we no longer switch to inline signup here
    if (!toLogin) {
      navigate('/register');
      return;
    }
    if (isLogin === toLogin) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      reset();
      setIsAnimating(false);
    }, 250);
  };

  const onSubmitLogin = async (data: any) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSignup = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, we'll simulate a successful signup
      toast.success('Account created successfully! Please login.');
      switchForm(true);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? 'Sign in to your RPL Platform account' 
              : 'Join thousands of certified professionals'
            }
          </p>
        </div>

        {/* Form Container */}
        <div className="relative overflow-hidden">
          <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {isLogin ? (
              <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="input-field pl-10"
                          placeholder="Enter your username"
                          {...registerForm('username', { required: 'Username is required' })}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{(errors.username as any)?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="input-field pl-10 pr-10"
                          placeholder="Enter your password"
                          {...registerForm('password', { required: 'Password is required' })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{(errors.password as any)?.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                          Forgot password?
                        </a>
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
                          Signing in...
                        </div>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : null}
          </div>
        </div>

        {/* Form Switch */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <button
              onClick={() => navigate('/register')}
              className="text-primary-600 hover:text-primary-700 font-medium text-lg transition-colors duration-200"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Benefits for Signup */}
        {!isLogin && (
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Why Join RPL Platform?</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">Official KNQA certification</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">Career advancement opportunities</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">Professional networking</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
