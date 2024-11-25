import React from 'react';
import { format } from 'date-fns';

interface OtherIncomeProps {
  id: string;
  title: string;
  amountPerMember: number;
  totalMember: number;
  date: string;
  dueDate: string;
  description: string;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OtherIncomeCard: React.FC<OtherIncomeProps> = ({
  id,
  title,
  amountPerMember,
  totalMember,
  date,
  dueDate,
  description,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <div className="bg-blue-600 p-4 rounded-lg text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(id)}
            className="text-sm text-white hover:text-blue-100"
          >
            Edit
          </button>
          <button
            onClick={() => onView(id)}
            className="text-sm text-white hover:text-blue-100"
          >
            View
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-white hover:text-blue-100"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Amount Per Member</span>
          <span>₹ {amountPerMember}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Member</span>
          <span>{totalMember}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span>{format(new Date(date), 'dd/MM/yyyy')}</span>
        </div>
        <div className="flex justify-between">
          <span>Due Date</span>
          <span>{format(new Date(dueDate), 'dd/MM/yyyy')}</span>
        </div>
        <div className="mt-4">
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};