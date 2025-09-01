import React from 'react';
import { Award } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-6 mt-8">
    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-2 sm:mb-0">
        <Award className="w-5 h-5 text-primary-400 mr-2" />
        <span className="font-semibold text-base">RPL Platform</span>
      </div>
      <div className="text-gray-400 text-sm text-center sm:text-right">
        © {new Date().getFullYear()} RPL Mobilization Platform. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

