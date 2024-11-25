import { X, Upload } from 'lucide-react';
import { useState } from 'react';
import { SecurityGuard } from './types';
import React from 'react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SecurityGuard, 'id'>) => void;
  initialData?: SecurityGuard;
  title: string;
}

export function SecurityModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  title 
}: SecurityModalProps) {
  const [formData, setFormData] = useState<Omit<SecurityGuard, 'id'>>(initialData || {
    name: '',
    phone: '',
    shift: 'Day' as const,
    date: '',
    time: '',
    gender: 'Male' as const,
    avatar: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[480px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={formData.avatar || 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg"
                >
                  <Upload size={16} className="text-blue-600" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender*
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shift*
                </label>
                <select
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value as "Day" | "Night" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shift Date*
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shift Time*
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Aadhar Card*
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Upload a file or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, PDF up to 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}