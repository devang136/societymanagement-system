import mongoose from 'mongoose';
import { Event } from '../models/Event';

const INITIAL_EVENTS = [
  {
    participator: {
      name: 'Cody Fisher',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: 'Event and recreational activities.',
    activityTime: '2:45 PM',
    activityDate: '2024-02-11',
    activityName: 'Society Meeting',
    participants: []
  },
  // ... rest of your mock events
];

async function seedEvents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Event.deleteMany({}); // Clear existing events
    await Event.insertMany(INITIAL_EVENTS);
    console.log('Events seeded successfully');
  } catch (error) {
    console.error('Error seeding events:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedEvents(); 