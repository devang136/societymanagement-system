import React from 'react';
import { Button } from './financialmanagementexpenseui/button';
import { Income } from '@/types/expense';
import OtherIncomeModal from './OtherIncomeModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './financialmanagementexpenseui/table';
import { formatDate } from '@/lib/utils';
import { mockIncomes } from '@/data/mockData';

export default function OtherIncomeSection() {
  const [incomes, setIncomes] = React.useState<Income[]>(mockIncomes);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedIncome, setSelectedIncome] = React.useState<Income | undefined>(undefined);

  const handleAddIncome = () => {
    setSelectedIncome(undefined);
    setIsModalOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleSaveIncome = (income: Partial<Income>) => {
    if (selectedIncome) {
      setIncomes(incomes.map(i => i.id === selectedIncome.id ? { ...income, id: selectedIncome.id } as Income : i));
    } else {
      setIncomes([...incomes, { ...income, id: Date.now() } as Income]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Other Income</h2>
        <Button onClick={handleAddIncome}>Add Income</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{formatDate(income.date)}</TableCell>
              <TableCell>{income.description}</TableCell>
              <TableCell>₹{income.amount.toFixed(2)}</TableCell>
              <TableCell>{income.category}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditIncome(income)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteIncome(income.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OtherIncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveIncome}
        income={selectedIncome}
      />
    </div>
  );
}