import React from 'react';
import { Search, Bell, Settings, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  actions?: React.ReactNode;
  showNotifications?: boolean;
  showProfile?: boolean;
  showSettings?: boolean;
  onMenuClick?: () => void;
  notificationCount?: number;
  userName?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard',
  showSearch = false,
  searchTerm = '',
  onSearchChange,
  actions,
  showNotifications = true,
  showProfile = true,
  showSettings = true,
  onMenuClick,
  notificationCount = 0,
  userName,
  className = '',
}) => {
  return (
    <header className={`bg-white shadow-sm px-4 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          )}

          {actions}

          <div className="flex items-center gap-2">
            {showNotifications && (
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            )}

            {showSettings && (
              <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </Link>
            )}

            {showProfile && (
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <User size={20} />
                </button>
                {userName && (
                  <span className="text-sm font-medium hidden md:block">
                    {userName}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
