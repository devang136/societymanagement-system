import React from 'react';
import { format } from 'date-fns';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Resident {
  id: string;
  name: string;
  unitNumber: string;
  date: string;
  status: 'Tenant' | 'Owner';
  phoneNumber: string;
  amount: number;
  penalty: number | null;
  paymentStatus: 'Pending' | 'Done';
  paymentType: 'Online' | 'Cash';
  avatar: string;
}

interface MaintenanceTableProps {
  residents: Resident[];
  onViewMaintenance: (id: string) => void;
  onSetMaintenance: () => void;
}

export const MaintenanceTable: React.FC<MaintenanceTableProps> = ({ 
  residents, 
  onViewMaintenance,
  onSetMaintenance 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penalty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={resident.avatar} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-blue-600">{resident.unitNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{format(new Date(resident.date), 'dd/MM/yyyy')}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={clsx(
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  resident.status === 'Tenant' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                )}>
                  {resident.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {resident.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {resident.penalty ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {resident.penalty}
                  </span>
                ) : (
                  '--'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={clsx(
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  resident.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                )}>
                  {resident.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={clsx(
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  resident.paymentType === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                )}>
                  {resident.paymentType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onViewMaintenance(resident.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};