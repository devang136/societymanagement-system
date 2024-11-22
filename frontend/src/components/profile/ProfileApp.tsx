import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { User } from '@/types/user';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  unitNumber: 'A-123',
  role: 'Resident',
  status: 'Active',
  residentType: 'Owner',
  moveInDate: new Date('2023-01-01'),
  emergencyContact: {
    name: 'Jane Doe',
    phone: '(555) 987-6543',
    relationship: 'Spouse',
  },
};

const ProfileApp: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
    // TODO: Implement API call to save user data
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing ? (
        <ProfileEdit user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileView user={user} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProfileApp;
