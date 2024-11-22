import axios from 'axios';
import { SecurityGuard, Resident } from '../types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
    }
  }
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Security Guard APIs
export const getSecurityGuards = async (): Promise<SecurityGuard[]> => {
  const response = await api.get('/security-guards');
  return response.data;
};

export const createSecurityGuard = async (guardData: Omit<SecurityGuard, 'id'>): Promise<SecurityGuard> => {
  const response = await api.post('/security-guards', guardData);
  return response.data;
};

export const updateSecurityGuard = async (id: string, guardData: Partial<SecurityGuard>): Promise<SecurityGuard> => {
  const response = await api.put(`/security-guards/${id}`, guardData);
  return response.data;
};

export const deleteSecurityGuard = async (id: string): Promise<void> => {
  await api.delete(`/security-guards/${id}`);
};

// Resident APIs
export const getResidents = async (): Promise<Resident[]> => {
  const response = await api.get('/residents');
  return response.data;
};

export const createResident = async (residentData: Omit<Resident, 'id'>): Promise<Resident> => {
  const response = await api.post('/residents', residentData);
  return response.data;
};

export const updateResident = async (id: string, residentData: Partial<Resident>): Promise<Resident> => {
  const response = await api.put(`/residents/${id}`, residentData);
  return response.data;
};

export const deleteResident = async (id: string): Promise<void> => {
  await api.delete(`/residents/${id}`);
};