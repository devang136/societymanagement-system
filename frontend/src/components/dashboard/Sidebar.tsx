import React from 'react';
import { FiGrid, FiUsers, FiDollarSign, FiHome, FiShield, FiUserCheck, FiBell } from 'react-icons/fi';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

function SidebarItem({ icon, text, active }: SidebarItemProps) {
  return (
    <li>
      <button
        className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
          active ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {icon}
        <span>{text}</span>
      </button>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-500 mb-8">DashStack</h1>
        <nav>
          <ul className="space-y-2">
            <SidebarItem icon={<FiGrid className="w-5 h-5" />} text="Dashboard" active />
            <SidebarItem icon={<FiUsers className="w-5 h-5" />} text="Resident Management" />
            <SidebarItem icon={<FiDollarSign className="w-5 h-5" />} text="Financial Management" />
            <SidebarItem icon={<FiHome className="w-5 h-5" />} text="Facility Management" />
            <SidebarItem icon={<FiBell className="w-5 h-5" />} text="Complaint Tracking" />
            <SidebarItem icon={<FiShield className="w-5 h-5" />} text="Security Management" />
            <SidebarItem icon={<FiUserCheck className="w-5 h-5" />} text="Security Guard" />
            <SidebarItem icon={<FiBell className="w-5 h-5" />} text="Announcement" />
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-4 left-4">
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}