export interface Facility {
  id: string;
  name: string;
  type: string;
  status: 'Available' | 'In Use' | 'Under Maintenance';
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface FacilityFormData extends Omit<Facility, 'id'> {
  id?: string;
}