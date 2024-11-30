const { Society, User, Poll } = require('../models');
const bcrypt = require('bcryptjs');

const createTestSociety = async () => {
  try {
    // Find or create test society
    let society = await Society.findOne({ name: 'Test Society' });
    
    if (!society) {
      society = await Society.create({
        name: 'Test Society',
        address: 'Test Address, Test City',
        wings: ['A', 'B', 'C'],
        totalUnits: 100
      });
      console.log('Test society created successfully');
    } else {
      console.log('Test society already exists');
    }
    
    return society;
  } catch (error) {
    console.error('Error with test society:', error);
    throw error;
  }
};

const createTestUser = async (society) => {
  try {
    // Find or create test user
    let user = await User.findOne({ email: 'user@gmail.com' });
    
    if (!user) {
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
      console.log('Test user already exists');
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

const initializeDb = async () => {
  try {
    const society = await createTestSociety();
    const user = await createTestUser(society);
    await createTestPoll(user);
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
    // Don't throw here to prevent server crash
    // Just log the error and continue
  }
};

module.exports = initializeDb; 