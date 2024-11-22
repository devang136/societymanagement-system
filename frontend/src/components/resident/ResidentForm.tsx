import React from 'react';
import { X } from 'lucide-react';

interface ResidentFormProps {
  resident?: {
    id?: string;
    name?: string;
    unit?: string;
    wing?: string;
    type?: 'owner' | 'tenant';
    status?: 'active' | 'inactive';
    contactNumber?: string;
    email?: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
  residentType: 'owner' | 'tenant';
  setResidentType: (type: 'owner' | 'tenant') => void;
}

const ResidentForm: React.FC<ResidentFormProps> = ({
  resident,
  onClose,
  onSubmit,
  residentType,
  setResidentType
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      contactNumber: formData.get('contactNumber'),
      unit: formData.get('unit'),
      wing: formData.get('wing'),
      type: residentType,
      status: 'active'
    };

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">
            {resident ? 'Edit Resident' : 'Add New Resident'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setResidentType('owner')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  residentType === 'owner'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => setResidentType('tenant')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  residentType === 'tenant'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Tenant
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={resident?.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={resident?.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                defaultValue={resident?.contactNumber}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Number
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={resident?.unit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wing
              </label>
              <select
                name="wing"
                defaultValue={resident?.wing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Wing</option>
                <option value="A">Wing A</option>
                <option value="B">Wing B</option>
                <option value="C">Wing C</option>
                <option value="D">Wing D</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {resident ? 'Save Changes' : 'Add Resident'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResidentForm;
