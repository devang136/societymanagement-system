import axiosInstance from './axiosInstance';

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  society: string;
  wing: string;
  unit: string;
  role: 'admin' | 'user' | 'security';
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