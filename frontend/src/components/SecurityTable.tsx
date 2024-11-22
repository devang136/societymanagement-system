import React from 'react';

export interface SecurityGuard {
  id: string;
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  area: string;
  contact: string;
  status: 'active' | 'inactive';
  lastCheckIn?: string;
}

interface SecurityTableProps {
  guards: SecurityGuard[];
  onEdit: (guard: SecurityGuard) => void;
  onDelete: (guard: SecurityGuard) => void;
  onView: (guard: SecurityGuard) => void;
}

const SecurityTable: React.FC<SecurityTableProps> = ({
  guards,
  onEdit,
  onDelete,
  onView,
}) => {
  const getStatusColor = (status: SecurityGuard['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shift
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Area
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Check-in
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {guards.map((guard) => (
            <tr key={guard.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {guard.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {guard.shift.charAt(0).toUpperCase() + guard.shift.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {guard.area}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {guard.contact}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guard.status)}`}>
                  {guard.status.charAt(0).toUpperCase() + guard.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {guard.lastCheckIn || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onView(guard)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(guard)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(guard)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityTable;
