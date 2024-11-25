export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
}

export interface AnnouncementFormData {
  title: string;
  description: string;
  date: string;
  time: string;
}