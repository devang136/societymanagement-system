import React from 'react';
import { Edit, Trash2, Home } from 'lucide-react';

interface Resident {
  id: string;
  name: string;
  unit: string;
  wing: string;
  type: 'owner' | 'tenant';
  status: 'active' | 'inactive';
  contactNumber: string;
  email: string;
}

interface ResidentTableProps {
  onStatusClick: () => void;
  onDeleteClick: (resident: Resident) => void;
  onViewDetails: (resident: Resident) => void;
}

const mockResidents: Resident[] = [
  {
    id: '1',
    name: 'John Doe',
    unit: '101',
    wing: 'A',
    type: 'owner',
    status: 'active',
    contactNumber: '+1234567890',
    email: 'john.doe@example.com'
  },
  {
    id: '2',
    name: 'Jane Smith',
    unit: '202',
    wing: 'B',
    type: 'tenant',
    status: 'active',
    contactNumber: '+1234567891',
    email: 'jane.smith@example.com'
  }
];

const ResidentTable: React.FC<ResidentTableProps> = ({
  onStatusClick,
  onDeleteClick,
  onViewDetails
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit/Wing
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockResidents.map((resident) => (
            <tr key={resident.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                <div className="text-sm text-gray-500">{resident.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Unit {resident.unit}</div>
                <div className="text-sm text-gray-500">Wing {resident.wing}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  resident.type === 'owner' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {resident.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={onStatusClick}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    resident.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {resident.status}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resident.contactNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onViewDetails(resident)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Home className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onViewDetails(resident)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(resident)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentTable;
