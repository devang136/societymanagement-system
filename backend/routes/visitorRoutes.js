// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Create test visitors
const createTestVisitors = async () => {
  try {
    // Wait a bit to ensure test users are created
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // First get a security user to use as approvedBy
    const security = await User.findOne({ role: 'security' });
    const resident = await User.findOne({ role: 'resident' });

    if (!security || !resident) {
      console.log('Waiting for security and resident users to be created...');
      return; // Exit gracefully instead of throwing error
    }

    const testVisitors = [
      {
        name: 'Evelyn Harper',
        phone: '9785212359',
        hostResident: resident._id,
        hostUnit: {
          building: 'A',
          number: '101'
        },
        status: 'checked_in',
        approvedBy: security._id,
        notes: 'Regular visitor'
      },
      {
        name: 'Wade Warren',
        phone: '9789225893',
        hostResident: resident._id,
        hostUnit: {
          building: 'B',
          number: '202'
        },
        status: 'checked_in',
        approvedBy: security._id,
        notes: 'Maintenance work'
      }
    ];

    await Visitor.deleteMany({}); // Clear existing test data
    await Visitor.insertMany(testVisitors);
    console.log('Test visitors created successfully');
  } catch (error) {
    console.error('Error creating test visitors:', error);
  }
};

// Create test data after a delay to ensure other test data is created first
setTimeout(createTestVisitors, 2000);

// Get all visitors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new visitor
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, hostUnit, notes } = req.body;

    const visitor = new Visitor({
      name,
      phone,
      hostUnit,
      purpose: 'General Visit',
      status: 'checked_in',
      notes: notes || '',
      createdAt: new Date()
    });

    const savedVisitor = await visitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    console.error('Error creating visitor:', error);
    res.status(400).json({ 
      message: 'Failed to create visitor',
      error: error.message 
    });
  }
});

module.exports = router;
