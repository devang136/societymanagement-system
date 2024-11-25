import React from 'react';

interface MaintenanceHeaderProps {
  maintenanceAmount: number;
  penaltyAmount: number;
  onSetMaintenance: () => void;
}

export const MaintenanceHeader: React.FC<MaintenanceHeaderProps> = ({
  maintenanceAmount,
  penaltyAmount,
  onSetMaintenance
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <div className="text-lg font-semibold">Maintenance Amount</div>
        <div className="text-2xl text-green-600">₹ {maintenanceAmount}</div>
      </div>
      <div>
        <div className="text-lg font-semibold">Penalty Amount</div>
        <div className="text-2xl text-red-600">₹ {penaltyAmount}</div>
      </div>
      <button
        onClick={onSetMaintenance}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Set Maintenance
      </button>
    </div>
  );
};