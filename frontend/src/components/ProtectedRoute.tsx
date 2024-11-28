import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userRole: 'admin' | 'user' | 'security' | null;
  allowedRole: 'admin' | 'user' | 'security';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userRole,
  allowedRole
}) => {
  if (!userRole || userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 