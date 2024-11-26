import React from 'react';
import { Complaint } from '../../types';
import { MoreVertical } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  onDelete: (id: string) => void;
}

export function ComplaintCard({ complaint, onDelete }: ComplaintCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{complaint.complaintName}</h3>
          <p className="text-sm text-gray-500">Request Date: {complaint.requestDate}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded ${
            complaint.status === 'Open' ? 'bg-green-100 text-green-800' :
            complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {complaint.status}
          </span>
          <button 
            onClick={() => onDelete(complaint.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>
      <div className="flex space-x-4 text-sm text-gray-500">
        <span>Wing: {complaint.wing}</span>
        <span>Unit: {complaint.unit}</span>
        <span className={`${
          complaint.priority === 'High' ? 'text-red-500' :
          complaint.priority === 'Medium' ? 'text-orange-500' :
          'text-green-500'
        }`}>
          Priority: {complaint.priority}
        </span>
      </div>
    </div>
  );
}