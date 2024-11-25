import React from 'react';
import { OtherIncome } from '../data/mockData';
import { OtherIncomeCard } from './OtherIncomeCard';

interface OtherIncomeSectionProps {
  otherIncomes: OtherIncome[];
  onCreateIncome: () => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OtherIncomeSection: React.FC<OtherIncomeSectionProps> = ({
  otherIncomes,
  onCreateIncome,
  onEdit,
  onView,
  onDelete
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Other Income</h2>
        <button
          onClick={onCreateIncome}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Create Other Income
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherIncomes.map((income) => (
          <OtherIncomeCard
            key={income.id}
            {...income}
            onEdit={() => onEdit(income.id)}
            onView={() => onView(income.id)}
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};