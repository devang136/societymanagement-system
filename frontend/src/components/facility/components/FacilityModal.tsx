import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Facility, FacilityFormData } from '../types/facility';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FacilityFormData) => void;
  facility?: Facility;
}

export default function FacilityModal({ isOpen, onClose, onSubmit, facility }: FacilityModalProps) {
  const [formData, setFormData] = useState<FacilityFormData>({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (facility) {
      setFormData({
        title: facility.title,
        date: facility.date,
        description: facility.description
      });
    } else {
      setFormData({ title: '', date: '', description: '' });
    }
  }, [facility, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {facility ? 'Edit Facility' : 'Create Facility'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facility Name*
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter facility name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              rows={3}
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule Service Date*
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              {facility ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}