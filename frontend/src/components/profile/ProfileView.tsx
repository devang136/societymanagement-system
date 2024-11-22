import React from 'react';
import { User } from '@/types/user';

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <img
            src={user.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Unit Number</label>
              <p className="text-gray-900">{user.unitNumber}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Move-in Date</label>
              <p className="text-gray-900">
                {new Date(user.moveInDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Status</label>
              <span
                className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Resident Type</label>
              <p className="text-gray-900">{user.residentType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name</label>
            <p className="text-gray-900">{user.emergencyContact?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900">{user.emergencyContact?.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Relationship</label>
            <p className="text-gray-900">{user.emergencyContact?.relationship}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
