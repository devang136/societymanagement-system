export interface SecurityGuard {
  id: string;
  name: string;
  phone: string;
  shift: 'Day' | 'Night';
  date: string;
  time: string;
  gender: 'Male' | 'Female';
  avatar: string;
}