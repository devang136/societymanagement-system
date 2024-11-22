import React, { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import ProfileEdit from '@/components/profile/ProfileEdit';
import ProfileView from '@/components/profile/ProfileView';
import { User } from '@/types/user';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const mockUser: User = {
    id: '1',
    name: 'Arlene McCoy',
    email: 'you@example.com',
    phone: '+91 99130 44537',
    unitNumber: 'A-123',
    role: 'Resident',
    status: 'Active',
    residentType: 'Owner',
    moveInDate: new Date('2023-01-01'),
    emergencyContact: {
      name: 'Emergency Contact',
      phone: '+91 98765 43210',
      relationship: 'Family'
    }
  };

  const handleUpdateProfile = (updatedUser: User) => {
    // TODO: Implement API call to update user data
    setIsEditing(false);
    setActiveMenuItem('Dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeMenuItem={activeMenuItem} onMenuItemClick={setActiveMenuItem} />
      {isEditing ? (
        <ProfileEdit 
          user={mockUser}
          onSave={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView 
          user={mockUser}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}

export default App;