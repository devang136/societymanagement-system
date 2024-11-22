import React from 'react';
import { Header as CommonHeader } from '../common/Header';

export default function Header() {
  return (
    <CommonHeader
      title="Facility Management"
      showSearch
      showNotifications
      showProfile
      userName="Manil Roy"
      onSearchChange={(value) => console.log('Search:', value)}
    />
  );
}