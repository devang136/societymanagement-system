import React from 'react';
import { Building2, Home, DollarSign, Wrench, MessageSquare, Shield, Bell, LogOut, Users } from 'lucide-react';
import { Link } from './Link';

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">Dash</span>
          <span>Stack</span>
        </h1>
      </div>
      
      <nav className="flex-1">
        <Link href="#" icon={<Home size={20} />} text="Dashboard" />
        <Link href="#" icon={<Users size={20} />} text="Resident Management" active />
        <Link href="#" icon={<DollarSign size={20} />} text="Financial Management" />
        <Link href="#" icon={<Building2 size={20} />} text="Facility Management" />
        <Link href="#" icon={<MessageSquare size={20} />} text="Complaint Tracking" />
        <Link href="#" icon={<Shield size={20} />} text="Security Management" />
        <Link href="#" icon={<Shield size={20} />} text="Security Guard" />
        <Link href="#" icon={<Bell size={20} />} text="Announcement" />
      </nav>
      
      <div className="p-4 border-t">
        <Link href="#" icon={<LogOut size={20} />} text="Logout" className="text-red-500" />
      </div>
    </div>
  );
}