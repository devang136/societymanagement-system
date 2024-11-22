export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  unitNumber: string;
  role: string;
  avatarUrl?: string;
  status: 'Active' | 'Inactive';
  residentType: string;
  moveInDate: Date;
  emergencyContact?: EmergencyContact;
}

export interface UserFormData extends Omit<User, 'id'> {
  id?: string;
}
