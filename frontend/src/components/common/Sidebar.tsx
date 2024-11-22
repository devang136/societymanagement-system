import React from 'react';

interface SidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (menuItem: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem, onMenuItemClick }) => {
  const menuItems = [
    'Dashboard',
    'Profile',
    'Complaints',
    'Announcements',
    'Expenses',
    'Settings'
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="h-full px-3 py-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">FMS</h2>
          <p className="text-sm text-gray-500">Facility Management System</p>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => onMenuItemClick(item)}
                className={`w-full flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                  activeMenuItem === item ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
