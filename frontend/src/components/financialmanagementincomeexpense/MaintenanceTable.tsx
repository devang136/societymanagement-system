import React from 'react';
import { Maintenance } from '@/types/expense';

interface MaintenanceTableProps {
  maintenanceData: Maintenance[];
  onView: (maintenance: Maintenance) => void;
  onDelete: (maintenance: Maintenance) => void;
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  maintenanceData,
  onView,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {maintenanceData.map((maintenance) => (
            <tr key={maintenance.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {maintenance.date.toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {maintenance.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {maintenance.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      maintenance.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : maintenance.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {maintenance.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      maintenance.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : maintenance.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                >
                  {maintenance.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onView(maintenance)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  View
                </button>
                <button
                  onClick={() => onDelete(maintenance)}
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

export default MaintenanceTable;
