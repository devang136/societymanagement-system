import axiosInstance from './axiosInstance';

export interface PollOption {
  text: string;
  votes: number;
}

export interface CreatePollData {
  question: string;
  pollType: 'Multichoice polls' | 'Rating polls' | 'Yes/No polls';
  options: string[];
}

export interface Poll extends Omit<CreatePollData, 'options'> {
  _id: string;
  options: PollOption[];
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  society: string;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export const pollService = {
  createPoll: async (pollData: CreatePollData) => {
    try {
      console.log('Creating poll with data:', pollData);
      const response = await axiosInstance.post('/polls/create', pollData);
      console.log('Poll created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create poll error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create poll');
    }
  },

  getPolls: async () => {
    try {
      console.log('Fetching polls...');
      const response = await axiosInstance.get('/polls');
      console.log('Polls fetched:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get polls error:', error.response?.data || error);
      if (error.response?.status === 401) {
        throw new Error('Please authenticate');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch polls');
    }
  },

  votePoll: async (pollId: string, optionIndex: number) => {
    try {
      const response = await axiosInstance.post(`/polls/${pollId}/vote`, { optionIndex });
      return response.data;
    } catch (error: any) {
      console.error('Vote poll error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to vote on poll');
    }
  }
}; 