export interface SecurityGuard {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  contactNumber: string;
  shift: 'Morning' | 'Afternoon' | 'Night';
  location: string;
  joiningDate: string;
  nextShift: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  moveInDate: Date;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'resident' | 'security';
  status: 'active' | 'inactive';
}

export interface Society {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
