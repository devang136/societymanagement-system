const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetailsController');
const auth = require('../middleware/auth');

router.get('/details', auth, personalDetailsController.getPersonalDetails);

module.exports = router; 