import React from 'react';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Home,
  Award,
  Users,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onSettingsClick?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSettingsClick, isOpen = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      description: 'Overview & Stats'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      description: 'Personal Information',
      onClick: () => {
        // For now, scroll to profile section in dashboard
        const profileSection = document.querySelector('[data-section="profile"]');
        if (profileSection) {
          profileSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      label: 'Payment',
      path: '/payment',
      icon: CreditCard,
      description: 'Payment & Billing'
    },
    {
      label: 'Referrals',
      path: '/referrals',
      icon: Users,
      description: 'Invite Friends',
      onClick: () => {
        // Scroll to referral section in dashboard
        const referralSection = document.querySelector('[data-section="referrals"]');
        if (referralSection) {
          referralSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      label: 'Progress',
      path: '/progress',
      icon: TrendingUp,
      description: 'Certification Status',
      onClick: () => {
        // Scroll to progress section in dashboard
        const progressSection = document.querySelector('[data-section="progress"]');
        if (progressSection) {
          progressSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
    // Close mobile sidebar after navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        bg-white border-r border-gray-100 w-72 min-h-full p-6 space-y-8 shadow-sm
        lg:block lg:relative lg:translate-x-0
        ${isOpen ? 'fixed inset-y-0 left-0 z-50 translate-x-0' : 'fixed inset-y-0 left-0 z-50 -translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
      {/* Sidebar Header */}
      <div className="border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <p className="text-sm text-gray-500">Quick access menu</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Main Menu
        </h3>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item)}
              className={`w-full group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}`} />
                <div className="text-left">
                  <div className={`text-sm font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-primary-500' : 'text-gray-500'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                isActive ? 'text-primary-500 rotate-90' : 'text-gray-300 group-hover:text-primary-400 group-hover:translate-x-1'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="border-t border-gray-100 pt-6 space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 group"
        >
          <Settings className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">Settings</div>
            <div className="text-xs text-gray-500">Account preferences</div>
          </div>
        </button>

        <button
          onClick={() => window.open('mailto:support@rplplatform.co.ke', '_blank')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 group"
        >
          <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">Help & Support</div>
            <div className="text-xs text-gray-500">Get assistance</div>
          </div>
        </button>
      </div>

      {/* Status Indicator */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-700">Platform Online</span>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
