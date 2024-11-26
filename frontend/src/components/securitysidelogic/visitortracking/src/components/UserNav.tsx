import { User } from 'lucide-react';
import React from 'react';

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium">Moni Roy</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-100 p-1">
          <User className="h-full w-full text-gray-600" />
        </div>
      </div>
    </div>
  );
}