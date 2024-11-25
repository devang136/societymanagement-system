import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import type { Complaint } from '../../../types';

interface ComplaintTableProps {
  complaints: Complaint[];
  onView: (complaint: Complaint) => void;
  onEdit: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
}

export function ComplaintTable({ complaints, onView, onEdit, onDelete }: ComplaintTableProps) {
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Complainer Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Complaint Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Unit Number</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-900">{complaint.complainerName}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{complaint.complaintName}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{complaint.description}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{complaint.date}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{complaint.unitNumber}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onView(complaint)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(complaint)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(complaint.id)}
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