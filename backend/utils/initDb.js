const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Society = require('../models/Society');
const SecurityProtocol = require('../models/SecurityProtocol');

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

const createInitialSecurityProtocols = async (society, adminUser) => {
  const protocols = [
    {
      title: 'Visitor Entry Protocol',
      description: 'Standard procedures for visitor entry and verification:\n\n' +
        '1. Check visitor ID\n' +
        '2. Contact resident for approval\n' +
        '3. Record entry in visitor log\n' +
        '4. Issue visitor pass\n' +
        '5. Guide visitor to destination',
      category: 'Visitor',
      priority: 'High',
      society: society.name,
      createdBy: adminUser._id
    },
    {
      title: 'Emergency Evacuation Protocol',
      description: 'Steps for emergency evacuation:\n\n' +
        '1. Sound emergency alarm\n' +
        '2. Guide residents to emergency exits\n' +
        '3. Contact emergency services\n' +
        '4. Perform headcount at assembly point\n' +
        '5. Coordinate with emergency responders',
      category: 'Emergency',
      priority: 'High',
      society: society.name,
      createdBy: adminUser._id
    },
    {
      title: 'Night Patrol Schedule',
      description: 'Guidelines for night patrol:\n\n' +
        '1. Hourly rounds of all floors\n' +
        '2. Check all entry/exit points\n' +
        '3. Monitor CCTV feeds\n' +
        '4. Report suspicious activities\n' +
        '5. Maintain patrol log',
      category: 'Daily',
      priority: 'Medium',
      society: society.name,
      createdBy: adminUser._id
    },
    {
      title: 'Maintenance Worker Access',
      description: 'Protocol for maintenance worker access:\n\n' +
        '1. Verify work order\n' +
        '2. Check worker IDs\n' +
        '3. Issue temporary access cards\n' +
        '4. Monitor work areas\n' +
        '5. Record completion time',
      category: 'Maintenance',
      priority: 'Medium',
      society: society.name,
      createdBy: adminUser._id
    },
    {
      title: 'Fire Safety Protocol',
      description: 'Fire safety procedures:\n\n' +
        '1. Regular fire alarm testing\n' +
        '2. Maintain fire extinguishers\n' +
        '3. Clear fire exits\n' +
        '4. Conduct fire drills\n' +
        '5. Train staff on fire response',
      category: 'Emergency',
      priority: 'High',
      society: society.name,
      createdBy: adminUser._id
    }
  ];

  for (const protocol of protocols) {
    try {
      const existingProtocol = await SecurityProtocol.findOne({
        title: protocol.title,
        society: protocol.society
      });

      if (!existingProtocol) {
        await SecurityProtocol.create(protocol);
        console.log(`Created security protocol: ${protocol.title}`);
      }
    } catch (error) {
      console.error(`Error creating security protocol ${protocol.title}:`, error);
    }
  }
};

const initializeDb = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Create society and users
    const society = await createTestSociety();
    await createInitialUsers(society);
    
    // Get admin user for creating protocols
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      throw new Error('Admin user not found');
    }
    
    // Create security protocols
    await createInitialSecurityProtocols(society, adminUser);
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

module.exports = initializeDb; 