import React from 'react';
import { Upload } from 'lucide-react';
import { MemberCountingForm } from './MemberCountingForm';
import { VehicleCountingForm } from './VehicleCountingForm';

interface ResidentFormProps {
  type: 'owner' | 'tenant';
  onSubmit: (data: any) => void;
  onCancel: () => void;
  onTypeChange: (type: 'owner' | 'tenant') => void;
  initialData?: any;
}

export function ResidentForm({ type, onSubmit, onCancel, onTypeChange, initialData }: ResidentFormProps) {
  const [formData, setFormData] = React.useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    age: '',
    gender: '',
    wing: '',
    unit: '',
    relation: '',
    status: 'occupied',
    rentAmount: '',
    depositAmount: '',
    leaseStartDate: '',
    leaseEndDate: '',
    members: [],
    vehicles: [],
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMembersChange = (members: any[]) => {
    setFormData({ ...formData, members });
  };

  const handleVehiclesChange = (vehicles: any[]) => {
    setFormData({ ...formData, vehicles });
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => onTypeChange('owner')}
          className={`px-4 py-2 rounded-md transition-colors ${
            type === 'owner' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Owner
        </button>
        <button
          onClick={() => onTypeChange('tenant')}
          className={`px-4 py-2 rounded-md transition-colors ${
            type === 'tenant' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Tenant
        </button>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age*</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wing*</label>
          <input
            type="text"
            name="wing"
            value={formData.wing}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit*</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Relation*</label>
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
          </select>
        </div>
      </div>

      {/* Tenant-specific fields */}
      {type === 'tenant' && (
        <div className="grid grid-cols-4 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount*</label>
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount*</label>
            <input
              type="number"
              name="depositAmount"
              value={formData.depositAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lease Start Date*</label>
            <input
              type="date"
              name="leaseStartDate"
              value={formData.leaseStartDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lease End Date*</label>
            <input
              type="date"
              name="leaseEndDate"
              value={formData.leaseEndDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
        </div>
      )}

      {/* Document Upload */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <Upload className="text-gray-400 mb-2" />
            <div className="text-sm text-gray-600">Upload Aadhar Card (Front Side)</div>
            <div className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</div>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <Upload className="text-gray-400 mb-2" />
            <div className="text-sm text-gray-600">Upload Aadhar Card (Back Side)</div>
            <div className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</div>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <Upload className="text-gray-400 mb-2" />
            <div className="text-sm text-gray-600">Address Proof</div>
            <div className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</div>
          </div>
        </div>

        {type === 'tenant' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <Upload className="text-gray-400 mb-2" />
              <div className="text-sm text-gray-600">Rent Agreement</div>
              <div className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</div>
            </div>
          </div>
        )}
      </div>

      {/* Member Counting */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Member Counting</h3>
        <MemberCountingForm
          members={formData.members}
          onChange={handleMembersChange}
        />
      </div>

      {/* Vehicle Counting */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Vehicle Counting</h3>
        <VehicleCountingForm
          vehicles={formData.vehicles}
          onChange={handleVehiclesChange}
        />
      </div>

      {/* Form Actions */}
      <div className="mt-8 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(formData)}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          {type === 'tenant' ? 'Add Tenant' : 'Add Owner'}
        </button>
      </div>
    </div>
  );
}