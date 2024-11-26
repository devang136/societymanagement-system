import React from 'react';
import { LayoutDashboard, Users, FileSpreadsheet, MessagesSquare, Wallet, Shield, LogOut } from 'lucide-react';
import NavLink from './NavLink';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold text-orange-500">DashStack</span>
      </div>
      
      <nav className="space-y-1">
        <NavLink icon={<LayoutDashboard size={20} />} label="Dashboard" href="#" />
        <NavLink icon={<FileSpreadsheet size={20} />} label="Personal Detail" href="#" />
        <NavLink icon={<Shield size={20} />} label="Service and Complaint" href="#" />
        <NavLink icon={<Users size={20} />} label="Events Participation" href="#" active />
        <NavLink icon={<MessagesSquare size={20} />} label="Community" href="#" />
        <NavLink icon={<Wallet size={20} />} label="Payment Portal" href="#" />
        <NavLink icon={<Shield size={20} />} label="Security Protocols" href="#" />
      </nav>
      
      <div className="absolute bottom-4">
        <NavLink icon={<LogOut size={20} />} label="Logout" href="#" className="text-red-500" />
      </div>
    </div>
  );
};

export default Sidebar;