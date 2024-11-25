import React from 'react';
import { Dialog } from '@headlessui/react';

interface ViewComplaintProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: {
    name: string;
    date: string;
    complaintName: string;
    description: string;
    wing: string;
    unit: string;
    priority: string;
    status: string;
    avatar: string;
  };
}

export function ViewComplaint({ isOpen, onClose, complaint }: ViewComplaintProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <img src={complaint.avatar} alt={complaint.name} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold text-lg">{complaint.name}</h3>
              <p className="text-sm text-gray-500">{complaint.date}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Complaint Name</label>
              <p className="font-medium">{complaint.complaintName}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <p className="font-medium">{complaint.description}</p>
            </div>
            
            <div className="flex space-x-4">
              <div>
                <label className="text-sm text-gray-600">Wing</label>
                <p className="font-medium">{complaint.wing}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Unit</label>
                <p className="font-medium">{complaint.unit}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div>
                <label className="text-sm text-gray-600">Priority</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                  complaint.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {complaint.priority}
                </span>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <span className={`inline-block ${
                  complaint.status === 'Open' ? 'text-blue-500' :
                  complaint.status === 'Pending' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {complaint.status}
                </span>
              </div>
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
// ViewComplaint dasboard file 