import React from 'react';
import Sidebar from '../securitysidelogic/components/Sidebar';
import Header from '../securitysidelogic/components/Header';
import AlertForm from '../securitysidelogic/components/AlertForm';

const EmergencyManagement = () => {
  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <AlertForm />
        </main>
      </div>
    </div>
  );
};

export default EmergencyManagement; 