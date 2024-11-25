const express = require('express');
const router = express.Router();
const securityGuardController = require('../controllers/securityGuardController');

// Route to get all security guards
router.get('/get', securityGuardController.getAllSecurityGuards);

// Route to get a single security guard by ID
router.get('/:id', securityGuardController.getSecurityGuardById);

// Route to create a new security guard
router.post('/post', securityGuardController.createSecurityGuard);

// Route to update a security guard by ID
router.put('/:id', securityGuardController.updateSecurityGuard);

// Route to delete a security guard by ID
router.delete('/:id', securityGuardController.deleteSecurityGuard);

module.exports = router;
