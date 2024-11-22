import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { getProfile } from '../../services/api';
import ProfileView from './ProfileView';

const Profile: FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileView profile={profile} onEdit={handleEditProfile} />
    </div>
  );
};

export default Profile;
