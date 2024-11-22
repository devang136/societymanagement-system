import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Wallet, 
  Building, 
  FileSpreadsheet, 
  Shield, 
  ShieldAlert,
  Bell,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', active: false },
  { icon: Building2, text: 'Resident Management', active: false },
  { icon: Wallet, text: 'Financial Management', active: false },
  { icon: Building, text: 'Facility Management', active: true },
  { icon: FileSpreadsheet, text: 'Complaint Tracking', active: false },
  { icon: Shield, text: 'Security Management', active: false },
  { icon: ShieldAlert, text: 'Security Board', active: false },
  { icon: Bell, text: 'Announcement', active: false },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-500">DashStack</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  item.active 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center space-x-3 text-gray-700 p-3 w-full hover:bg-gray-100 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}