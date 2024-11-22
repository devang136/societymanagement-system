import React from 'react';

interface TabNavigationProps {
  activeTab: 'maintenance' | 'other-income';
  onTabChange: (tab: 'maintenance' | 'other-income') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        <button
          onClick={() => onTabChange('maintenance')}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'maintenance'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Maintenance
        </button>
        <button
          onClick={() => onTabChange('other-income')}
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'other-income'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Other Income
        </button>
      </nav>
    </div>
  );
};