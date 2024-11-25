import React from 'react';
import { Button } from '@/components/ui/button';
import { ExpenseTable } from '@/components/ExpenseTable';
import { ExpenseDialog } from '@/components/ExpenseDialog';
import { Plus } from 'lucide-react';
import { type Expense } from '@/types/expense';

const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Rent or Mortgage',
    description: 'A visual representation of your spending categories...',
    date: '2024-02-15',
    amount: 1000,
    billFormat: 'JPG',
  },
  {
    id: '2',
    title: 'Housing Costs',
    description: 'Track the fluctuations in your spending over time...',
    date: '2024-02-15',
    amount: 1000,
    billFormat: 'PDF',
  },
  // Add more mock expenses as needed
];

function App() {
  const [expenses, setExpenses] = React.useState<Expense[]>(MOCK_EXPENSES);
  const [dialogState, setDialogState] = React.useState<{
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">DashStack</h1>
            <Button
              onClick={() => setDialogState({ open: true, mode: 'add' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Expenses details
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ExpenseTable
          expenses={expenses}
          onView={(expense) =>
            setDialogState({ open: true, mode: 'view', expense })
          }
          onEdit={(expense) =>
            setDialogState({ open: true, mode: 'edit', expense })
          }
          onDelete={handleDelete}
        />
      </main>

      <ExpenseDialog
        open={dialogState.open}
        onOpenChange={(open) =>
          setDialogState({ ...dialogState, open })
        }
        mode={dialogState.mode}
        expense={dialogState.expense}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;