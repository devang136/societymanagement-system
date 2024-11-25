import React from 'react';

interface MaintenanceProps {
  maintenance: {
    id: number;
    name: string;
    amount: number;
    avatar: string;
    date: string;
  };
}

export function PendingMaintenance({ maintenance }: MaintenanceProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <img
          src={maintenance.avatar}
          alt={maintenance.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{maintenance.name}</p>
          <p className="text-xs text-gray-500">{maintenance.date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-red-500">₹ {maintenance.amount.toLocaleString()}</span>
      </div>
    </div>
  );
}
// PendingMaintenance dashboard file 