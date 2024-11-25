import React, { useState } from 'react';
import type { Complaint, ComplaintFormData } from '../../../types';

interface ComplaintFormProps {
  isEdit?: boolean;
  initialData?: Complaint;
  onClose: () => void;
  onSubmit: (data: ComplaintFormData) => void;
}

export function ComplaintForm({ isEdit = false, initialData, onClose, onSubmit }: ComplaintFormProps) {
  const [formData, setFormData] = useState<ComplaintFormData>({
    complainerName: initialData?.complainerName || '',
    complaintName: initialData?.complaintName || '',
    description: initialData?.description || '',
    wing: initialData?.wing || '',
    unit: initialData?.unit || '',
    priority: initialData?.priority || 'Medium',
    status: initialData?.status || 'Open'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Complaint Name*
        </label>
        <input
          type="text"
          value={formData.complaintName}
          onChange={(e) => setFormData({ ...formData, complaintName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wing*
          </label>
          <input
            type="text"
            value={formData.wing}
            onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit*
          </label>
          <input
            type="text"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority*
        </label>
        <div className="flex space-x-4">
          {['High', 'Medium', 'Low'].map((priority) => (
            <label key={priority} className="flex items-center">
              <input
                type="radio"
                name="priority"
                value={priority}
                checked={formData.priority === priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as "High" | "Medium" | "Low" })}
                className="mr-2"
              />
              {priority}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status*
        </label>
        <div className="flex space-x-4">
          {['Open', 'Pending', 'Solve'].map((status) => (
            <label key={status} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={status}
                checked={formData.status === status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "Open" | "Pending" | "Solve" })}
                className="mr-2"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
} 