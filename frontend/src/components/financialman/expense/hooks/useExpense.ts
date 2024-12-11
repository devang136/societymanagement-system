import { useState, useEffect } from 'react';
import { Expense } from '../types/expense';

export function useExpense() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    expense?: Expense;
  }>({
    open: false,
    mode: 'add',
  });

  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = (expenseData: Partial<Expense>) => {
    if (dialogState.mode === 'add') {
      const newExpense = {
        ...expenseData,
        id: Math.random().toString(36).slice(2), // This will be replaced by the ID from the backend
      } as Expense;
      setExpenses([newExpense, ...expenses]);
    } else if (dialogState.mode === 'edit' && dialogState.expense) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === dialogState.expense?.id
            ? { ...expense, ...expenseData }
            : expense
        )
      );
    }
    setDialogState({ open: false, mode: 'add' });
  };

  const handleDelete = (expense: Expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
  };

  return {
    expenses,
    dialogState,
    setDialogState,
    handleSubmit,
    handleDelete,
  };
} 