const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/events', auth, eventController.getEvents);
router.get('/activities', auth, eventController.getActivities);
router.post('/events/:eventId/participate', auth, eventController.participateInEvent);

module.exports = router; 