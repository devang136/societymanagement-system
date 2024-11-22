import React from 'react';
import { Maintenance } from '@/types/expense';
import { X } from 'lucide-react';

interface ViewMaintenanceModalProps {
  isOpen: boolean;
  maintenance: Maintenance;
  onClose: () => void;
}

const ViewMaintenanceModal: React.FC<ViewMaintenanceModalProps> = ({
  isOpen,
  maintenance,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Maintenance Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="mt-1 text-sm text-gray-900">
              {maintenance.date.toLocaleDateString()}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Title</h3>
            <p className="mt-1 text-sm text-gray-900">{maintenance.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{maintenance.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${
                  maintenance.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : maintenance.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
            >
              {maintenance.status}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Priority</h3>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${
                  maintenance.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : maintenance.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
            >
              {maintenance.priority}
            </span>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMaintenanceModal;
