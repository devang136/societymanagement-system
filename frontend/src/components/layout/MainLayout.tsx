import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center mb-6 cursor-pointer" onClick={handleProfileClick}>
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">{user?.name || 'Admin'}</div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="flex items-center p-2 hover:bg-gray-100 rounded">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/residents" className="flex items-center p-2 hover:bg-gray-100 rounded">
                  Resident Management
                </a>
              </li>
              <li className="space-y-1">
                <div className="p-2 font-medium">Financial Management</div>
                <ul className="pl-4 space-y-1">
                  <li>
                    <a href="/financial/income" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Income
                    </a>
                  </li>
                  <li>
                    <a href="/financial/expense" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Expense
                    </a>
                  </li>
                  <li>
                    <a href="/financial/notes" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Notes
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/facility" className="flex items-center p-2 hover:bg-gray-100 rounded">
                  Facility Management
                </a>
              </li>
              <li className="space-y-1">
                <div className="p-2 font-medium">Complaints & Requests</div>
                <ul className="pl-4 space-y-1">
                  <li>
                    <a href="/complaints/create" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Create Complaint
                    </a>
                  </li>
                  <li>
                    <a href="/complaints/tracking" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Request Tracking
                    </a>
                  </li>
                </ul>
              </li>
              <li className="space-y-1">
                <div className="p-2 font-medium">Security Management</div>
                <ul className="pl-4 space-y-1">
                  <li>
                    <a href="/security/visitors" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Visitor Logs
                    </a>
                  </li>
                  <li>
                    <a href="/security/protocols" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Security Protocols
                    </a>
                  </li>
                  <li>
                    <a href="/security/guard" className="flex items-center p-2 hover:bg-gray-100 rounded">
                      Security Guard
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/announcements" className="flex items-center p-2 hover:bg-gray-100 rounded">
                  Announcements
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
