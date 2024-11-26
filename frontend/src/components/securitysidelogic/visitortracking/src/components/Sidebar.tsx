import { Shield, LogOut } from 'lucide-react';
import React from 'react';

export function Sidebar() {
  return (
    <div className="flex h-full w-56 flex-col border-r bg-gray-100/40">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex h-10 items-center gap-2 rounded-lg bg-orange-500 px-4 text-white">
          <Shield size={20} />
          <span>Security</span>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium">
            Visitor Tracking
          </a>
          <a className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100">
            Emergency Management
          </a>
        </nav>
      </div>
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-2 text-sm text-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}