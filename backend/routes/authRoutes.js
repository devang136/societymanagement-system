const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const Society = require('../models/Society');
const User = require('../models/User');

// Auth routes
router.post('/register', authController.register);
router.post('/login', async (req, res, next) => {
  console.log('Login attempt:', req.body);
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error('Login route error:', error);
    next(error);
  }
});

// Get societies route
router.get('/societies', async (req, res) => {
  try {
    const societies = await Society.find().select('name');
    res.json({ data: societies.map(s => s.name) });
  } catch (error) {
    console.error('Error fetching societies:', error);
    res.status(500).json({ message: 'Error fetching societies' });
  }
});

// Add this route for debugging purposes
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;