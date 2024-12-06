import React, { useEffect, useState } from 'react';
import { UserDetails, userService } from '../../../../../services/userService';
import { toast } from 'react-hot-toast';

export default function PersonalInfo() {
  const [activeTab, setActiveTab] = useState<'owner' | 'tenant'>('owner');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await userService.getPersonalDetails();
      setUserDetails(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      toast.error('Failed to load personal information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex space-x-2">
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'owner'
              ? 'bg-white text-gray-900'
              : 'bg-orange-500 text-white'
          }`}
          onClick={() => setActiveTab('owner')}
        >
          Owner
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'tenant'
              ? 'bg-white text-gray-900'
              : 'bg-orange-500 text-white'
          }`}
          onClick={() => setActiveTab('tenant')}
        >
          Tenant
        </button>
      </div>

      {/* Owner Information */}
      {activeTab === 'owner' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Owner Name</div>
              <div className="font-medium">{userDetails?.firstName} {userDetails?.lastName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Owner Phone</div>
              <div className="font-medium">{userDetails?.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Owner Address</div>
              <div className="font-medium">{`${userDetails?.city}, ${userDetails?.state}`}</div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden mr-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Personal Details Grid */}
          <div className="flex-1 grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium">{userDetails?.firstName} {userDetails?.lastName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone Number</div>
              <div className="font-medium">{userDetails?.phone}</div>
            </div>
            <div>
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!userDetails) {
    return <div>No user details found</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your personal details and information.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userDetails.email}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userDetails.phone}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${userDetails.city}, ${userDetails.state}, ${userDetails.country}`}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Society details</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${userDetails.society} - Wing ${userDetails.wing}, Unit ${userDetails.unit}`}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}