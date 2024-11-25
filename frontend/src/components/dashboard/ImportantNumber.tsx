import React, { useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { EditImportantNumber } from '../dashboardmodals/EditImportantNumber';
import { DeleteConfirmation } from '../dashboardmodals/DeleteConfirmation';

interface ImportantNumberProps {
  number: {
    id: number;
    name: string;
    phoneNumber: string;
    work: string;
  };
  onEdit?: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
}

export function ImportantNumber({ number, onEdit, onDelete }: ImportantNumberProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (data: any) => {
    onEdit?.(number.id, data);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(number.id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-medium">{number.name}</p>
          <p className="text-sm text-gray-500">{number.phoneNumber}</p>
          <p className="text-xs text-gray-400">{number.work}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-1 text-gray-400 hover:text-blue-500"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-1 text-gray-400 hover:text-red-500"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <EditImportantNumber
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEdit}
        number={number}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Number?"
        message="Are you sure you want to delete this number?"
      />
    </>
  );
}
// ImportantNumber dashboard file 