import React from 'react';

interface ResidenceStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { wing: string; unit: string; status: string }) => void;
}

export function ResidenceStatusModal({ isOpen, onClose, onSave }: ResidenceStatusModalProps) {
  const [wing, setWing] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [status, setStatus] = React.useState('occupied');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Update Residence Status</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wing*</label>
            <select
              value={wing}
              onChange={(e) => setWing(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Wing</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit*</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Unit</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${1001 + i}`}>{1001 + i}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="occupied"
                  checked={status === 'occupied'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                <span>Occupied</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="vacate"
                  checked={status === 'vacate'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                <span>Vacate</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ wing, unit, status })}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            disabled={!wing || !unit}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}