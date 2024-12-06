const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Debug route - remove in production
router.get('/debug', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'firstName lastName');
    res.json({
      count: events.length,
      events: events.map(e => ({
        id: e._id,
        title: e.title,
        date: e.date,
        society: e.society,
        organizer: e.organizer ? `${e.organizer.firstName} ${e.organizer.lastName}` : 'Unknown'
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use(auth);

router.get('/', eventController.getEvents);
router.post('/create', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.post('/:id/join', eventController.joinEvent);

module.exports = router; 