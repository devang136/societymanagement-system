import React from 'react';
import { Sidebar } from '../dashboard/Sidebar';

interface AuthLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userRole: 'admin' | 'user' | 'security' | null;
}

export function AuthLayout({ children, onLogout, userRole }: AuthLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={onLogout} userRole={userRole} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 