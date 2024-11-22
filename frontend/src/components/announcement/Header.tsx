import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 text-sm">
        <a href="#" className="text-gray-500">Home</a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-blue-500">Announcement</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">Moni Roy</p>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>

        <button
          onClick={onCreateClick}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Create Announcement
        </button>
      </div>
    </div>
  );
}