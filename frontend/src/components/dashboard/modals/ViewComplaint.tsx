import React from 'react';
import { Dialog } from '@headlessui/react';

interface ViewComplaintProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: {
    name: string;
    complaintName: string;
    description: string;
    wing: string;
    unit: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'New' | 'In Progress' | 'Resolved';
    date: string;
    avatar: string;
  };
}

export function ViewComplaint({ isOpen, onClose, complaint }: ViewComplaintProps) {
  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    'New': 'text-blue-500',
    'In Progress': 'text-yellow-500',
    'Resolved': 'text-green-500'
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4 flex items-center gap-4">
            <img src={complaint.avatar} alt="" className="h-10 w-10 rounded-full" />
            <div>
              <div className="text-gray-900">{complaint.name}</div>
              <div className="text-sm text-gray-500">{complaint.date}</div>
            </div>
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Complaint Name</div>
              <div className="mt-1">{complaint.complaintName}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Description</div>
              <div className="mt-1">{complaint.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Wing</div>
                <div className="mt-1">{complaint.wing}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Unit</div>
                <div className="mt-1">{complaint.unit}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Priority</div>
                <div className={`mt-1 inline-flex rounded-full px-2 text-xs font-semibold ${priorityColors[complaint.priority]}`}>
                  {complaint.priority}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className={`mt-1 ${statusColors[complaint.status]}`}>
                  {complaint.status}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
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