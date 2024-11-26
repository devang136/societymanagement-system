export type Status = 'Open' | 'Pending' | 'Solve';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Complaint {
  id: string;
  complainerName: string;
  complaintName: string;
  description: string;
  wing: string;
  unit: string;
  priority: Priority;
  status: Status;
  requestDate: string;
}

export interface Request {
  id: string;
  requestDate: string;
  status: Status;
  description: string;
}