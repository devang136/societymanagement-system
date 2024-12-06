const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Poll routes
router.get('/', pollController.getPolls);
router.post('/create', pollController.createPoll);
router.put('/:id', pollController.updatePoll);
router.delete('/:id', pollController.deletePoll);
router.post('/:id/vote', pollController.votePoll);
router.get('/user', pollController.getUserPolls);

module.exports = router; 