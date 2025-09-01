import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Award, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Share2, 
  LogOut,
  Bell,
  Settings,
  CheckCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { mockApi, shouldUseMockApi } from '../services/mockApi';
import { API_CONFIG } from '../config/api';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import NotificationPanel from '../components/NotificationPanel';
import SettingsModal from '../components/SettingsModal';

interface DashboardData {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    location: string;
    isPaid: boolean;
    isActive: boolean;
    registrationStep: number;
    referralCode: string;
    joinedDate: string;
  };
  stats: {
    totalReferrals: number;
    successfulReferrals: number;
    referralBonus: number;
    isReferred: boolean;
  };
  referrer: {
    name: string;
    referralCode: string;
  } | null;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      let response;
      
      if (shouldUseMockApi()) {
        response = { data: await mockApi.getDashboard() };
      } else {
        response = await axios.get(API_CONFIG.ENDPOINTS.DASHBOARD);
      }
      setDashboardData(response.data);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (dashboardData?.user.referralCode) {
      navigator.clipboard.writeText(dashboardData.user.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${dashboardData?.user.referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join RPL Platform',
        text: 'Get certified with RPL Platform! Use my referral code for bonus features.',
        url: referralLink
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors mr-3"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="p-2 rounded-lg bg-primary-50 mr-3">
                <Award className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block leading-tight">RPL Dashboard</span>
                <span className="text-sm text-gray-500">Professional Certification Platform</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 relative">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors relative"
                onClick={() => setNotificationOpen((v) => !v)}
              >
                <Bell className="w-5 h-5" />
                {notificationOpen && (
                  <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
                )}
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="hidden sm:flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Sidebar */}
        <Sidebar 
          onSettingsClick={() => setSettingsOpen(true)} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Welcome Section, Status Cards, etc. */}
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {dashboardData.user.firstName}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Here's your RPL certification progress and platform overview.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="px-4 py-2 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium">
                  Member since {new Date(dashboardData.user.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    dashboardData.user.isPaid ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {dashboardData.user.isPaid ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                  <p className={`text-sm ${
                    dashboardData.user.isPaid ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {dashboardData.user.isPaid ? 'Active & Certified' : 'Pending Payment'}
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Referrals</h3>
                  <p className="text-sm text-gray-600">
                    {dashboardData.stats.totalReferrals} total, {dashboardData.stats.successfulReferrals} successful
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Referral Bonus</h3>
                  <p className="text-sm text-gray-600">
                    Ksh. {dashboardData.stats.referralBonus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status Banner */}
          {!dashboardData.user.isPaid && (
            <div className="relative overflow-hidden rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-white p-4 mb-8">
              <div className="absolute inset-y-0 right-0 w-1/3 bg-yellow-100/40 pointer-events-none" />
              <div className="flex items-center justify-between relative">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-yellow-100 mr-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-900">
                      Complete Your Registration
                    </h3>
                    <p className="text-sm text-yellow-800">
                      Pay the registration fee to unlock all platform features
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/payment')}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-colors"
                >
                  Pay Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                          {/* Profile Information */}
            <div className="card" data-section="profile">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-gray-900">
                      {dashboardData.user.firstName} {dashboardData.user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{dashboardData.user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="mt-1 text-gray-900">{dashboardData.user.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 text-gray-900">{dashboardData.user.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(dashboardData.user.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {dashboardData.stats.isReferred && dashboardData.referrer && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Referred By</label>
                      <p className="mt-1 text-gray-900">{dashboardData.referrer.name}</p>
                    </div>
                  )}
                </div>
              </div>

                          {/* Certification Progress */}
            <div className="card" data-section="progress">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Certification Progress</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Registration</span>
                    <span className="font-medium text-gray-900">Completed</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${dashboardData.user.isPaid ? 'bg-green-500 w-full' : 'bg-primary-500 w-1/2'} transition-all`}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Payment</span>
                    <span className={`font-medium ${dashboardData.user.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                      {dashboardData.user.isPaid ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Welcome to the platform!</span>
                    <span className="text-gray-500">Today</span>
                  </li>
                  {!dashboardData.user.isPaid ? (
                    <li className="flex items-center justify-between">
                      <span>Payment pending — complete to unlock certification</span>
                      <button onClick={() => navigate('/payment')} className="text-primary-600 hover:underline">Pay now</button>
                    </li>
                  ) : (
                    <li className="flex items-center justify-between">
                      <span>Payment confirmed — certification activated</span>
                      <span className="text-gray-500">Just now</span>
                    </li>
                  )}
                </ul>
              </div>

                          {/* Referral System */}
            <div className="card" data-section="referrals">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Referral System</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Your Referral Code</h3>
                  <div className="flex items-center space-x-2">
                    <code className="bg-white px-3 py-2 rounded border text-lg font-mono">
                      {dashboardData.user.referralCode}
                    </code>
                    <button
                      onClick={copyReferralCode}
                      className="btn-secondary text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Referral Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Referrals:</span>
                        <span className="font-semibold">{dashboardData.stats.totalReferrals}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Successful:</span>
                        <span className="font-semibold text-green-600">
                          {dashboardData.stats.successfulReferrals}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus Earned:</span>
                        <span className="font-semibold text-purple-600">
                          Ksh. {dashboardData.stats.referralBonus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Share your referral code</li>
                      <li>• Earn Ksh. 50 per successful referral</li>
                      <li>• Maximum 10 referrals allowed</li>
                      <li>• Bonus credited automatically</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={shareReferralLink}
                  className="btn-primary w-full inline-flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Referral Link
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-left">
                    <User className="w-4 h-4 mr-2 inline" />
                    Update Profile
                  </button>
                  <button className="w-full btn-secondary text-left">
                    <CreditCard className="w-4 h-4 mr-2 inline" />
                    Payment History
                  </button>
                  <button className="w-full btn-secondary text-left">
                    <TrendingUp className="w-4 h-4 mr-2 inline" />
                    View Progress
                  </button>
                </div>
              </div>

              {/* Certification Status */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Registration</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment</span>
                    {dashboardData.user.isPaid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certification</span>
                    {dashboardData.user.isPaid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
                
                {!dashboardData.user.isPaid && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Complete your payment to activate your certification.
                    </p>
                  </div>
                )}
              </div>

              {/* Support */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">
                    <strong>Email:</strong> support@rplplatform.co.ke
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +254 700 000 000
                  </p>
                  <p className="text-gray-600">
                    <strong>Hours:</strong> 24/7 Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
