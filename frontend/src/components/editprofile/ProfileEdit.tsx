import React from 'react';

interface ProfileEditProps {
  onCancel: () => void;
  onUpdate: () => void;
}

export default function ProfileEdit({ onCancel, onUpdate }: ProfileEditProps) {
  const profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="flex-1 bg-[#F5F7FF] min-h-screen">
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-500">/</span>
          <span className="text-blue-600">Edit Profile</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div>
            <div className="text-sm font-medium">Moni Roy</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Edit Profile</h2>
        </div>

        <div className="bg-white rounded-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium">Arlene McCoy</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">First Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="Arlene"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="McCoy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="+91 99130 44537"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email Address<span className="text-red-500">*</span></label>
              <input
                type="email"
                defaultValue="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Select Society<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="Shantigram residency"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Country<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="McCoy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">State<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="Gujarat"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">City<span className="text-red-500">*</span></label>
              <input
                type="text"
                defaultValue="Baroda"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#FF4D15] focus:border-[#FF4D15]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onUpdate}
              className="px-6 py-2 bg-[#FF4D15] text-white rounded-lg text-sm hover:bg-[#ff3c00] transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}