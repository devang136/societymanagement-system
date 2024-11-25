import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { FileText, Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from './lib/utils';
import { type Expense } from './types/expense';

interface ExpenseTableProps {
  expenses: Expense[];
  onView: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseTable({ expenses, onView, onEdit, onDelete }: ExpenseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Bill Format</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.title}</TableCell>
            <TableCell className="max-w-[300px] truncate">{expense.description}</TableCell>
            <TableCell>{formatDate(expense.date)}</TableCell>
            <TableCell>₹ {expense.amount}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {expense.billFormat}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => onView(expense)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onEdit(expense)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(expense)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}