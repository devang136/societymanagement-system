import { X } from 'lucide-react';
import React from 'react';
interface ViewRequestProps {
  request: {
    requesterName: string;
    requestDate: string;
    requestName: string;
    description: string;
    wing: string;
    unit: string;
    priority: string;
    status: string;
    avatar: string;
  };
  onClose: () => void;
}

export default function ViewRequest({ request, onClose }: ViewRequestProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-600';
      case 'Medium': return 'bg-blue-100 text-blue-600';
      case 'Low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-blue-600';
      case 'Pending': return 'text-yellow-600';
      case 'Solve': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">View Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={request.avatar}
              alt={request.requesterName}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{request.requesterName}</h3>
              <p className="text-sm text-gray-500">Aug 9, 2024</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Request Name</label>
            <p className="mt-1 text-gray-900">{request.requestName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Description</label>
            <p className="mt-1 text-gray-900">
              Offering, giving, receiving, or soliciting of value to influence the actions of an.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Wing</label>
              <p className="mt-1 text-gray-900">A</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Unit</label>
              <p className="mt-1 text-gray-900">1002</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Priority</label>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor('Medium')}`}>
                Medium
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Status</label>
              <span className={`inline-block mt-1 font-medium ${getStatusColor('Open')}`}>
                Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}