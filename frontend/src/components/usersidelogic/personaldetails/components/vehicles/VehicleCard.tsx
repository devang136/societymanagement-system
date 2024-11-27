import React from 'react';

interface VehicleCardProps {
  type: string;
  vehicleName: string;
  vehicleNumber: string;
}

export function VehicleCard({ type, vehicleName, vehicleNumber }: VehicleCardProps) {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="text-blue-600 font-medium mb-3">{type}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Vehicle Name</span>
          <span>{vehicleName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Vehicle Number</span>
          <span>{vehicleNumber}</span>
        </div>
      </div>
    </div>
  );
}