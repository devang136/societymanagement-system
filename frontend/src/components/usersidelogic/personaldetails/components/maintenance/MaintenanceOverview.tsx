import React from 'react';

interface MaintenanceOverviewProps {
  maintenanceAmount: number;
  penaltyAmount: number;
}

export function MaintenanceOverview({ maintenanceAmount, penaltyAmount }: MaintenanceOverviewProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-medium">Show Maintenance Details</h2>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1 h-8 bg-green-500 rounded"></div>
          <div>
            <div className="text-sm text-gray-500">Maintenance Amount</div>
            <div className="font-medium text-green-600">₹ {maintenanceAmount}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-8 bg-red-500 rounded"></div>
          <div>
            <div className="text-sm text-gray-500">Penalty Amount</div>
            <div className="font-medium text-red-600">₹ {penaltyAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}