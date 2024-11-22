import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Building2, 
  AlertCircle, 
  Shield, 
  UserRound,
  Bell,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeMenuItem: string;
}

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard' },
  { icon: Users, text: 'Resident Management' },
  { icon: Wallet, text: 'Financial Management' },
  { icon: Building2, text: 'Facility Management' },
  { icon: AlertCircle, text: 'Complaint Tracking' },
  { icon: Shield, text: 'Security Management' },
  { icon: UserRound, text: 'Security Guard' },
  { icon: Bell, text: 'Announcement' },
];

export default function Sidebar({ activeMenuItem }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#ff4d15]">DashStack</h1>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#ff4d15] cursor-pointer transition-colors ${
              activeMenuItem === item.text ? 'bg-orange-50 text-[#ff4d15]' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </nav>

      <div className="p-6">
        <div className="flex items-center text-red-500 cursor-pointer hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
}