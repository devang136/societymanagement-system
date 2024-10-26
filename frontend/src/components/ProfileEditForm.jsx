import React, { useState } from 'react';

export default function ProfileEditForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Arlene',
    lastName: 'McCoy',
    phoneNumber: '+91 9930 44937',
    emailAddress: 'arlenemccoy25@gmail.com',
    selectSociety: 'Shantinagar residency',
    country: 'McCoy',
    state: 'Gujarat',
    city: 'Baroda'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{`${profile.firstName} ${profile.lastName}`}</h2>
                {isEditing && (
                  <button type="button" className="text-blue-600 text-sm mt-2">
                    Change Picture
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}*
                  </label>
                  <input
                    type={key === 'emailAddress' ? 'email' : 'text'}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}                                                                                                                                                                                                       