import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Dashboard } from './components/dashboard/Dashboard';
import ResidentManagement from './components/residentmanagement/ResidentManagement';
import { FinancialIncome } from './components/financialman/income/FinancialIncome';
import { FinancialExpense } from './components/financialman/expense/FinancialExpense';
import { FinancialNote } from './components/financialman/note/FinancialNote';
import FacilityManagement from './components/facility/components/FacilityManagement';
import LoginForm from './components/LoginForm';
import { AuthLayout } from './components/layout/AuthLayout';
import { ComplaintTracking } from './components/complaintracking/createcomplain/ComplaintTracking';
import { RequestTracking } from './components/requesttracking/RequestTracking';
import VisitorApp from './components/securitymanagement/vistor/visitorapp';
import SecurityGuardApp from './components/securityguard/securityguardapp';
import AnnouncementApp from './components/announcement/announcementapp';
import CommunityForum from './components/community/forum/CommunityForum';
import CommunityPolls from './components/community/polls/CommunityPolls';
import CommunityDiscussions from './components/community/discussions/CommunityDiscussions';
import { MaintenanceInvoices } from './components/financialman/payments/maintenance/MaintenanceInvoices';
import { OtherInvoices } from './components/financialman/payments/other/OtherInvoices';
import EmergencyApp from './components/emergency/EmergencyApp';
import SecurityProtocol from './components/securitymanagement/protocol/SecurityProtocol';

interface LoginFormProps {
  onLoginSuccess: (role: 'admin' | 'user' | 'security') => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'security' | null>(null);

  const handleLogin = (role: 'admin' | 'user' | 'security') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onLoginSuccess={handleLogin}
        onForgotPassword={() => {}}
        onRegister={() => {}}
      />
    );
  }

  return (
    <Router>
      <AuthLayout onLogout={handleLogout} userRole={userRole}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} userRole={userRole} />} />
          <Route path="/residents" element={<ResidentManagement />} />
          <Route path="/complaints/create" element={<ComplaintTracking />} />
          <Route path="/complaints/requests" element={<RequestTracking />} />
          <Route path="/financial">
            <Route path="income" element={<FinancialIncome />} />
            <Route path="expense" element={<FinancialExpense />} />
            <Route path="note" element={<FinancialNote />} />
          </Route>
          <Route path="/facility" element={<FacilityManagement />} />
          <Route path="/security-guard" element={<SecurityGuardApp />} />
          <Route path="/security">
            <Route path="visitors" element={<VisitorApp />} />
            <Route path="emergency" element={<EmergencyApp />} />
            <Route path="protocol" element={<SecurityProtocol />} />
          </Route>
          <Route path="/announcement" element={<AnnouncementApp />} />
          <Route path="/community">
            <Route path="forum" element={<CommunityForum />} />
            <Route path="polls" element={<CommunityPolls />} />
            <Route path="discussions" element={<CommunityDiscussions />} />
          </Route>
          <Route path="/payments/maintenance" element={<MaintenanceInvoices />} />
          <Route path="/payments/other" element={<OtherInvoices />} />
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;