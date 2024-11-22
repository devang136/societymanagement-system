export interface Complaint {
  id: string;
  complainerName: string;
  complaintName: string;
  description: string;
  unitNumber: string;
  wing: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Progress' | 'Resolved';
  dateSubmitted: string;
  category: string;
}

export interface ComplaintFormData extends Omit<Complaint, 'id' | 'dateSubmitted'> {
  id?: string;
  dateSubmitted?: string;
}
