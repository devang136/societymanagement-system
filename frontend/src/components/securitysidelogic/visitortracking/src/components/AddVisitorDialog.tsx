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
    wing: '',
    unit: '',
    date: '',
    time: '',
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm">Date*</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full rounded-md border p-2 pr-10"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm">Time*</label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full rounded-md border p-2 pr-10"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                  <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}