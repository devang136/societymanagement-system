export type Status = 'Open' | 'Pending' | 'Solve';
export type Priority = 'High' | 'Medium' | 'Low';

export interface IComplaint {
  complainerName: string;
  complaintName: string;
  description: string;
  wing: string;
  unit: string;
  priority: Priority;
  status: Status;
  requestDate: string;
}

export interface IRequest {
  requestDate: string;
  status: Status;
  description: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: string;
  name: string;
} 