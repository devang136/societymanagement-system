import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { getProfile, updateProfile } from '../../services/api';
import ProfileEdit from './ProfileEdit';

const EditProfile: FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleUpdateProfile = async (updatedProfile: Partial<User>) => {
    if (!profile) return;

    setIsLoading(true);
    try {
      await updateProfile(profile.id, updatedProfile);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
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
      <ProfileEdit
        profile={profile}
        onSubmit={handleUpdateProfile}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditProfile;
