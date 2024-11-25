import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ExpenseDialog } from './ExpenseDialog';
import { Edit, Trash2 } from "lucide-react";
import { useExpense } from './hooks/useExpense';
import { ExpenseTable } from './ExpenseTable';

interface ExpenseType {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

export function FinancialExpense() {
  const {
    expenses,
    dialogState,
    setDialogState,
    handleSubmit,
    handleDelete
  } = useExpense();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Expense Management</h1>
            <Button
              onClick={() => setDialogState({ open: true, mode: 'add', expense: undefined })}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Expense
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
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
        </div>
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