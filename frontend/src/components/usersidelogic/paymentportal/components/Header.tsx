import { Bell, ChevronDown } from 'lucide-react';
import { Link } from './ui/Link';
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
    <div className="flex justify-between items-center p-4 bg-white">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Maintenance Invoices</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}