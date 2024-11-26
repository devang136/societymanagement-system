import React from "react";

interface TabsProps {
  activeTab: 'complaint' | 'request';
  onTabChange: (tab: 'complaint' | 'request') => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b mb-6">
      <div className="flex space-x-8">
        <button
          onClick={() => onTabChange('complaint')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'complaint'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Complaint Submission
        </button>
        <button
          onClick={() => onTabChange('request')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'request'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Request Submission
        </button>
      </div>
    </div>
  );
}