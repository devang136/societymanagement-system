const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/me', userController.getPersonalDetails);
router.put('/me', userController.updatePersonalDetails);
router.post('/change-password', userController.changePassword);

module.exports = router; 