import { Shield } from 'lucide-react';
import { UserNav } from './UserNav';
import React from 'react';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-semibold text-orange-600">
          <Shield size={24} />
          <span>DashStack</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}