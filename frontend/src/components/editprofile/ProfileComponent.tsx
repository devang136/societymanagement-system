// ProfileComponent.tsx
import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Arlene",
    lastName: "McCoy",
    phoneNumber: "+91 99130 44537",
    email: "you@example.com",
    society: "Shantigram residency",
    country: "McCoy",
    state: "Gujarat",
    city: "Baroda"
  });

  const handleUpdateProfile = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileEdit 
          onCancel={() => setIsEditing(false)} 
          onUpdate={handleUpdateProfile} 
          profileData={profileData}
        />
      ) : (
        <ProfileView 
          profileData={profileData} 
          onEditClick={() => setIsEditing(true)} 
        />
      )}
    </div>
  );
};

export default ProfileComponent;