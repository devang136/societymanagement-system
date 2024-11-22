import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Home,
  Users,
  FileText,
  Bell,
  DollarSign,
  Shield,
  Settings,
  MessageSquare,
  Building,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  showLogo?: boolean;
  menuItems?: MenuItem[];
  onLogout?: () => void;
  userName?: string;
  userRole?: string;
  theme?: {
    logo?: {
      text: string;
      color: string;
    };
    activeLink?: string;
    hoverLink?: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  className = '',
  showLogo = true,
  menuItems: customMenuItems,
  onLogout,
  userName,
  userRole,
  theme = {
    logo: { text: 'FMS', color: 'text-blue-600' },
    activeLink: 'bg-blue-50 text-blue-600',
    hoverLink: 'hover:bg-gray-100'
  }
}) => {
  const location = useLocation();
  
  const defaultMenuItems: MenuItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Residents', path: '/residents', icon: <Users size={20} /> },
    { name: 'Security', path: '/security', icon: <Shield size={20} /> },
    { name: 'Facilities', path: '/facilities', icon: <Building size={20} /> },
    { name: 'Complaints', path: '/complaints', icon: <MessageSquare size={20} /> },
    { name: 'Announcements', path: '/announcements', icon: <Bell size={20} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} /> },
    { name: 'Finance', path: '/finance', icon: <DollarSign size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const menuItems = customMenuItems || defaultMenuItems;

  const isActiveLink = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 border-b flex items-center justify-between">
          {showLogo && (
            <div>
              <h1 className={`text-2xl font-bold ${theme.logo?.color || 'text-gray-800'}`}>
                {theme.logo?.text || 'DashStack'}
              </h1>
              <p className="text-sm text-gray-500">Facility Management</p>
            </div>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Info */}
        {(userName || userRole) && (
          <div className="px-4 py-4 border-b">
            {userName && (
              <p className="font-medium text-gray-800">{userName}</p>
            )}
            {userRole && (
              <p className="text-sm text-gray-500">{userRole}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActiveLink(item.path)
                      ? theme.activeLink
                      : `text-gray-700 ${theme.hoverLink}`
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        {onLogout && (
          <div className="p-4 border-t">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
