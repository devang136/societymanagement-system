import { Home, User, MessageSquare, Calendar, Users, FileText, LogOut } from 'lucide-react';
import { Link } from './ui/Link';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const isPaymentPortalActive = location.pathname === '/payment-portal';

  return (
    <div className="w-64 bg-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-orange-500">DashStack</h1>
      </div>
      
      <nav className="flex-1">
        <Link href="#" icon={<Home size={20} />}>Dashboard</Link>
        <Link href="#" icon={<User size={20} />}>Personal Detail</Link>
        <Link href="#" icon={<MessageSquare size={20} />}>Service And Complaint</Link>
        <Link href="#" icon={<Calendar size={20} />}>Events Participation</Link>
        <Link href="#" icon={<Users size={20} />}>Community</Link>
        
        <div className="mt-4 mb-4">
          <RouterLink 
            to="/payment-portal"
            className={`bg-orange-500 text-white rounded-lg p-3 cursor-pointer ${
              isPaymentPortalActive ? 'bg-orange-600' : ''
            }`}
          >
            <FileText size={20} className="inline-block mr-2" />
            Payment Portal
          </RouterLink>
        </div>
        
        <Link href="#" active>Maintenance Invoices</Link>
        <Link href="#">Other Income Invoice</Link>
        <Link href="#">Security Protocols</Link>
      </nav>
      
      <button className="flex items-center text-red-500 mt-auto">
        <LogOut size={20} className="mr-2" />
        Logout
      </button>
    </div>
  );
}