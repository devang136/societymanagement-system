import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Complaint } from '../../types/complaint';

interface ComplaintTableProps {
  complaints: Complaint[];
  onView: (complaint: Complaint) => void;
  onEdit: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
}

export function ComplaintTable({ complaints, onView, onEdit, onDelete }: ComplaintTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4">Complainer Name</th>
            <th className="text-left p-4">Complaint Name</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Unit Number</th>
            <th className="text-left p-4">Priority</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${complaint.complainerName}`}
                  alt={complaint.complainerName}
                  className="w-8 h-8 rounded-full"
                />
                {complaint.complainerName}
              </td>
              <td className="p-4">{complaint.complaintName}</td>
              <td className="p-4">{complaint.description}</td>
              <td className="p-4">{complaint.unitNumber}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    complaint.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : complaint.priority === 'Medium'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {complaint.priority}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    complaint.status === 'Open'
                      ? 'bg-gray-100 text-gray-700'
                      : complaint.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {complaint.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(complaint)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(complaint)}
                    className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(complaint.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
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