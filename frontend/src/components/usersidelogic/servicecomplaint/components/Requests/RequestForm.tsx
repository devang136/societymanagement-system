import React, { useState } from 'react';
import { Request, Status } from '../../types';

interface RequestFormProps {
  onSubmit: (request: Omit<Request, 'id'>) => void;
  onCancel: () => void;
}

export function RequestForm({ onSubmit, onCancel }: RequestFormProps) {
  const [formData, setFormData] = useState({
    requestDate: new Date().toISOString().split('T')[0],
    status: 'Open' as Status,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Request</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Request Date*
          </label>
          <input
            type="date"
            required
            value={formData.requestDate}
            onChange={(e) => setFormData(prev => ({ ...prev, requestDate: e.target.value }))}
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