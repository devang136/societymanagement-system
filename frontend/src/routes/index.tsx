import { createBrowserRouter } from 'react-router-dom';
import { ServiceComplaintRoute } from '../components/usersidelogic/servicecomplaint/ServiceComplaintRoute';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/services',
    element: <ServiceComplaintRoute />
  }
  // ... other routes
]); 