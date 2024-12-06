const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Society = require('../models/Society');

const createTestSociety = async () => {
  try {
    let society = await Society.findOne({ name: 'Test Society' });
    if (society) {
      console.log('Test society already exists');
      return society;
    }

    society = new Society({
      name: 'Test Society',
      address: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      pincode: '123456',
      totalUnits: 100,
      wings: ['A', 'B', 'C'],
      amenities: ['Gym', 'Swimming Pool'],
      maintenanceCharges: 1000
    });

    await society.save();
    console.log('Test society created successfully');
    return society;
  } catch (error) {
    console.error('Error creating test society:', error);
    throw error;
  }
};

const createInitialUsers = async (society) => {
  const users = [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '1234567890',
      country: 'Test Country',
      state: 'Test State',
      city: 'Test City',
      society: society.name,
      wing: 'A',
      unit: '101',
      password: 'admin123',
      role: 'admin'
    },
    {
      firstName: 'Security',
      lastName: 'Guard',
      email: 'security@example.com',
      phone: '9876543210',
      country: 'Test Country',
      state: 'Test State',
      city: 'Test City',
      society: society.name,
      wing: 'B',
      unit: '102',
      password: 'security123',
      role: 'security'
    },
    {
      firstName: 'Test',
      lastName: 'User',
      email: 'user@example.com',
      phone: '5555555555',
      country: 'Test Country',
      state: 'Test State',
      city: 'Test City',
      society: society.name,
      wing: 'C',
      unit: '103',
      password: 'user123',
      role: 'user'
    }
  ];

  for (const userData of users) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User ${userData.email} already exists`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create new user
      const user = new User({
        ...userData,
        password: hashedPassword
      });

      await user.save();
      console.log(`Created ${userData.role} user: ${userData.email}`);
    } catch (error) {
      console.error(`Error creating ${userData.role} user:`, error);
      throw error;
    }
  }
};

const initializeDb = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Force clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Society.deleteMany({});
    
    const society = await createTestSociety();
    await createInitialUsers(society);
    
    // Verify users were created
    const users = await User.find({});
    console.log('Created users:', users.map(u => ({ email: u.email, role: u.role })));
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

module.exports = initializeDb; 