import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { maintenanceAmount: number; penaltyAmount: number; dueDate: string }) => void;
}

export const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [maintenanceAmount, setMaintenanceAmount] = useState('');
  const [penaltyAmount, setPenaltyAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') { // In real app, use proper authentication
      onSubmit({
        maintenanceAmount: Number(maintenanceAmount),
        penaltyAmount: Number(penaltyAmount),
        dueDate
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <Dialog.Title className="text-lg font-medium mb-4">Add Maintenance Detail</Dialog.Title>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Amount</label>
                <input
                  type="number"
                  value={maintenanceAmount}
                  onChange={(e) => setMaintenanceAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Penalty Amount</label>
                <input
                  type="number"
                  value={penaltyAmount}
                  onChange={(e) => setPenaltyAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Due Date</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};