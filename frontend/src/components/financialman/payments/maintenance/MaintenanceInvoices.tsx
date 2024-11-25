import React from 'react';

export const MaintenanceInvoices: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Maintenance Invoices</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium">Monthly Maintenance</h2>
            <p className="text-sm text-gray-500">View and manage maintenance payments</p>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Generate Invoice
          </button>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-600">No maintenance invoices found</p>
        </div>
      </div>
    </div>
  );
}; 