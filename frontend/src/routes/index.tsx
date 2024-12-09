import { createBrowserRouter } from 'react-router-dom';
import { ServiceComplaintRoute } from '../components/usersidelogic/servicecomplaint/ServiceComplaintRoute';

export const router = createBrowserRouter([
  {
    path: '/services',
    element: <ServiceComplaintRoute />
  }
  // ... other routes
]); 