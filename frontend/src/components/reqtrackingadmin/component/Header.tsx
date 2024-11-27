import { Bell } from 'lucide-react';
import React from 'react';
interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">/</span>
        <span className="text-blue-600">Request Tracking</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}