import React from 'react';
import { Plus } from 'lucide-react';

interface MaintenanceHeaderProps {
  onAddClick: () => void;
}

const MaintenanceHeader: React.FC<MaintenanceHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Maintenance Records</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and track all maintenance activities
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Maintenance
      </button>
    </div>
  );
};

export default MaintenanceHeader;
