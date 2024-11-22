import React, { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  UserIcon,
  SpeakerWaveIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

export const Sidebar: React.FC = () => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(true);

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#FF4D15]">Dash</span>
              <span className="text-2xl font-bold text-gray-900">Stack</span>
            </div>
          </div>

          <nav className="mt-8 flex-1 flex flex-col divide-y divide-gray-200 overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <HomeIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Dashboard
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <UserGroupIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Resident Management
              </a>
              
              <div>
                <button
                  onClick={() => setIsFinancialOpen(!isFinancialOpen)}
                  className="w-full group flex items-center justify-between px-2 py-2 text-sm leading-6 font-medium rounded-md text-orange-600 bg-orange-50"
                >
                  <div className="flex items-center">
                    <CurrencyRupeeIcon className="mr-4 h-6 w-6 text-orange-500" />
                    Financial Management
                  </div>
                  {isFinancialOpen ? (
                    <ChevronUpIcon className="h-5 w-5 text-orange-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-orange-500" />
                  )}
                </button>
                
                {isFinancialOpen && (
                  <div className="pl-12 space-y-1 mt-1">
                    <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-orange-600 hover:bg-orange-50">
                      Income
                    </a>
                    <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      Expense
                    </a>
                    <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      Note
                    </a>
                  </div>
                )}
              </div>

              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <BuildingOfficeIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Facility Management
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <ChatBubbleLeftRightIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Complaint Tracking
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <ShieldCheckIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Security Management
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <UserIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Security Guard
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <SpeakerWaveIcon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                Announcement
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};