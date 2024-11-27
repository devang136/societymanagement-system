import { Edit2, Eye, Trash2 } from 'lucide-react';
import React from 'react';
interface Request {
  id: string;
  requesterName: string;
  requestName: string;
  description: string;
  requestDate: string;
  unitNumber: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Solve';
  avatar: string;
}

interface RequestTableProps {
  requests: Request[];
  onView: (request: Request) => void;
  onEdit: (request: Request) => void;
  onDelete: (request: Request) => void;
}

export default function RequestTable({ requests, onView, onEdit, onDelete }: RequestTableProps) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Requester Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Request Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Request Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Unit Number</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img src={request.avatar} alt="" className="w-8 h-8 rounded-full mr-3" />
                  <span className="text-sm text-gray-900">{request.requesterName}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{request.requestName}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{request.description}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{request.requestDate}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{request.unitNumber}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onView(request)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(request)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(request)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}