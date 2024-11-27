import React from 'react';

interface MaintenanceCardProps {
  type: string;
  status: string;
  billDate: string;
  pendingDate: string;
  amount: number;
  penaltyAmount: number;
}

export function MaintenanceCard({
  type,
  status,
  billDate,
  pendingDate,
  amount,
  penaltyAmount,
}: MaintenanceCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">{type}</span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
            {status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Bill Date</span>
          <span>{billDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pending Date</span>
          <span>{pendingDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="text-red-500">₹{amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Penalty Amount</span>
          <span className="text-red-500">₹{penaltyAmount}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Grand Total</span>
          <span>₹{amount + penaltyAmount}</span>
        </div>
      </div>
      
      <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
        Pay Now
      </button>
    </div>
  );
}