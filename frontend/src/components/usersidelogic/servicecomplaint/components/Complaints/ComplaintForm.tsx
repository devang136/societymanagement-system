import React, { useState } from 'react';
import { Complaint, Priority } from '../../types';

interface ComplaintFormProps {
  onSubmit: (complaint: Partial<Complaint>) => void;
  onCancel: () => void;
}

export function ComplaintForm({ onSubmit, onCancel }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium' as Priority
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
            Title*
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Noise">Noise</option>
            <option value="Other">Other</option>
          </select>
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