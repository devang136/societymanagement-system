import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
});

interface PersonalDetails {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  wing: string;
  age: number;
  unit: string;
  relation: string;
}

export const userService = {
  async getPersonalDetails(): Promise<PersonalDetails> {
    try {
      // First try to fetch from API
      const response = await axios.get(`${API_URL}/personal-details`, getAuthHeader());
      return response.data;
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('Using mock data as API call failed:', error);
      return {
        fullName: "Arlene McCoy",
        phoneNumber: "+91 99130 44527",
        emailAddress: "ArleneMcCoy25@gmail.com",
        gender: "Male",
        wing: "A",
        age: 28,
        unit: "1001",
        relation: "Owner"
      };
    }
  },

  async updatePersonalDetails(details: PersonalDetails): Promise<PersonalDetails> {
    try {
      const response = await axios.put(
        `${API_URL}/personal-details`, 
        details,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.warn('Using mock response as API call failed:', error);
      return details;
    }
  }
}; 