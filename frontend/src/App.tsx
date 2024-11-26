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
import SecurityProtocol from './components/securitymanagement/protocol/SecurityProtocol';
import RegistrationForm from './components/RegistrationForm';
import ForgotPassword from './components/ForgotPassword';
import SecuritySideLogicApp from './components/securitysidelogic/securitysidelogicApp';
import VisitorTrackingApp from './components/securitysidelogic/visitortracking/src/visitortrackingApp';
import { SecurityProtocolRoute } from './components/usersidelogic/securityprotocol/SecurityProtocolRoute';
import { EventParticipationRoute } from './components/usersidelogic/eventparticipation/EventParticipationRoute';
import { ServiceComplaintRoute } from './components/usersidelogic/servicecomplaint/ServiceComplaintRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'security' | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login');

  const handleLogin = (role: 'admin' | 'user' | 'security') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    if (currentView === 'login') {
      return (
        <LoginForm 
          onLoginSuccess={handleLogin}
          onForgotPassword={() => setCurrentView('forgot-password')}
          onRegister={() => setCurrentView('register')}
        />
      );
    } else if (currentView === 'register') {
      return (
        <RegistrationForm 
          onBackToLogin={() => setCurrentView('login')}
        />
      );
    } else {
      return (
        <ForgotPassword 
          onBackToLogin={() => setCurrentView('login')}
        />
      );
    }
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
            <Route path="protocol" element={<SecurityProtocol />} />
            <Route path="emergency" element={
              userRole === 'security' ? 
              <SecuritySideLogicApp /> : 
              <Navigate to="/dashboard" />
            } />
            <Route path="visitor-tracking" element={<VisitorTrackingApp />} />
          </Route>
          <Route path="/announcement" element={<AnnouncementApp />} />
          <Route path="/community">
            <Route path="forum" element={<CommunityForum />} />
            <Route path="polls" element={<CommunityPolls />} />
            <Route path="discussions" element={<CommunityDiscussions />} />
          </Route>
          <Route path="/payments/maintenance" element={<MaintenanceInvoices />} />
          <Route path="/payments/other" element={<OtherInvoices />} />
          <Route 
            path="/security-protocol" 
            element={
              userRole === 'user' ? 
              <SecurityProtocolRoute /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/events" 
            element={
              userRole === 'user' ? 
              <EventParticipationRoute /> : 
              <Navigate to="/dashboard" />
            } 
          />
          <Route 
            path="/service-complaint" 
            element={
              userRole === 'user' ? 
              <ServiceComplaintRoute /> : 
              <Navigate to="/dashboard" />
            } 
          />
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;