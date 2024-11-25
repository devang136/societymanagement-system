import { X } from 'lucide-react';
import { SecurityGuard } from './types';
import React from 'react';
interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  guard: SecurityGuard | null;
}

export function ViewModal({ isOpen, onClose, guard }: ViewModalProps) {
  if (!isOpen || !guard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">View Security Guard Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src={guard.avatar}
              alt={guard.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold">{guard.name}</h3>
            <p className="text-sm text-gray-500">Feb 10, 2024</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                guard.shift === 'Day' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {guard.shift}
              </div>
              <p className="mt-1 text-sm text-gray-500">Shift</p>
            </div>
            <div>
              <div className="text-sm font-medium">{guard.time}</div>
              <p className="mt-1 text-sm text-gray-500">Time</p>
            </div>
            <div>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                guard.gender === 'Male'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-pink-100 text-pink-800'
              }`}>
                {guard.gender}
              </div>
              <p className="mt-1 text-sm text-gray-500">Gender</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-sm font-medium">{guard.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shift Date</p>
                <p className="text-sm font-medium">{guard.date}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}