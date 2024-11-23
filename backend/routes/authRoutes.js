const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.loginUser);
router.post('/forgot-password/send-otp', authController.sendOTP);
router.post('/forgot-password/verify-otp', authController.verifyOTP);
router.post('/forgot-password/reset', authController.resetPassword);
module.exports = router;