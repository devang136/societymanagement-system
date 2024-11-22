import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './financialmanagementexpenseui/dialog';
import { Input } from './financialmanagementexpenseui/input';
import { Button } from './financialmanagementexpenseui/button';
import { Income } from '@/types/expense';
import { Popover, PopoverContent, PopoverTrigger } from './financialmanagementexpenseui/popover';
import Calendar from './financialmanagementexpenseui/calendar';
import { cn, formatDate } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface OtherIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: Partial<Income>) => void;
  income?: Income;
}

export default function OtherIncomeModal({
  isOpen,
  onClose,
  onSave,
  income,
}: OtherIncomeModalProps) {
  const [date, setDate] = React.useState<Date | undefined>(income?.date);
  const [description, setDescription] = React.useState(income?.description || '');
  const [amount, setAmount] = React.useState(income?.amount?.toString() || '');
  const [category, setCategory] = React.useState(income?.category || '');

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
          <DialogTitle>{income ? 'Edit Income' : 'Add Income'}</DialogTitle>
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
                  selected={date}
                  onSelect={setDate}
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