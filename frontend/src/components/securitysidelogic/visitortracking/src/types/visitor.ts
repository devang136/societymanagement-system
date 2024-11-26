export interface Visitor {
  id: string;
  name: string;
  phoneNumber: string;
  date: string;
  unitNumber: string;
  time: string;
  avatar: string;
}

export interface VisitorFormData {
  name: string;
  wing: string;
  unit: string;
  date: string;
  time: string;
}