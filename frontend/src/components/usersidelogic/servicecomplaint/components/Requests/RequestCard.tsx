import React from 'react';
import { Request } from '../../types';
import { MoreVertical } from 'lucide-react';

interface RequestCardProps {
  request: Request;
  onDelete: (id: string) => void;
}

export function RequestCard({ request, onDelete }: RequestCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-500">Request Date: {request.requestDate}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded ${
            request.status === 'Open' ? 'bg-green-100 text-green-800' :
            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {request.status}
          </span>
          <button 
            onClick={() => onDelete(request.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{request.description}</p>
    </div>
  );
}