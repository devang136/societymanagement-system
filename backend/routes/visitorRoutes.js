// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
const Visitor = require('../models/visitor');
const authMiddleware = require('../middleware/auth');

// Get all visitors
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    next(error);
  }
});

// Create a new visitor
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, hostUnit, notes } = req.body;
    const now = new Date();

    const visitor = new Visitor({
      name,
      phone,
      hostUnit,
      purpose: 'General Visit',
      status: 'checked_in',
      notes: notes || '',
      date: now.toLocaleDateString(),
      entryTime: now.toLocaleTimeString(),
      createdAt: now
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
