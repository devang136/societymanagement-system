import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">/</span>
        <span className="text-orange-500">Events Participation</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-600" />
        </button>
        
        <div className="flex items-center gap-3">
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
    </div>
  );
};

export default Header;