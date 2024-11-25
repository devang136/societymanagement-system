import { useState } from 'react';
import { Expense } from '../types/expense';

const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Office Rent',
    description: 'Monthly office space rental payment',
    date: '2024-03-15',
    amount: 25000,
    billFormat: 'PDF'
  },
  {
    id: '2',
    title: 'Utilities',
    description: 'Electricity and water bills for March',
    date: '2024-03-10',
    amount: 5000,
    billFormat: 'JPG'
  },
  {
    id: '3',
    title: 'Internet Service',
    description: 'Monthly broadband subscription',
    date: '2024-03-05',
    amount: 1500,
    billFormat: 'PDF'
  },
  {
    id: '4',
    title: 'Office Supplies',
    description: 'Stationery and printer cartridges',
    date: '2024-03-01',
    amount: 3000,
    billFormat: 'JPG'
  }
];

export function useExpense() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    expense?: Expense;
  }>({
    open: false,
    mode: 'add',
  });

  const handleSubmit = (expenseData: Partial<Expense>) => {
    if (dialogState.mode === 'add') {
      const newExpense = {
        ...expenseData,
        id: Math.random().toString(36).slice(2),
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
    handleDelete
  };
} 