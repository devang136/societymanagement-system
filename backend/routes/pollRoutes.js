const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const auth = require('../middleware/auth');

router.post('/create', auth, pollController.createPoll);
router.get('/all', auth, pollController.getPolls);
router.post('/:pollId/vote', auth, pollController.votePoll);
router.get('/user-polls', auth, pollController.getUserPolls);

module.exports = router; 