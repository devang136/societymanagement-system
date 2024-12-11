import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload } from 'lucide-react';
import { type Expense } from './types/expense';

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense;
  mode: 'add' | 'edit' | 'view';
  onSubmit: (expense: Partial<Expense>) => void;
}

export function ExpenseDialog({ open, onOpenChange, expense, mode, onSubmit }: ExpenseDialogProps) {
  const [date, setDate] = React.useState<Date>(expense?.date ? new Date(expense.date) : new Date());
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newExpense = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: date.toISOString(),
      amount: parseFloat(formData.get('amount') as string),
      billFormat: file?.type.includes('pdf') ? 'PDF' : 'JPG',
      file: file || undefined,
    };

    // Send POST request to the backend
    try {
      const response = await fetch('/api/expenses/create', {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      const result = await response.json();
      onSubmit(result.expense); // Call the onSubmit prop with the new expense
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={date.toISOString().split('T')[0]} // Format date for input
              onChange={(e) => setDate(new Date(e.target.value))} // Update date state
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type="number" required />
          </div>
          <div>
            <Label>Upload Bill</Label>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              <Upload /> Upload a file
            </Button>
          </div>
          <Button type="submit">{mode === 'add' ? 'Save' : 'Update'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}