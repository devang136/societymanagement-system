import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn, formatDate } from './lib/utils';
import { Calendar as CalendarIcon, Upload } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: date.toISOString(),
      amount: parseFloat(formData.get('amount') as string),
      billFormat: file?.type.includes('pdf') ? 'PDF' : 'JPG',
      file: file || undefined,
    });
  };

  const isViewMode = mode === 'view';
  const title = {
    add: 'Add Expense',
    edit: 'Edit Expense',
    view: 'View Expense Details',
  }[mode];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={expense?.title}
              required
              disabled={isViewMode}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              defaultValue={expense?.description}
              required
              disabled={isViewMode}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                    disabled={isViewMode}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(date)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    disabled={isViewMode}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue={expense?.amount}
                required
                disabled={isViewMode}
              />
            </div>
          </div>
          {!isViewMode && (
            <div className="space-y-2">
              <Label>Upload Bill</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload a file or drag and drop
                </Button>
                {file && <p className="mt-2 text-sm text-muted-foreground">{file.name}</p>}
              </div>
            </div>
          )}
          {!isViewMode && (
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Save' : 'Update'}</Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}