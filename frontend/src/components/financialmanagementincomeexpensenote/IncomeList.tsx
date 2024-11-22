import React, { FC, useState, useEffect } from 'react';
import { Income } from '../../types';
import { getIncomes, createIncome, updateIncome, deleteIncome } from '../../services/api';
import OtherIncomeSection from './OtherIncomeSection';
import OtherIncomeModal from './OtherIncomeModal';

const IncomeList: FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const handleCreateIncome = async (income: Omit<Income, 'id'>) => {
    try {
      await createIncome(income);
      fetchIncomes();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  const handleUpdateIncome = async (id: string, income: Partial<Income>) => {
    try {
      await updateIncome(id, income);
      fetchIncomes();
      setShowModal(false);
      setSelectedIncome(null);
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    try {
      await deleteIncome(id);
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Income Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Income
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <OtherIncomeSection
          incomes={incomes}
          onEdit={(income) => {
            setSelectedIncome(income);
            setShowModal(true);
          }}
          onDelete={handleDeleteIncome}
        />
      </div>

      {showModal && (
        <OtherIncomeModal
          income={selectedIncome}
          onClose={() => {
            setShowModal(false);
            setSelectedIncome(null);
          }}
          onSubmit={selectedIncome ? 
            (data) => handleUpdateIncome(selectedIncome.id, data) :
            handleCreateIncome
          }
        />
      )}
    </div>
  );
};

export default IncomeList;
