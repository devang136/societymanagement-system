import React from "react";

interface MaintenanceHeaderProps {
  onViewInvoice: () => void;
}

export function MaintenanceHeader({ onViewInvoice }: MaintenanceHeaderProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Show Maintenance Details</h2>
        <div className="flex space-x-4">
          <div>
            <span className="text-gray-500">Maintenance Amount</span>
            <p className="text-xl font-semibold text-green-600">₹ 1,500</p>
          </div>
          <div className="border-l pl-4">
            <span className="text-gray-500">Penalty Amount</span>
            <p className="text-xl font-semibold text-red-600">₹ 500</p>
          </div>
          <button 
            onClick={onViewInvoice}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
}