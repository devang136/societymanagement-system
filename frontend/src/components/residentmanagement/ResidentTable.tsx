import React from 'react';
import { Check, Info } from 'lucide-react';

interface Resident {
  id: string;
  name: string;
  email: string;
  type: 'owner' | 'tenant';
  unitNumber: string;
  unitStatus: 'Occupied' | 'Vacate';
  residentStatus: 'Tenant' | 'Owner' | '--';
  phoneNumber: string;
  members: number;
  vehicles: number;
  wing: string;
  unit: string;
  age: string;
  gender: string;
  documents: Array<{ name: string; size: string; type: string }>;
  memberDetails: Array<{
    firstName: string;
    phoneNo: string;
    age: string;
    gender: string;
    relation?: string;
  }>;
}

interface ResidentTableProps {
  onResidentClick: (resident: Resident) => void;
  onStatusChange: () => void;
  onDelete: () => void;
}

const sampleResidents: Resident[] = [
  {
    id: '1',
    name: 'Roger Lubin',
    email: 'RogerLubin@gmail.com',
    type: 'tenant',
    unitNumber: 'A 1001',
    unitStatus: 'Occupied',
    residentStatus: 'Tenant',
    phoneNumber: '97587 85828',
    members: 2,
    vehicles: 1,
    wing: 'A',
    unit: '101',
    age: '20',
    gender: 'Male',
    documents: [
      { name: 'Adhaarcard Front Side.JPG', size: '3.5 MB', type: 'image/jpeg' },
      { name: 'Address Proof Front Side.PDF', size: '3.5 MB', type: 'application/pdf' }
    ],
    memberDetails: [
      {
        firstName: 'Roger Lubin',
        phoneNo: '9123455555',
        age: '20',
        gender: 'Male',
        relation: 'Self'
      },
      {
        firstName: 'Roger Lubin',
        phoneNo: '9123455555',
        age: '20',
        gender: 'Male',
        relation: 'Brother'
      }
    ]
  }
  // Add more sample data as needed
];

export function ResidentTable({ onResidentClick, onStatusChange, onDelete }: ResidentTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleResidents.map((resident) => (
              <tr key={resident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                        alt=""
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{resident.unitNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    resident.unitStatus === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {resident.unitStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    resident.residentStatus === 'Tenant' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {resident.residentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.members}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.vehicles}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onStatusChange()}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => onResidentClick(resident)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Info size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}