export interface Complaint {
  id: string;
  complainerName: string;
  complaintName: string;
  description: string;
  unitNumber: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Solve';
  date: string;
  wing: string;
  unit: string;
}

export interface Request {
  id: string;
  requesterName: string;
  requestType: string;
  description: string;
  unitNumber: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Completed';
  date: string;
  wing: string;
  unit: string;
}

export type ComplaintFormData = Omit<Complaint, 'id' | 'unitNumber' | 'date'>;
export type RequestFormData = Omit<Request, 'id' | 'unitNumber' | 'date'>; 