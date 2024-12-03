import axios from 'axios';
import { Request } from '../components/usersidelogic/servicecomplaint/types';

const API_URL = '/api/requests';

export const requestService = {
  async getRequests() {
    const response = await axios.get<Request[]>(API_URL);
    return response.data;
  },

  async createRequest(request: Omit<Request, 'id'>) {
    const response = await axios.post<Request>(API_URL, request);
    return response.data;
  },

  async deleteRequest(id: string) {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 