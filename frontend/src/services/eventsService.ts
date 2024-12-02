import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
});

const MOCK_EVENTS = [
  {
    id: '1',
    participator: {
      name: 'Cody Fisher',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: 'Event and recreational activities.',
    activityTime: '2:45 PM',
    activityDate: '2024-02-11',
    activityName: 'Society Meeting',
  },
  {
    id: '2',
    participator: {
      name: 'Jenny Wilson',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: 'Cultural celebration and performances.',
    activityTime: '4:00 PM',
    activityDate: '2024-02-15',
    activityName: 'Annual Cultural Fest',
  },
  {
    id: '3',
    participator: {
      name: 'Robert Fox',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: 'Sports tournament and games.',
    activityTime: '3:30 PM',
    activityDate: '2024-02-20',
    activityName: 'Sports Day',
  }
];

export interface Event {
  id: string;
  participator: {
    name: string;
    avatar: string;
  };
  description: string;
  activityTime: string;
  activityDate: string;
  activityName: string;
}

export interface Activity extends Event {
  type: 'sports' | 'cultural' | 'social';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const eventsService = {
  async getEvents(): Promise<Event[]> {
    try {
      const response = await axios.get(`${API_URL}/events`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return MOCK_EVENTS; // Fallback to mock data
    }
  },

  async getActivities(): Promise<Activity[]> {
    try {
      const response = await axios.get(`${API_URL}/activities`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      return []; // Fallback to empty array
    }
  },

  async participateInEvent(eventId: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/events/${eventId}/participate`,
        {},
        getAuthHeader()
      );
    } catch (error) {
      console.error('Error participating in event:', error);
      throw error;
    }
  }
}; 