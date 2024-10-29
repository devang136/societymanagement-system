import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateSocietyModalProps {
  onClose: () => void;
}

interface SocietyFormData {
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export default function CreateSocietyModal({
  onClose,
}: CreateSocietyModalProps) {
  const [formData, setFormData] = useState<SocietyFormData>({
    name: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Society created:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Create New Society
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Society Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Society Address*
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country*
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State*
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zip Code*
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF5733] to-[#ff4520] hover:from-[#ff4520] hover:to-[#FF5733] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
