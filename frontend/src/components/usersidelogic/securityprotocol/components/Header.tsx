import React from 'react';
import { Shield } from 'lucide-react';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-semibold">DashStack</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{userName}</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}