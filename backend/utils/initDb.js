const { Society, User, Poll, SecurityProtocol, Event } = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const createTestSociety = async () => {
  try {
    // Delete any existing test society and wait for it to complete
    await Society.deleteMany({ name: 'Test Society' });
    
    // Wait a bit to ensure deletion is complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new test society
    const society = await Society.create({
      name: 'Test Society',
      address: 'Test Address, Test City',
      wings: ['A', 'B', 'C'],
      totalUnits: 100
    });
    
    console.log('Test society created successfully');
    return society;
  } catch (error) {
    console.error('Error with test society:', error);
    // Try to recover
    try {
      const existingSociety = await Society.findOne({ name: 'Test Society' });
      if (existingSociety) {
        console.log('Using existing society');
        return existingSociety;
      }
    } catch (e) {
      console.error('Recovery failed:', e);
    }
    throw error;
  }
};

const createTestUser = async (society) => {
  try {
    // First, try to find the test user
    let user = await User.findOne({ email: 'user@gmail.com' });
    
    if (!user) {
      // Only create if it doesn't exist
      user = new User({
        name: 'Test User',
        email: 'user@gmail.com',
        password: 'asdasd',
        society: society._id,
        wing: 'A',
        unit: '101',
        role: 'user',
        contactNumber: '1234567890',
        isActive: true
      });

      await user.save();
      console.log('Test user created successfully');
    } else {
      console.log('Using existing test user');
      // Update society reference if needed
      if (!user.society.equals(society._id)) {
        user.society = society._id;
        await user.save();
        console.log('Updated test user society reference');
      }
    }
    
    return user;
  } catch (error) {
    console.error('Error with test user:', error);
    throw error;
  }
};

const createTestPoll = async (user) => {
  try {
    // Find or create test poll
    let poll = await Poll.findOne({ question: 'Test Poll Question?' });
    
    if (!poll) {
      poll = new Poll({
        question: 'Test Poll Question?',
        pollType: 'Multichoice polls',
        options: [
          { text: 'Yes' },
          { text: 'No' },
          { text: 'Maybe' }
        ],
        createdBy: user._id,
        society: user.society
      });
      
      await poll.save();
      console.log('Test poll created successfully');
    } else {
      console.log('Test poll already exists');
      // Update references if needed
      if (!poll.createdBy.equals(user._id) || !poll.society.equals(user.society)) {
        poll.createdBy = user._id;
        poll.society = user.society;
        await poll.save();
        console.log('Updated test poll references');
      }
    }
    
    return poll;
  } catch (error) {
    console.error('Error with test poll:', error);
    throw error;
  }
};

const createTestProtocols = async (user) => {
  try {
    // Create test protocols
    const testProtocols = [
      {
        title: 'Emergency Response Protocol',
        description: 'Standard procedures for handling emergency situations',
        category: 'Emergency',
        priority: 'High',
        society: user.society._id,
        createdBy: user._id
      },
      {
        title: 'Visitor Entry Protocol',
        description: 'Guidelines for visitor entry and verification',
        category: 'Visitor',
        priority: 'Medium',
        society: user.society._id,
        createdBy: user._id
      },
      {
        title: 'Daily Security Rounds',
        description: 'Schedule and procedures for daily security patrols',
        category: 'Daily',
        priority: 'Medium',
        society: user.society._id,
        createdBy: user._id
      }
    ];

    for (const protocol of testProtocols) {
      // Check if protocol already exists
      const existingProtocol = await SecurityProtocol.findOne({ 
        title: protocol.title,
        society: user.society._id 
      });

      if (!existingProtocol) {
        await SecurityProtocol.create(protocol);
        console.log(`Test protocol created: ${protocol.title}`);
      } else {
        console.log(`Test protocol already exists: ${protocol.title}`);
      }
    }
  } catch (error) {
    console.error('Error creating test protocols:', error);
    throw error;
  }
};

const createTestEvents = async (user) => {
  try {
    const testEvents = [
      {
        eventName: 'Annual Society Meeting',
        description: 'Yearly meeting to discuss society matters',
        activityTime: '10:00 AM',
        activityDate: new Date('2024-03-15'),
        participator: {
          name: 'John Doe',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
        },
        society: user.society._id,
        status: 'upcoming'
      },
      {
        eventName: 'Holi Celebration',
        description: 'Festival of colors celebration',
        activityTime: '9:00 AM',
        activityDate: new Date('2024-03-25'),
        participator: {
          name: 'Jane Smith',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
        },
        society: user.society._id,
        status: 'upcoming'
      }
    ];

    for (const eventData of testEvents) {
      const existingEvent = await Event.findOne({
        eventName: eventData.eventName,
        society: user.society._id
      });

      if (!existingEvent) {
        await Event.create(eventData);
        console.log(`Test event created: ${eventData.eventName}`);
      }
    }
  } catch (error) {
    console.error('Error creating test events:', error);
  }
};

const initializeDb = async () => {
  try {
    // Drop all collections first
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      try {
        await collection.drop();
      } catch (error) {
        if (error.code === 26) {
          console.log(`Collection ${collection.collectionName} already dropped`);
        } else {
          throw error;
        }
      }
    }
    console.log('Database cleanup completed');

    // Wait a bit before creating new data
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create test data
    const society = await createTestSociety();
    if (!society) {
      throw new Error('Failed to create or find society');
    }

    const user = await createTestUser(society);
    if (!user) {
      throw new Error('Failed to create or find user');
    }

    await createTestPoll(user);
    await createTestProtocols(user);
    await createTestEvents(user);
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1); // Exit if initialization fails
  }
};

module.exports = initializeDb; 