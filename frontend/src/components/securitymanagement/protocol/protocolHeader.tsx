import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">/</span>
        <span className="text-[#FF5733]">Security Protocols</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}