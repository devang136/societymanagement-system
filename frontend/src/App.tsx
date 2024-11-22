import { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout Components
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';

// Dashboard
import { Dashboard } from './components/dashboard/Dashboard';

// Auth Components
import LoginForm from './components/registerloginforgetscreen/LoginForm';
import RegistrationForm from './components/registerloginforgetscreen/RegistrationForm';
import ForgotPassword from './components/registerloginforgetscreen/ForgotPassword';
import ResetPassword from './components/registerloginforgetscreen/ResetPassword';

// Facility Management
import FacilityList from './components/facility/FacilityList';
import ResidentTable from './components/resident/ResidentTable';
import FacilityManagement from './components/facilitymanagement/FacilityManagement';
import ResidentManagement from './components/residentmanagement/ResidentManagement';

// Security Management
import SecurityProtocolTable from './components/securitymanagementvisitorandsecurityprotocol/SecurityProtocolTable';
import VisitorRow from './components/securitymanagementvisitorandsecurityprotocol/VisitorRow';
import SecurityTable from './components/security/SecurityTable';
import VisitorLogs from './components/securitymanagementvisitorandsecurityprotocol/VisitorLogs';
import SecurityProtocols from './components/securitymanagementvisitorandsecurityprotocol/SecurityProtocols';
import SecurityGuardManagement from './components/securityguard/SecurityGuard';

// Financial Management
import ExpenseList from './components/financialmanagementincomeexpensenote/ExpenseList';
import IncomeList from './components/financialmanagementincomeexpensenote/IncomeList';
import { Notes } from './components/financialmanagementincomeexpensenote/Notes';
import Income from './components/financialmanagementincomeexpensenote/Income';
import Expense from './components/financialmanagementincomeexpensenote/Expense';

// Request Management
import RequestTable from './components/complainandrequesttracking/RequestTable';
import RequestForm from './components/complainandrequesttracking/RequestForm';
import CreateComplain from './components/complainandrequesttracking/CreateComplain';
import RequestTracking from './components/complainandrequesttracking/RequestTracking';

// Profile Management
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import MainEditProfile from './components/editprofile/EditProfile';

// Announcement
import AnnouncementCard from './components/announcement/AnnouncementCard';
import Announcement from './components/announcement/Announcement';

// Public Route Component
const PublicRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Protected Route Component
const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster position="top-right" />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginForm 
                  onForgotPassword={() => navigate('/forgot-password')}
                  onRegister={() => navigate('/register')}
                />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <RegistrationForm onBackToLogin={() => navigate('/login')} />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute>
                <ForgotPassword onBackToLogin={() => navigate('/login')} />
              </PublicRoute>
            } />
            <Route path="/reset-password" element={
              <PublicRoute>
                <ResetPassword onBackToLogin={() => navigate('/login')} />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Dashboard" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Dashboard />
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/facility/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Facilities" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<FacilityList facilities={[]} onEditFacility={() => {}} />} />
                        <Route path="/residents" element={<ResidentTable onStatusClick={() => {}} onDeleteClick={() => {}} onViewDetails={() => {}} />} />
                        <Route path="/facility-management" element={<FacilityManagement />} />
                        <Route path="/resident-management" element={<ResidentManagement />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/security/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Security" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<SecurityProtocolTable protocols={[]} onEdit={() => {}} onDelete={() => {}} onView={() => {}} />} />
                        <Route path="/visitors" element={<VisitorRow visitor={{ name: '', phone: '', date: '', unit: '', time: '', avatarUrl: '/placeholder-avatar.png' }} />} />
                        <Route path="/security" element={<SecurityTable />} />
                        <Route path="/visitor-logs" element={<VisitorLogs />} />
                        <Route path="/security-protocols" element={<SecurityProtocols />} />
                        <Route path="/security-guard" element={<SecurityGuardManagement />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/financial/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Financial Management" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<ExpenseList />} />
                        <Route path="/income" element={<IncomeList />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/financial-income" element={<Income />} />
                        <Route path="/financial-expense" element={<Expense />} />
                        <Route path="/financial-notes" element={<Notes />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/requests/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Complaints" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<RequestTable requests={[]} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />} />
                        <Route path="/create-request" element={<RequestForm onClose={() => {}} onSubmit={() => {}} />} />
                        <Route path="/create-complain" element={<CreateComplain />} />
                        <Route path="/request-tracking" element={<RequestTracking />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/profile/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Settings" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/main-edit-profile" element={<MainEditProfile />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/announcements/*" element={
              <ProtectedRoute>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Header title="Announcements" onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<AnnouncementCard announcement={{ id: '', title: '', content: '', category: '', priority: 'Low', status: 'Active', createdAt: new Date().toISOString(), validUntil: new Date().toISOString(), createdBy: '', targetAudience: [] }} onEdit={() => {}} onView={() => {}} />} />
                        <Route path="/announcement" element={<Announcement />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;