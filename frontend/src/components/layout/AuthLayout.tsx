import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../dashboard/Sidebar';
import { ComplaintTracking } from '../complaintracking/createcomplain/ComplaintTracking';
import { RequestTracking } from '../requesttracking/RequestTracking';
import VisitorApp from '../securitymanagement/vistor/visitorapp';
import ProtocolApp from '../securitymanagement/protocol/protocolapp';
import SecurityGuardApp from '../securityguard/securityguardapp';
import AnnouncementApp from '../announcement/announcementapp';
import PersonalDetails from '../personaldetails/PersonalDetails';
import ServicesComplaints from '../servicescomplaints/ServicesComplaints';
import EventParticipation from '../eventparticipation/EventParticipation';
import Community from '../community/Community';
import PaymentPortal from '../paymentportal/PaymentPortal';
import SecurityProtocol from '../securityprotocol/SecurityProtocol';
import EmergencyManagement from '../emergencymanagement/EmergencyManagement';

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
        {children}
      </div>
    </div>
  );
} 