import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);

// Auth API Functions
export const login = async (data: { email: string; password: string }): Promise<any> => {
  try {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data: {
  email: string;
  password: string;
  name: string;
  role?: string;
}): Promise<any> => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (data: { email: string }): Promise<any> => {
  try {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<any> => {
  try {
    localStorage.removeItem('token');
    return await api.post('/auth/logout');
  } catch (error) {
    throw error;
  }
};

// Profile API Functions
export const getProfile = async (): Promise<any> => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: any): Promise<any> => {
  try {
    const response = await api.put('/profile', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<any> => {
  try {
    const response = await api.post('/profile/change-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Resident API Functions
export const residentApi = {
  getResidents: async (): Promise<any> => {
    const response = await api.get('/residents');
    return response.data;
  },
  createResident: async (data: any): Promise<any> => {
    const response = await api.post('/residents', data);
    return response.data;
  },
  updateResident: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/residents/${id}`, data);
    return response.data;
  },
  deleteResident: async (id: string): Promise<any> => {
    const response = await api.delete(`/residents/${id}`);
    return response.data;
  }
};

// Export individual resident functions
export const getResidents = residentApi.getResidents;
export const createResident = residentApi.createResident;
export const updateResident = residentApi.updateResident;
export const deleteResident = residentApi.deleteResident;

// Security Guard API Functions
export const securityApi = {
  getGuards: async (): Promise<any> => {
    const response = await api.get('/security-guards');
    return response.data;
  },
  createGuard: async (data: any): Promise<any> => {
    const response = await api.post('/security-guards', data);
    return response.data;
  },
  updateGuard: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/security-guards/${id}`, data);
    return response.data;
  },
  deleteGuard: async (id: string): Promise<any> => {
    const response = await api.delete(`/security-guards/${id}`);
    return response.data;
  }
};

// Export individual security guard functions
export const getSecurityGuards = securityApi.getGuards;
export const createSecurityGuard = securityApi.createGuard;
export const updateSecurityGuard = securityApi.updateGuard;
export const deleteSecurityGuard = securityApi.deleteGuard;

// Financial API Functions
export const financialApi = {
  getIncomes: async (): Promise<any> => {
    const response = await api.get('/financial/incomes');
    return response.data;
  },
  createIncome: async (data: any): Promise<any> => {
    const response = await api.post('/financial/incomes', data);
    return response.data;
  },
  updateIncome: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/financial/incomes/${id}`, data);
    return response.data;
  },
  deleteIncome: async (id: string): Promise<any> => {
    const response = await api.delete(`/financial/incomes/${id}`);
    return response.data;
  },
  
  getExpenses: async (): Promise<any> => {
    const response = await api.get('/financial/expenses');
    return response.data;
  },
  createExpense: async (data: any): Promise<any> => {
    const response = await api.post('/financial/expenses', data);
    return response.data;
  },
  updateExpense: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/financial/expenses/${id}`, data);
    return response.data;
  },
  deleteExpense: async (id: string): Promise<any> => {
    const response = await api.delete(`/financial/expenses/${id}`);
    return response.data;
  },
  
  getNotes: async (): Promise<any> => {
    const response = await api.get('/financial/notes');
    return response.data;
  },
  createNote: async (data: any): Promise<any> => {
    const response = await api.post('/financial/notes', data);
    return response.data;
  },
  updateNote: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/financial/notes/${id}`, data);
    return response.data;
  },
  deleteNote: async (id: string): Promise<any> => {
    const response = await api.delete(`/financial/notes/${id}`);
    return response.data;
  }
};

// Export individual financial functions
export const getIncomes = financialApi.getIncomes;
export const createIncome = financialApi.createIncome;
export const updateIncome = financialApi.updateIncome;
export const deleteIncome = financialApi.deleteIncome;

export const getExpenses = financialApi.getExpenses;
export const createExpense = financialApi.createExpense;
export const updateExpense = financialApi.updateExpense;
export const deleteExpense = financialApi.deleteExpense;

export const getNotes = financialApi.getNotes;
export const createNote = financialApi.createNote;
export const updateNote = financialApi.updateNote;
export const deleteNote = financialApi.deleteNote;

// Facility API Functions
export const facilityApi = {
  getFacilities: async (): Promise<any> => {
    const response = await api.get('/facilities');
    return response.data;
  },
  createFacility: async (data: any): Promise<any> => {
    const response = await api.post('/facilities', data);
    return response.data;
  },
  updateFacility: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/facilities/${id}`, data);
    return response.data;
  },
  deleteFacility: async (id: string): Promise<any> => {
    const response = await api.delete(`/facilities/${id}`);
    return response.data;
  }
};

// Export individual facility functions
export const getFacilities = facilityApi.getFacilities;
export const createFacility = facilityApi.createFacility;
export const updateFacility = facilityApi.updateFacility;
export const deleteFacility = facilityApi.deleteFacility;

// Visitor API Functions
export const visitorApi = {
  getVisitors: async (): Promise<any> => {
    const response = await api.get('/visitors');
    return response.data;
  },
  createVisitor: async (data: any): Promise<any> => {
    const response = await api.post('/visitors', data);
    return response.data;
  },
  updateVisitor: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/visitors/${id}`, data);
    return response.data;
  },
  deleteVisitor: async (id: string): Promise<any> => {
    const response = await api.delete(`/visitors/${id}`);
    return response.data;
  }
};

// Export individual visitor functions
export const getVisitors = visitorApi.getVisitors;
export const createVisitor = visitorApi.createVisitor;
export const updateVisitor = visitorApi.updateVisitor;
export const deleteVisitor = visitorApi.deleteVisitor;

// Announcement API Functions
export const announcementApi = {
  getAnnouncements: async (): Promise<any> => {
    const response = await api.get('/announcements');
    return response.data;
  },
  createAnnouncement: async (data: any): Promise<any> => {
    const response = await api.post('/announcements', data);
    return response.data;
  },
  updateAnnouncement: async (id: string, data: any): Promise<any> => {
    const response = await api.put(`/announcements/${id}`, data);
    return response.data;
  },
  deleteAnnouncement: async (id: string): Promise<any> => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  }
};

// Export individual announcement functions
export const getAnnouncements = announcementApi.getAnnouncements;
export const createAnnouncement = announcementApi.createAnnouncement;
export const updateAnnouncement = announcementApi.updateAnnouncement;
export const deleteAnnouncement = announcementApi.deleteAnnouncement;

export default api;