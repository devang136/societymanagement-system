// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'resident' | 'security';
  phone?: string;
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Facility Types
export interface Facility {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  description?: string;
  location: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Resident Types
export interface Resident {
  id: string;
  name: string;
  unit: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  moveInDate: Date;
  moveOutDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Security Types
export interface SecurityGuard {
  id: string;
  name: string;
  badge: string;
  shift: 'morning' | 'afternoon' | 'night';
  phone: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityProtocol {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Visitor {
  id: string;
  name: string;
  purpose: string;
  hostUnit: string;
  hostName: string;
  checkIn: Date;
  checkOut?: Date;
  status: 'checked-in' | 'checked-out';
  createdAt: Date;
  updatedAt: Date;
}

// Financial Types
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  receipt?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Income {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  receipt?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request/Complaint Types
export interface Request {
  id: string;
  title: string;
  description: string;
  type: 'maintenance' | 'complaint' | 'general';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  submittedBy: string;
  assignedTo?: string;
  unit: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  priority?: 'low' | 'medium' | 'high';
  attachments?: string[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Common Types
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
