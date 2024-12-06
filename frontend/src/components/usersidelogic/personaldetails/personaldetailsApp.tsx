import React from 'react';
import PersonalInfo from './components/profile/PersonalInfo';
import { Toaster } from 'react-hot-toast';

export function PersonalDetailsApp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <PersonalInfo />
        </div>
      </main>
    </div>
  );
}