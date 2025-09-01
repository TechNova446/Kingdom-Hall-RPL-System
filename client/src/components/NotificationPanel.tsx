import React from 'react';
import { Bell } from 'lucide-react';

const mockNotifications = [
  { id: 1, message: 'Welcome to the platform!', time: 'Just now' },
  { id: 2, message: 'Your payment was successful.', time: '1 hour ago' },
  { id: 3, message: 'Referral bonus credited.', time: 'Yesterday' },
];

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="font-semibold text-gray-900">Notifications</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          &times;
        </button>
      </div>
      <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
        {mockNotifications.length === 0 ? (
          <li className="p-4 text-gray-500 text-center">No notifications</li>
        ) : (
          mockNotifications.map((n) => (
            <li key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Bell className="w-4 h-4 text-primary-500 mr-2" />
                <div>
                  <div className="text-gray-800 text-sm">{n.message}</div>
                  <div className="text-xs text-gray-400">{n.time}</div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotificationPanel;

