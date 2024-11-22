import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Expense } from '@/types/expense';

interface ExpenseDialogProps {
  open: boolean;
  mode: 'add' | 'edit' | 'view';
  expense?: Expense;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Expense>) => void;
}

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({
  open,
  mode,
  expense,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<Expense>>({
    description: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    } else {
      setFormData({
        description: '',
        amount: 0,
        category: '',
        date: new Date(),
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!open) return null;

  const isViewMode = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : 'View'} Expense
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={formData.amount || 0}
                onChange={(e) =>
                  setFormData({ ...formData, amount: parseFloat(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
              >
                <option value="">Select a category</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Insurance">Insurance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  setFormData({ ...formData, date: new Date(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isViewMode}
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {mode === 'add' ? 'Add' : 'Update'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseDialog;
