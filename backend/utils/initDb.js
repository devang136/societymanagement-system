const { Society, User, Poll, SecurityProtocol } = require('../models');
const mongoose = require('mongoose');
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

const createTestEvents = async (user) => {
  try {
    // Wait for models to be registered
    const Event = mongoose.model('Event');
    const Invoice = mongoose.model('Invoice');

    const testEvents = [
      {
        eventName: 'Navratri Festival',
        eventDate: new Date('2024-01-11'),
        amount: 1000,
        society: user.society._id,
        status: 'pending'
      },
      {
        eventName: 'Diwali Celebration',
        eventDate: new Date('2024-02-15'),
        amount: 1500,
        society: user.society._id,
        status: 'pending'
      },
      {
        eventName: 'Holi Festival',
        eventDate: new Date('2024-03-20'),
        amount: 800,
        society: user.society._id,
      }
    ];

    for (const eventData of testEvents) {
      // Check if event exists
      // Check if event exists
      const existingEvent = await Event.findOne({
        eventName: eventData.eventName,
        society: user.society._id
      });

      if (!existingEvent) {
        // Create event
        const event = await Event.create(eventData);
        console.log(`Test event created: ${event.eventName}`);

        // Create invoice
        await Invoice.create({
          invoiceId: `INV-${Math.floor(Math.random() * 10000)}`,
          event: event._id,
          user: user._id,
          society: user.society._id,
          billDate: new Date(),
          maintenanceAmount: event.amount * 0.1,
          grandTotal: event.amount * 1.1,
          status: 'pending'
        });
        console.log(`Test invoice created for: ${event.eventName}`);
      } else {
        console.log(`Test event already exists: ${eventData.eventName}`);
      }
    }
  } catch (error) {
    console.error('Error creating test events and invoices:', error);
  }
};

const createTestInvoices = async (user) => {
  try {
    const events = await Event.find({ society: user.society._id });
    
    for (const event of events) {
      const existingInvoice = await Invoice.findOne({
        event: event._id,
        user: user._id
      });

      if (!existingInvoice) {
        // Ensure event.amount exists and is a number
        const eventAmount = Number(event.amount) || 1000; // Default to 1000 if amount is missing
        const maintenanceAmount = eventAmount * 0.1; // 10% maintenance fee
        const grandTotal = eventAmount + maintenanceAmount;

        const invoice = await Invoice.create({
          invoiceId: `INV-${Math.floor(Math.random() * 10000)}`,
          event: event._id,
          user: user._id,
          society: user.society._id,
          billDate: new Date(),
          maintenanceAmount: maintenanceAmount,
          grandTotal: grandTotal,
          status: 'pending'
        });
        console.log(`Test invoice created for event: ${event.eventName}`);
      }
    }
  } catch (error) {
    console.error('Error creating test invoices:', error);
  }
};

const createTestMembersAndVehicles = async (user) => {
  try {
    // Create test members
    const testMembers = [
      {
        name: 'Arlene McCoy',
        email: 'ArleneMcCoy@gmail.com',
        phoneNumber: '+91 99130 52231',
        age: 22,
        gender: 'Male',
        relation: 'Brother',
        user: user._id,
        society: user.society._id
      },
      {
        name: 'Jane Cooper',
        email: 'jane.cooper@gmail.com',
        phoneNumber: '+91 98765 43210',
        age: 28,
        gender: 'Female',
        relation: 'Sister',
        user: user._id,
        society: user.society._id
      },
      {
        name: 'Robert Fox',
        email: 'robert.fox@gmail.com',
        phoneNumber: '+91 95555 66666',
        age: 45,
        gender: 'Male',
        relation: 'Father',
        user: user._id,
        society: user.society._id
      }
    ];

    for (const memberData of testMembers) {
      const existingMember = await Member.findOne({
        email: memberData.email,
        user: user._id
      });

      if (!existingMember) {
        await Member.create(memberData);
        console.log(`Test member created: ${memberData.name}`);
      }
    }

    // Create test vehicles
    const testVehicles = [
      {
        type: 'Two Wheelers',
        vehicleName: 'Splendor',
        vehicleNumber: 'GJ-5316',
        user: user._id,
        society: user.society._id
      },
      {
        type: 'Four Wheelers',
        vehicleName: 'Fortuner',
        vehicleNumber: 'GJ-1234',
        user: user._id,
        society: user.society._id
      },
      {
        type: 'Two Wheelers',
        vehicleName: 'Honda Activa',
        vehicleNumber: 'GJ-9876',
        user: user._id,
        society: user.society._id
      }
    ];

    for (const vehicleData of testVehicles) {
      const existingVehicle = await Vehicle.findOne({
        vehicleNumber: vehicleData.vehicleNumber,
        user: user._id
      });

      if (!existingVehicle) {
        await Vehicle.create(vehicleData);
        console.log(`Test vehicle created: ${vehicleData.vehicleName}`);
      }
    }

    console.log('Test members and vehicles created successfully');
  } catch (error) {
    console.error('Error creating test members and vehicles:', error);
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

    // Create test data
    const society = await createTestSociety();
    if (!society) {
      throw new Error('Failed to create or find society');
    }

    const user = await createTestUser(society);
    if (!user) {
      throw new Error('Failed to create user');
    }

    await createTestPoll(user);
    await createTestProtocols(user);
    await createTestEvents(user);
    await createTestInvoices(user);
    await createTestMembersAndVehicles(user);
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

module.exports = initializeDb; 