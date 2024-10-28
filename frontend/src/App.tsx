import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>('login');

  const handleViewChange = (view: 'login' | 'register' | 'forgot-password') => {
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
    </div>
  );
}

export default App;