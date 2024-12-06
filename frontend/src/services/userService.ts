import axiosInstance from './axiosInstance';

export interface FamilyMember {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  relation: string;
}

export interface Vehicle {
  type: string;
  name: string;
  number: string;
}

export interface Document {
  name: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
}

export interface MaintenanceDetail {
  billDate?: string;
  pendingDate?: string;
  date?: string;
  maintenanceAmount?: number;
  penaltyAmount?: number;
  amount?: number;
  dueAmount?: number;
  grandTotal?: number;
}

export interface Announcement {
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  country: string;
  state: string;
  city: string;
  society: string;
  wing: string;
  unit: string;
  ownerDetails?: {
    name: string;
    phone: string;
    address: string;
  };
  role: 'admin' | 'user' | 'security';
  userType: 'owner' | 'tenant';
  familyMembers: FamilyMember[];
  vehicles: Vehicle[];
  documents: Document[];
  maintenanceAmount: number;
  penaltyAmount: number;
  maintenanceDetails: {
    pending: MaintenanceDetail[];
    due: MaintenanceDetail[];
  };
  announcements: Announcement[];
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  getPersonalDetails: async (): Promise<UserDetails> => {
    try {
      const response = await axiosInstance.get('/users/me');
      return response.data;
    } catch (error: any) {
      console.error('Get personal details error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch personal details');
    }
  },

  updatePersonalDetails: async (updates: Partial<UserDetails>) => {
    try {
      const response = await axiosInstance.put('/users/me', updates);
      return response.data;
    } catch (error: any) {
      console.error('Update personal details error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to update personal details');
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await axiosInstance.post('/users/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      console.error('Change password error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
}; 