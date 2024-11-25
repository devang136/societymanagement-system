import React, { useState } from 'react';

interface ProfileEditProps {
  onCancel: () => void;
  onUpdate: () => void;
  profileData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    society: string;
    country: string;
    state: string;
    city: string;
  };
}

export default function ProfileEdit({ onCancel, onUpdate, profileData }: ProfileEditProps) {
  const [formData, setFormData] = useState(profileData);
  const profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate();
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-xl font-medium mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload here
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // You can set the image preview here if needed
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17V20C3 20.5523 3.44772 21 4 21H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 7V4C21 3.44772 20.5523 3 20 3H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 7V4C3 3.44772 3.44772 3 4 3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 17V20C21 20.5523 20.5523 21 20 21H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </label>
          </div>
          <h3 className="mt-4 text-lg font-medium">{formData.firstName} {formData.lastName}</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Society<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="society"
              value={formData.society}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FF5733] focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country<span className="text-red-500">*</span>
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
              State<span className="text-red-500">*</span>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City<span className="text-red-500">*</span>
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
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#FF4D15] text-white rounded-lg text-sm hover:bg-[#ff3c00] transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}