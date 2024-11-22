import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAddNew?: () => void;
}

export function Header({ title, onAddNew }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Home</span>
          <ChevronRight size={16} />
          <span className="text-gray-900">Resident Management</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </div>
            <span className="text-sm font-medium">Moni Roy</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}