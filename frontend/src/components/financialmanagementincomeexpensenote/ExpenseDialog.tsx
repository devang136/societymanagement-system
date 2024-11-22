import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './financialmanagementexpenseui/dialog';
import { Input } from './financialmanagementexpenseui/input';
import { Button } from './financialmanagementexpenseui/button';
import Calendar from './financialmanagementexpenseui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './financialmanagementexpenseui/popover';
import { cn, formatDate } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Expense } from '@/types/expense';

interface ExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Partial<Expense>) => void;
  expense?: Expense;
}

export default function ExpenseDialog({
  isOpen,
  onClose,
  onSave,
  expense,
}: ExpenseDialogProps) {
  const [date, setDate] = React.useState<Date | undefined>(expense?.date);
  const [description, setDescription] = React.useState(expense?.description || '');
  const [amount, setAmount] = React.useState(expense?.amount?.toString() || '');
  const [category, setCategory] = React.useState(expense?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: date || new Date(),
      description,
      amount: parseFloat(amount),
      category,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDate(date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate: Date | undefined) => setDate(selectedDate)}
                  disabled={(date: Date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}