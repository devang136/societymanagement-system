import axiosInstance from './axiosInstance';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Cultural' | 'Sports' | 'Festival' | 'Meeting' | 'Other';
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  society: string;
  maxParticipants: number | null;
  participants: Array<{
    _id: string;
    firstName: string;
    lastName: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const eventService = {
  getEvents: async () => {
    try {
      const response = await axiosInstance.get('/events');
      return response.data;
    } catch (error: any) {
      console.error('Get events error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  createEvent: async (eventData: Omit<Event, '_id' | 'organizer' | 'society' | 'participants' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axiosInstance.post('/events/create', eventData);
      return response.data;
    } catch (error: any) {
      console.error('Create event error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create event');
    }
  },

  joinEvent: async (eventId: string) => {
    try {
      const response = await axiosInstance.post(`/events/${eventId}/join`);
      return response.data;
    } catch (error: any) {
      console.error('Join event error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to join event');
    }
  }
}; 