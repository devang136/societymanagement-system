import axiosInstance from './axiosInstance';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  society: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer?: string;
}

export const eventsService = {
  getEvents: async () => {
    try {
      const response = await axiosInstance.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  createEvent: async (eventData: CreateEventData) => {
    try {
      const response = await axiosInstance.post('/events/create', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async (id: string, updates: Partial<CreateEventData>) => {
    try {
      const response = await axiosInstance.put(`/events/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}; 