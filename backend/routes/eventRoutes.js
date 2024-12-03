const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import event controller (you'll need to create this)
const eventController = require('../controllers/eventController');

// Event routes
router.post('/', auth, eventController.createEvent);
router.get('/', auth, eventController.getEvents);
router.get('/:id', auth, eventController.getEventById);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router; 