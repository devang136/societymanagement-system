import React from 'react';

type PaymentCardProps = {
  eventName: string;
  eventDate: string;
  amount: number;
  onPayNow: () => void;
};

export const PaymentCard = ({ eventName, eventDate, amount, onPayNow }: PaymentCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <span className="text-white text-sm font-medium">Due Event Payment</span>
        <span className="text-white/80 text-sm">Pending</span>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Event Name</span>
          <span className="text-gray-700 text-sm">{eventName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Event Due Date</span>
          <span className="text-gray-700 text-sm">{eventDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Amount</span>
          <span className="text-red-500 text-sm">{amount.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onPayNow}
          className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}