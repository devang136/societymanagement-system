import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { VisitorFormData } from '../types/visitor';

interface AddVisitorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VisitorFormData) => void;
}

export function AddVisitorDialog({ isOpen, onClose, onSave }: AddVisitorDialogProps) {
  const [formData, setFormData] = useState<VisitorFormData>({
    name: '',
    phone: '',
    wing: '',
    unit: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Add Visitor Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">Visitor Name*</label>
              <input
                type="text"
                className="w-full rounded-md border p-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Phone Number*</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="w-full rounded-md border p-2"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm">Wing*</label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  value={formData.wing}
                  onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Unit*</label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm">Notes</label>
              <textarea
                className="w-full rounded-md border p-2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Add Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}