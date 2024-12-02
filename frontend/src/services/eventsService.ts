import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export interface Event {
  _id: string;
  eventName: string;
  description: string;
  activityTime: string;
  activityDate: string;
  participator: {
    name: string;
    avatar: string;
  };
  status: string;
}

export const eventsService = {
  async getEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/events`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get events error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  async getActivities() {
    try {
      const response = await axios.get(`${API_URL}/events/activities`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Get activities error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch activities');
    }
  },

  async participateInEvent(eventId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/participate`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Participate in event error:', error);
      throw new Error(error.response?.data?.message || 'Failed to participate in event');
    }
  }
}; 