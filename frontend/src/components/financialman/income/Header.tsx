import React from 'react';
import { BellIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  activeMenuItem: string;
  activeSubMenuItem?: string;
  onLogout: () => void;
  onMenuChange: (menuItem: string, subMenuItem?: string) => void;
}

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <span>Home</span>
              <ChevronRightIcon className="h-4 w-4 mx-2" />
              <span className="text-[#FF4D15]">Financial Maintenance</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <BellIcon className="h-6 w-6 text-gray-500" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Moni Roy</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Moni%20Roy"
                alt="Admin"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};