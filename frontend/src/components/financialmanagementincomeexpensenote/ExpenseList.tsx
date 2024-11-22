import React, { FC, useState, useEffect } from 'react';
import { Expense } from '../../types';
import ExpenseTable from './ExpenseTable';
import ExpenseDialog from './ExpenseDialog';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../../services/api';

const ExpenseList: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleCreateExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      await createExpense(expense);
      fetchExpenses();
      setShowDialog(false);
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleUpdateExpense = async (id: string, expense: Partial<Expense>) => {
    try {
      await updateExpense(id, expense);
      fetchExpenses();
      setShowDialog(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Expense
        </button>
      </div>

      <ExpenseTable
        expenses={expenses}
        onEdit={(expense) => {
          setSelectedExpense(expense);
          setShowDialog(true);
        }}
        onDelete={handleDeleteExpense}
      />

      {showDialog && (
        <ExpenseDialog
          expense={selectedExpense}
          onClose={() => {
            setShowDialog(false);
            setSelectedExpense(null);
          }}
          onSubmit={selectedExpense ? 
            (data) => handleUpdateExpense(selectedExpense.id, data) :
            handleCreateExpense
          }
        />
      )}
    </div>
  );
};

export default ExpenseList;
