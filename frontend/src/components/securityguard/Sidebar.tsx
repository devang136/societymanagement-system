import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Building2, 
  FileText, 
  Shield, 
  Bell, 
  LogOut 
} from 'lucide-react';
import { Link } from './Link';

export function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">Dash</span>
          <span>Stack</span>
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" icon={LayoutDashboard}>Dashboard</Link>
        <Link href="/resident" icon={Users}>Resident Management</Link>
        <Link href="/financial" icon={DollarSign}>Financial Management</Link>
        <Link href="/facility" icon={Building2}>Facility Management</Link>
        <Link href="/complaints" icon={FileText}>Complaint Tracking</Link>
        <Link href="/security-management" icon={Shield}>Security Management</Link>
        <Link href="/security-guard" icon={Shield} active>Security Guard</Link>
        <Link href="/announcements" icon={Bell}>Announcement</Link>
      </nav>

      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mt-auto">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}