import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText,
  DollarSign,
  LogOut,
  UserCheck,
  UserCog,
  Bell,
  ChevronDown,
  ChevronRight,
  UserCircle,
  Wrench,
  Calendar,
  Users2,
  Shield
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon?: any; // or LucideIcon if you want to be more specific
  path?: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: any; // Made icon optional with '?'
}

interface SidebarProps {
  onLogout: () => void;
  userRole: 'admin' | 'user' | 'security' | null;
}

export function Sidebar({ onLogout, userRole }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
   
    
    { id: 'residents', label: 'Resident Management', icon: Users, path: '/residents' },
    { id: 'financial', label: 'Financial Management', icon: DollarSign, subItems: [
      { id: 'income', label: 'Income', path: '/financial/income', icon: DollarSign },
      { id: 'expense', label: 'Expense', path: '/financial/expense', icon: DollarSign },
      { id: 'note', label: 'Note', path: '/financial/note', icon: FileText },
    ]},
    { id: 'facility', label: 'Facility Management', icon: Building2, path: '/facility' },
    { id: 'complaints', label: 'Complaint Tracking', icon: FileText, subItems: [
      { id: 'create-complaint', label: 'Create Complaint', path: '/complaints/create' },
      { id: 'request-tracking', label: 'Request Tracking', path: '/complaints/requests' },
    ]},
    { 
      id: 'security',
      icon: UserCog, 
      label: 'Security Management',
      subItems: [
        { id: 'visitors', label: 'Visitor Logs', path: '/security/visitors' },
        { id: 'protocols', label: 'Security Protocols', path: '/security/protocol' },
       
      ]
    },
    { id: 'security-guard', label: 'Security Guard', icon: Shield, path: '/security-guard' },
    { id: 'announcement', label: 'Announcement', icon: Bell, path: '/announcement' },
  ];

  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'personal', label: 'Personal Details', icon: UserCircle, path: '/personal' },
    { id: 'services', label: 'Services & Complaints', icon: Wrench, path: '/services' },
    { id: 'events', label: 'Event Participation', icon: Calendar, path: '/events' },
    { 
      id: 'community',
      label: 'Community',
      icon: Users2,
      subItems: [
        { id: 'access-forum', label: 'Access Forum', path: '/community/forum' },
        { id: 'polls', label: 'Polls', path: '/community/polls' },
        { id: 'discussions', label: 'Community Discussions', path: '/community/discussions' }
      ]
    },
    { 
      id: 'payments', 
      label: 'Payment Portal', 
      icon: DollarSign, 
      subItems: [
        { id: 'maintenance-invoices', label: 'Maintenance Invoices', path: '/payments/maintenance', icon: FileText },
        { id: 'other-invoices', label: 'Other Income Invoices', path: '/payments/other', icon: FileText }
      ]
    },
    { id: 'security', label: 'Security Protocol', icon: Shield, path: '/security-protocol' },
  ];

  const securityMenuItems = [
    
    { 
      id: 'security',
      icon: Shield, 
      label: 'Security',
      subItems: [
        { id: 'visitor-tracking', label: 'Visitor Tracking', path: '/security/visitors', icon: Users },
        { id: 'emergency', label: 'Emergency Management', path: '/security/emergency', icon: Bell }
      ]
    }
  ];

  const menuItems = 
    userRole === 'admin' 
      ? adminMenuItems 
      : userRole === 'security'
        ? securityMenuItems
        : userMenuItems;

  const handleItemClick = (item: any) => {
    if (item.path) {
      navigate(item.path);
      setExpandedItem(null);
    } else if (item.subItems) {
      setExpandedItem(expandedItem === item.id ? null : item.id);
      if (expandedItem !== item.id) {
        navigate(item.subItems[0].path);
      }
    }
  };

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-orange-500">DashStack</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-6 py-3 text-sm ${
                  (item.path && currentPath.startsWith(item.path)) || 
                  (item.subItems?.some(sub => currentPath.startsWith(sub.path)))
                    ? 'text-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
                {item.subItems && (
                  expandedItem === item.id ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {item.subItems && expandedItem === item.id && (
                <ul className="ml-12 space-y-2 mt-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id}>
                      <button
                        onClick={() => navigate(subItem.path)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                          currentPath === subItem.path
                            ? 'text-orange-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {subItem.icon ? <subItem.icon className="w-4 h-4 mr-2" /> : null}
                        {subItem.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={onLogout}
              className="w-full flex items-center px-6 py-3 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}