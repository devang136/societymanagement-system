import React from 'react';
import { Button } from '@/components/ui/button';
import ExpenseTable from '@/components/expense/ExpenseTable';
import ExpenseDialog from '@/components/expense/ExpenseDialog';
import { Plus } from 'lucide-react';
import { type Expense } from '@/types/expense';

const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    description: 'Rent or Mortgage',
    amount: 1000,
    category: 'Housing',
    date: new Date('2024-02-15'),
  },
  {
    id: 2,
    description: 'Utilities',
    amount: 150,
    category: 'Utilities',
    date: new Date('2024-02-15'),
  },
  {
    id: 3,
    description: 'Groceries',
    amount: 200,
    category: 'Food',
    date: new Date('2024-02-14'),
  },
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
      const newExpense: Expense = {
        ...expenseData,
        id: Math.floor(Math.random() * 1000000),
        date: expenseData.date || new Date(),
        description: expenseData.description || '',
        amount: expenseData.amount || 0,
        category: expenseData.category || 'Other',
      };
      setExpenses([newExpense, ...expenses]);
    } else if (dialogState.mode === 'edit' && dialogState.expense) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === dialogState.expense?.id
            ? {
                ...expense,
                description: expenseData.description || expense.description,
                amount: expenseData.amount || expense.amount,
                category: expenseData.category || expense.category,
                date: expenseData.date || expense.date,
              }
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
            <h1 className="text-2xl font-bold">Expense Management</h1>
            <Button
              onClick={() => setDialogState({ open: true, mode: 'add' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Expense
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