const { Society, User, Poll, SecurityProtocol } = require('../models');
const bcrypt = require('bcryptjs');

const createTestSociety = async () => {
  try {
    // First, try to find the test society
    let society = await Society.findOne({ name: 'Test Society' });
    
    if (!society) {
      // Only create if it doesn't exist
      society = await Society.create({
        name: 'Test Society',
        address: 'Test Address, Test City',
        wings: ['A', 'B', 'C'],
        totalUnits: 100
      });
      console.log('Test society created successfully');
    } else {
      console.log('Using existing test society');
    }
    
    return society;
  } catch (error) {
    // Log error but don't throw it to prevent server crash
    console.error('Error with test society:', error);
    // Try to recover by finding existing society
    const existingSociety = await Society.findOne({ name: 'Test Society' });
    if (existingSociety) {
      console.log('Recovered using existing society');
      return existingSociety;
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

const initializeDb = async () => {
  try {
    const society = await createTestSociety();
    if (!society) {
      console.error('Failed to get or create test society');
      return;
    }

    const user = await createTestUser(society);
    if (!user) {
      console.error('Failed to get or create test user');
      return;
    }

    await createTestPoll(user);
    await createTestProtocols(user);
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
    // Don't throw here to prevent server crash
  }
};

module.exports = initializeDb; 