import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        userName={user?.name}
        userRole={user?.role}
        onLogout={handleLogout}
        showLogo={true}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Facility Management System"
          showSearch={true}
          showNotifications={true}
          showProfile={true}
          showSettings={true}
          userName={user?.name}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
