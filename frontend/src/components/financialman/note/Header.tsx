import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userImage: string;
}

export default function Header({ userName, userImage }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" className="hover:text-gray-800">Home</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800">Note</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <img
            src={userImage}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">{userName}</span>
        </div>
      </div>
    </div>
  );
}