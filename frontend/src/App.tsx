import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Components
import LoginForm from './components/registerloginforgetscreen/LoginForm';
import RegistrationForm from './components/registerloginforgetscreen/RegistrationForm';
import ForgotPassword from './components/registerloginforgetscreen/ForgotPassword';
import ResetPassword from './components/registerloginforgetscreen/ResetPassword';

// Main Components
import { Dashboard } from './components/dashboard/Dashboard';
import EditProfile from './components/editprofile/EditProfile';
import ResidentManagement from './components/residentmanagement/ResidentManagement';

// Financial Management Components
import FinancialIncome from './components/financialmanagementincomeexpensenote/Income';
import FinancialExpense from './components/financialmanagementincomeexpensenote/Expense';
import FinancialNotes from './components/financialmanagementincomeexpensenote/Notes';

// Facility Management
import FacilityManagement from './components/facilitymanagement/FacilityManagement';

// Complain and Request Components
import CreateComplain from './components/complainandrequesttracking/CreateComplain';
import RequestTracking from './components/complainandrequesttracking/RequestTracking';

// Security Management Components
import VisitorLogs from './components/securitymanagementvisitorandsecurityprotocol/VisitorLogs';
import SecurityProtocols from './components/securitymanagementvisitorandsecurityprotocol/SecurityProtocols';
import SecurityGuard from './components/securityguard/SecurityGuard';

// Announcement
import Announcement from './components/announcement/Announcement';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './components/layout/PrivateRoute';

function AuthRoutes() {
  const navigate = useNavigate();

  const handleForgotPassword = () => navigate('/forgot-password');
  const handleRegister = () => navigate('/register');
  const handleBackToLogin = () => navigate('/login');

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <LoginForm 
            onForgotPassword={handleForgotPassword}
            onRegister={handleRegister}
          />
        } 
      />
      <Route 
        path="/register" 
        element={
          <RegistrationForm 
            onBackToLogin={handleBackToLogin}
          />
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <ForgotPassword 
            onBackToLogin={handleBackToLogin}
          />
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          <ResetPassword 
            onBackToLogin={handleBackToLogin}
          />
        } 
      />

      {/* Protected Routes */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/residents" element={<ResidentManagement />} />
        
        {/* Financial Management Routes */}
        <Route path="/financial">
          <Route path="income" element={<FinancialIncome />} />
          <Route path="expense" element={<FinancialExpense />} />
          <Route path="notes" element={<FinancialNotes />} />
        </Route>

        {/* Facility Management */}
        <Route path="/facility" element={<FacilityManagement />} />

        {/* Complain and Request Routes */}
        <Route path="/complaints">
          <Route path="create" element={<CreateComplain />} />
          <Route path="tracking" element={<RequestTracking />} />
        </Route>

        {/* Security Management Routes */}
        <Route path="/security">
          <Route path="visitors" element={<VisitorLogs />} />
          <Route path="protocols" element={<SecurityProtocols />} />
          <Route path="guard" element={<SecurityGuard />} />
        </Route>

        {/* Announcement Route */}
        <Route path="/announcements" element={<Announcement />} />
      </Route>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;