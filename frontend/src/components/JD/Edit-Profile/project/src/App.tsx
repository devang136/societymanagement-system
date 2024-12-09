import { useState } from 'react';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { ProfileView } from './components/profile/ProfileView';
import { ProfileForm } from './components/profile/ProfileForm';
import type { Profile } from './types/profile';

const defaultProfile: Profile = {
  firstName: 'Arlene',
  lastName: 'McCoy',
  phoneNumber: '+91 99130 44537',
  emailAddress: 'ArleneMcCoy25@gmail.com',
  society: 'Shantigram residency',
  country: 'McCoy',
  state: 'Gujarat',
  city: 'Baroda',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function App() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader
          title="Profile"
          onEdit={() => setIsEditing(true)}
          isEditing={isEditing}
        />
        
        {isEditing ? (
          <ProfileForm
            profile={profile}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView profile={profile} />
        )}
      </div>
    </div>
  );
}

export default App;