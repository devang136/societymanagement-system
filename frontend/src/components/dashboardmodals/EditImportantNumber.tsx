import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface EditImportantNumberProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  number: {
    name: string;
    phoneNumber: string;
    work: string;
  };
}

export function EditImportantNumber({ isOpen, onClose, onSave, number }: EditImportantNumberProps) {
  const [formData, setFormData] = useState(number);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Important Number
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name*
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="+91 99567 33567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Work*
              </label>
              <input
                type="text"
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter Work"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
// EditImportantNumber dashboard file 