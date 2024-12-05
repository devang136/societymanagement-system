export interface Visitor {
  id?: string;
  name: string;
  phone: string;
  hostResident: string;
  hostUnit: {
    building: string;
    number: string;
  };
  status: 'checked_in' | 'checked_out';
  approvedBy: string;
  notes?: string;
  createdAt?: Date;
}

export interface VisitorFormData {
  name: string;
  phone: string;
  wing: string;
  unit: string;
  notes?: string;
}