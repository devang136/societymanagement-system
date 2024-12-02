export type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Complaint {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: Status;
  createdAt?: string;
  createdBy?: {
    name: string;
    _id: string;
  };
  society?: {
    name: string;
    _id: string;
  };
  assignedTo?: {
    name: string;
    _id: string;
  };
}

export interface Request {
  id: string;
  requestDate: string;
  status: Status;
  description: string;
}