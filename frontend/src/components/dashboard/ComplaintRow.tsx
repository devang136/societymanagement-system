import React, { useState } from 'react';
import { ViewComplaint } from '../dashboardmodals/ViewComplaint';
import { EditComplaint } from '../dashboardmodals/EditComplaint';
import { DeleteConfirmation } from '../dashboardmodals/DeleteConfirmation';

interface ComplaintRowProps {
  complaint: {
    id: number;
    name: string;
    complaintName: string;
    date: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Pending' | 'Solve';
    avatar: string;
    description?: string;
    wing?: string;
    unit?: string;
  };
  onEdit?: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
}

export function ComplaintRow({ complaint, onEdit, onDelete }: ComplaintRowProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-blue-100 text-blue-800',
    Low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    Open: 'text-blue-500',
    Pending: 'text-yellow-500',
    Solve: 'text-green-500'
  };

  const handleEdit = (data: any) => {
    onEdit?.(complaint.id, data);
  };

  const handleDelete = () => {
    onDelete?.(complaint.id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <tr className="border-t">
        <td className="py-4">
          <div className="flex items-center space-x-3">
            <img
              src={complaint.avatar}
              alt={complaint.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{complaint.name}</span>
          </div>
        </td>
        <td className="py-4">{complaint.complaintName}</td>
        <td className="py-4">{complaint.date}</td>
        <td className="py-4">
          <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[complaint.priority]}`}>
            {complaint.priority}
          </span>
        </td>
        <td className="py-4">
          <span className={statusColors[complaint.status]}>
            {complaint.status}
          </span>
        </td>
        <td className="py-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsViewOpen(true)}
              className="p-1 text-green-500 hover:bg-green-50 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsEditOpen(true)}
              className="p-1 text-blue-500 hover:bg-blue-50 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsDeleteOpen(true)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      <ViewComplaint
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        complaint={{
          ...complaint,
          description: complaint.description || 'No description provided',
          wing: complaint.wing || 'A',
          unit: complaint.unit || '1001',
        }}
      />

      <EditComplaint
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEdit}
        complaint={{
          ...complaint,
          description: complaint.description || '',
          wing: complaint.wing || 'A',
          unit: complaint.unit || '1001',
        }}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Complaint?"
        message="Are you sure you want to delete this complaint?"
      />
    </>
  );
}
// ComplaintRow dashboard file 