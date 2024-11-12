import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import RegistrationForm from './components/RegistrationForm';
import ResetPassword from './components/ResetPassword';

function App() {
  const [currentView, setCurrentView] = useState<
    'login' | 'register' | 'forgot-password' | 'reset-password'
  >('register');

  const handleViewChange = (
    view: 'login' | 'register' | 'forgot-password' | 'reset-password'
  ) => {
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === 'login' && (
        <LoginForm
          onForgotPassword={() => handleViewChange('forgot-password')}
          onRegister={() => handleViewChange('register')}
        />
      )}
      {currentView === 'forgot-password' && (
        <ForgotPassword onBackToLogin={() => handleViewChange('login')} />
      )}
      {currentView === 'register' && (
        <RegistrationForm onBackToLogin={() => handleViewChange('login')} />
      )}
      {currentView === 'reset-password' && (
        <ResetPassword onBackToLogin={() => handleViewChange('login')} />
      )}
    </div>
  );
}

export default App;