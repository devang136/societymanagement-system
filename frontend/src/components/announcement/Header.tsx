import React from 'react';
import { Header as CommonHeader } from '../common/Header';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <CommonHeader
      title="Announcement"
      showNotifications
      showProfile
      userName="Moni Roy"
      actions={
        <button
          onClick={onCreateClick}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Create Announcement
        </button>
      }
    />
  );
}