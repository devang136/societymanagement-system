import { LayoutGrid, Users, DollarSign, Building2, MessageSquare, Shield, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Resident Management', path: '/residents' },
  { icon: DollarSign, label: 'Financial Management', path: '/finance' },
  { icon: Building2, label: 'Facility Management', path: '/facility' },
  { icon: MessageSquare, label: 'Complaint Tracking', path: '/complaints', active: true },
  { icon: Shield, label: 'Security Management', path: '/security' },
  { icon: Shield, label: 'Security Guard', path: '/guard' },
  { icon: Bell, label: 'Announcement', path: '/announcements' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#FF4D12]">DashStack</h1>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
              item.active ? 'bg-orange-50 text-[#FF4D12]' : ''
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-[#FF4D12]' : ''}`} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6">
        <button className="flex items-center text-gray-700 hover:text-[#FF4D12]">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}