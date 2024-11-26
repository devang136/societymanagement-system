import React, { useState } from 'react';
import { Complaint, Priority, Status } from '../../types';

interface ComplaintFormProps {
  onSubmit: (complaint: Omit<Complaint, 'id'>) => void;
  onCancel: () => void;
}

export function ComplaintForm({ onSubmit, onCancel }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    complainerName: '',
    complaintName: '',
    description: '',
    wing: '',
    unit: '',
    priority: 'Medium' as Priority,
    status: 'Open' as Status,
    requestDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Complaint</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complainer Name*
          </label>
          <input
            type="text"
            required
            value={formData.complainerName}
            onChange={(e) => setFormData(prev => ({ ...prev, complainerName: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complaint Name*
          </label>
          <input
            type="text"
            required
            value={formData.complaintName}
            onChange={(e) => setFormData(prev => ({ ...prev, complaintName: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wing*
            </label>
            <input
              type="text"
              required
              value={formData.wing}
              onChange={(e) => setFormData(prev => ({ ...prev, wing: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit*
            </label>
            <input
              type="text"
              required
              value={formData.unit}
              onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Priority*
          </label>
          <div className="flex space-x-4">
            {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
              <label key={p} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={formData.priority === p}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status*
          </label>
          <div className="flex space-x-4">
            {(['Open', 'Pending', 'Solve'] as Status[]).map((s) => (
              <label key={s} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={formData.status === s}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Status }))}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}