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