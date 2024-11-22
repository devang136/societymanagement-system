import React from 'react';
import { Request } from './RequestTable';

interface ViewRequestProps {
  request: Request;
  onClose: () => void;
}

const ViewRequest: React.FC<ViewRequestProps> = ({ request, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <p className="mt-1 text-sm text-gray-900">{request.title}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{request.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1 text-sm text-gray-900">{request.status}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <p className="mt-1 text-sm text-gray-900">{request.priority}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <p className="mt-1 text-sm text-gray-900">{request.category}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Requested By</label>
            <p className="mt-1 text-sm text-gray-900">{request.requestedBy}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <p className="mt-1 text-sm text-gray-900">{request.date}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewRequest;
