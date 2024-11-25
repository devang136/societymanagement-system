import React from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface MaintenanceDetails {
  name: string;
  date: string;
  wing: string;
  unit: string;
  status: 'Owner' | 'Tenant';
  amount: number;
  penalty: number | null;
  paymentStatus: 'Pending' | 'Done';
  paymentType: 'Online' | 'Cash';
}

interface ViewMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: MaintenanceDetails;
}

export const ViewMaintenanceModal: React.FC<ViewMaintenanceModalProps> = ({
  isOpen,
  onClose,
  details
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-medium">
              View Maintenance Details
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              ×
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                className="h-12 w-12 rounded-full"
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${details.name}`}
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">{details.name}</h3>
              <p className="text-sm text-gray-500">{format(new Date(details.date), 'MMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Wing</span>
                <p className="text-blue-600 font-medium">{details.wing}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Unit</span>
                <p>{details.unit}</p>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Status</span>
              <span className={clsx(
                'ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                details.status === 'Tenant' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
              )}>
                {details.status}
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-500">Amount</span>
              <p className="text-green-600 font-medium">₹ {details.amount}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Penalty</span>
              {details.penalty ? (
                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {details.penalty}
                </span>
              ) : (
                <span className="ml-2">--</span>
              )}
            </div>

            <div>
              <span className="text-sm text-gray-500">Payment Status</span>
              <span className={clsx(
                'ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                details.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              )}>
                {details.paymentStatus}
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-500">Payment Type</span>
              <span className={clsx(
                'ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                details.paymentType === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              )}>
                {details.paymentType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};