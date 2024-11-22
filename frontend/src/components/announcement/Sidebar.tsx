import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Building2, 
  ClipboardList, 
  Shield, 
  ShieldAlert,
  Bell,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard' },
  { icon: Users, text: 'Resident Management' },
  { icon: DollarSign, text: 'Financial Management' },
  { icon: Building2, text: 'Facility Management' },
  { icon: ClipboardList, text: 'Complaint Tracking' },
  { icon: Shield, text: 'Security Management' },
  { icon: ShieldAlert, text: 'Security Board' },
  { icon: Bell, text: 'Announcement', active: true },
];

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-orange-500">
          Dash<span className="text-gray-900">Stack</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  item.active
                    ? 'bg-orange-500 text-white'
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

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 w-full p-3">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}