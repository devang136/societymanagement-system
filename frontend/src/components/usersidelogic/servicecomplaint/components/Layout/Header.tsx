import { Bell, Search, Menu } from 'lucide-react';
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
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Menu className="h-6 w-6 text-gray-500 lg:hidden" />
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Service And Complaint</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center space-x-3">
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}