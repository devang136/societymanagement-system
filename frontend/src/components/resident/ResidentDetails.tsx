import React from 'react';
import { X } from 'lucide-react';

interface Resident {
  id: string;
  name: string;
  unit: string;
  wing: string;
  type: 'owner' | 'tenant';
  status: 'active' | 'inactive';
  contactNumber: string;
  email: string;
}

interface ResidentDetailsProps {
  resident: Resident;
  onClose: () => void;
}

const ResidentDetails: React.FC<ResidentDetailsProps> = ({ resident, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Resident Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg text-gray-900">{resident.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">{resident.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
              <p className="mt-1 text-lg text-gray-900">{resident.contactNumber}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Unit Number</h3>
              <p className="mt-1 text-lg text-gray-900">Unit {resident.unit}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Wing</h3>
              <p className="mt-1 text-lg text-gray-900">Wing {resident.wing}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1">
                <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                  resident.type === 'owner'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {resident.type}
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">
                <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                  resident.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {resident.status}
                </span>
              </p>
            </div>
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

export default ResidentDetails;
