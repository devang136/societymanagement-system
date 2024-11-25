import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unitNumber?: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, unitNumber }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-2">
          Vacate Confirmation - Unit {unitNumber}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to vacate this unit? This action will remove all resident details and cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm Vacate
          </button>
        </div>
      </div>
    </div>
  );
}