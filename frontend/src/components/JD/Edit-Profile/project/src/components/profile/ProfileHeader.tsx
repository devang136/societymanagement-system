import React from 'react';
import { Button } from '../ui/Button';

interface ProfileHeaderProps {
  title: string;
  onEdit?: () => void;
  isEditing?: boolean;
}

export function ProfileHeader({ title, onEdit, isEditing }: ProfileHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-medium">{title}</h1>
      {!isEditing && onEdit && (
        <Button 
          onClick={onEdit}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
}