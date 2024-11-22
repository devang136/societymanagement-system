import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Building2, 
  FileText, 
  Shield, 
  UserRound, 
  Bell, 
  LogOut 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Resident Management', path: '/residents' },
  { icon: DollarSign, label: 'Financial Management', path: '/finance' },
  { icon: Building2, label: 'Facility Management', path: '/facility' },
  { icon: FileText, label: 'Complaint Tracking', path: '/complaints' },
  { 
    icon: Shield, 
    label: 'Security Management', 
    path: '/security',
    submenu: [
      { label: 'Visitor Logs', path: '/security/visitors' },
      { label: 'Security Protocols', path: '/security/protocols' },
      { label: 'Security Guard', path: '/security/guard' },
    ]
  },
  { icon: Bell, label: 'Announcement', path: '/announcements' },
];

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = React.useState('Security Management');
  const [expandedSubmenu, setExpandedSubmenu] = React.useState('Security Management');

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">
          <span className="text-[#FF5733]">Dash</span>
          <span>Stack</span>
        </h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              className={`w-full flex items-center px-4 py-2.5 text-sm ${
                activeMenu === item.label 
                  ? 'bg-orange-50 text-[#FF5733] font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                setActiveMenu(item.label);
                if (item.submenu) {
                  setExpandedSubmenu(expandedSubmenu === item.label ? '' : item.label);
                }
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
            
            {item.submenu && expandedSubmenu === item.label && (
              <div className="ml-12 mt-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.label}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-[#FF5733]"
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}