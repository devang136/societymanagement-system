export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Scheduled' | 'Expired';
  createdAt: string;
  validUntil: string;
  createdBy: string;
  targetAudience: string[];
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Scheduled' | 'Expired';
  validUntil: string;
  targetAudience: string[];
}