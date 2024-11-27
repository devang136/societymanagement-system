import React from 'react';
import { Home, Users, Car, Bell, FileText, Shield, LogOut } from 'lucide-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen p-4 border-r">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold text-orange-500">DashStack</span>
      </div>
      
      <nav className="space-y-2">
        <NavLink icon={<Home size={20} />} label="Dashboard" isActive />
        <NavLink icon={<Users size={20} />} label="Personal Detail" />
        <NavLink icon={<FileText size={20} />} label="Service And Complaint" />
        <NavLink icon={<Bell size={20} />} label="Events Participation" />
        <NavLink icon={<Users size={20} />} label="Community" />
        <NavLink icon={<Shield size={20} />} label="Payment Portal" />
        <NavLink icon={<Shield size={20} />} label="Security Protocols" />
        <NavLink icon={<LogOut size={20} />} label="Logout" className="mt-auto text-red-500" />
      </nav>
    </div>
  );
}