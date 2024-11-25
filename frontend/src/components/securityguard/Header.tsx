import { Bell, User } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">/</span>
        <span className="text-blue-600">Security Guard</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-2">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}