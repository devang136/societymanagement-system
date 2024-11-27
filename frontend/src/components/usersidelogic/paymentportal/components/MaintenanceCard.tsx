import React from 'react';
import { MaintenanceCard as MaintenanceCardType } from '../types';

interface MaintenanceCardProps {
  data: MaintenanceCardType;
  status: 'pending' | 'due';
  onPayNow: () => void;
}

export function MaintenanceCard({ data, status, onPayNow }: MaintenanceCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
          Maintenance
        </div>
        <div className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full">
          {status === 'pending' ? 'Pending' : 'Due'}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Bill Date</span>
          <span>{data.billDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{status === 'pending' ? 'Pending Date' : 'Date'}</span>
          <span>{data.pendingDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Maintenance Amount</span>
          <span className="text-orange-500">₹{data.maintenanceAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{status === 'pending' ? 'Maintenance Penalty Amount' : 'Due Maintenance Amount'}</span>
          <span className="text-red-500">₹{data.penaltyAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Grand Total</span>
          <span>₹{data.total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={onPayNow}
        className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
}