import React from 'react';
import ProfileEdit from './ProfileEdit';

interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  society: string;
  country: string;
  state: string;
  city: string;
}

interface ProfileViewProps {
  profileData: ProfileData;
  onEditClick: () => void;
}

const profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const ProfileView = ({ profileData, onEditClick }: ProfileViewProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <button
          onClick={onEditClick}
          className="px-4 py-2 bg-[#FF4D15] text-white rounded-lg text-sm hover:bg-[#ff3c00] transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.18821C20.0665 4.44558 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55441 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit Profile
        </button>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h3 className="mt-4 text-lg font-medium">{profileData.firstName} {profileData.lastName}</h3>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">First Name</p>
          <p className="font-medium">{profileData.firstName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Name</p>
          <p className="font-medium">{profileData.lastName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="font-medium">{profileData.phoneNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{profileData.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Society</p>
          <p className="font-medium">{profileData.society}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Country</p>
          <p className="font-medium">{profileData.country}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">State</p>
          <p className="font-medium">{profileData.state}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">City</p>
          <p className="font-medium">{profileData.city}</p>
        </div>
      </div>

      
    </div>
  );
};

export default ProfileView;