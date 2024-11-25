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

export interface ComplaintFormData {
  complainerName: string;
  complaintName: string;
  description: string;
  wing: string;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Solve';
}

export type RequestFormData = {
    requesterName: string;
    requestName: string;
    description: string;
    priority: string;
    status: string;
    wing: string;
    unit: string;
};

export type Request = {
  id: string;
  requesterName: string;
  requestName: string;
  description: string;
  unitNumber: string;
  priority: string;
  status: string;
  date: string;
  wing: string;
  unit: string;
  avatar: string;
}; 