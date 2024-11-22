import { useState } from 'react';
import { FiTrash2, FiEdit2, FiEye } from 'react-icons/fi';
import { ViewComplaint } from './modals/ViewComplaint';
import { EditComplaint } from './modals/EditComplaint';
import DeleteConfirmation from './modals/DeleteConfirmation';

interface Complaint {
  id: number;
  name: string;
  complaintName: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved';
  avatar: string;
  description: string;
  wing: string;
  unit: string;
}

interface ComplaintRowProps {
  complaint: Complaint;
  onEdit?: (id: number, data: Complaint) => void;
  onDelete?: (id: number) => void;
}

export function ComplaintRow({ complaint, onEdit, onDelete }: ComplaintRowProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  const handleEdit = (formData: Omit<Complaint, 'id' | 'date' | 'avatar'>) => {
    if (onEdit) {
      onEdit(complaint.id, {
        ...complaint,
        ...formData
      });
    }
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(complaint.id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <tr className="border-t">
        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
          <div className="flex items-center gap-x-4">
            <img src={complaint.avatar} alt="" className="h-8 w-8 rounded-full bg-gray-50" />
            <div className="truncate text-sm font-medium leading-6 text-gray-900">{complaint.name}</div>
          </div>
        </td>
        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
          <div className="truncate text-sm leading-6 text-gray-900">{complaint.complaintName}</div>
        </td>
        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
          <div className="flex items-center justify-end gap-x-2 sm:justify-start">
            <time className="text-gray-500 sm:hidden" dateTime={complaint.date}>
              {complaint.date}
            </time>
            <div className={`flex-none rounded-full p-1 px-2 text-xs font-medium ring-1 ring-inset ${priorityColors[complaint.priority]}`}>
              {complaint.priority}
            </div>
          </div>
        </td>
        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-500 md:table-cell lg:pr-20">
          {complaint.date}
        </td>
        <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-gray-500 sm:table-cell sm:pr-8">
          <div className={statusColors[complaint.status]}>{complaint.status}</div>
        </td>
        <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 sm:pr-8 lg:pr-20">
          <div className="flex justify-end gap-x-2">
            <button
              onClick={() => setIsViewOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <FiEye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="text-red-500 hover:text-red-600"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      <ViewComplaint
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        complaint={complaint}
      />

      <EditComplaint
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        complaint={{
          name: complaint.name,
          complaintName: complaint.complaintName,
          description: complaint.description,
          wing: complaint.wing,
          unit: complaint.unit,
          priority: complaint.priority,
          status: complaint.status
        }}
        onSave={handleEdit}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Complaint"
        description="Are you sure you want to delete this complaint? This action cannot be undone."
      />
    </>
  );
}