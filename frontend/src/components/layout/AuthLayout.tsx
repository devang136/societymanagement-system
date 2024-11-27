import React from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { VisitorTrackingRoute } from '../securitysidelogic/visitortracking/VisitorTrackingRoute';
import { SecurityProtocolRoute } from '../usersidelogic/securityprotocol/SecurityProtocolRoute';
import { EventParticipationRoute } from '../usersidelogic/eventparticipation/EventParticipationRoute';
import { ServiceComplaintRoute } from '../usersidelogic/servicecomplaint/ServiceComplaintRoute';
import { OtherIncomeInvoicesApp } from '../usersidelogic/otherincomeinvoices/otherincomeinvoicesApp';
import { PaymentPortalApp } from '../usersidelogic/paymentportal/paymentportalApp';
import { PersonalDetailsApp } from '../usersidelogic/personaldetails/personaldetailsApp';
import  PollingDashboard  from '../usersidelogic/userpolls/page';
import Page from '../usersidelogic/community-chat/app/page';
import ChatPage from '../usersidelogic/access-forum/pages/ChatPage';

interface AuthLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userRole: 'admin' | 'user' | 'security' | null;
}

export function AuthLayout({ children, onLogout, userRole }: AuthLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={onLogout} userRole={userRole} />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/security/visitor-tracking" element={<VisitorTrackingRoute />} />
          <Route path="/security-protocol" element={<SecurityProtocolRoute />} />
          <Route path="/events" element={<EventParticipationRoute />} />
          <Route path="/services" element={<ServiceComplaintRoute />} />
          <Route path="/payment-portal" element={<PaymentPortalApp />} />
          <Route path="/payments/other" element={<OtherIncomeInvoicesApp />} />
          <Route path="/personal" element={<PersonalDetailsApp />} />
          <Route path="/community/polls" element={<PollingDashboard />} />
          <Route path="/community/discussions" element={<Page />} />
          <Route path="/community/forum" element={<ChatPage />} />
          <Route path="/*" element={children} />
        </Routes>
      </div>
    </div>
  );
} 