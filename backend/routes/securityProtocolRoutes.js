const express = require('express');
const router = express.Router();
const securityProtocolController = require('../controllers/securityProtocolController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Security protocol routes
router.get('/', securityProtocolController.getProtocols);
router.post('/create', securityProtocolController.createProtocol);
router.put('/:id', securityProtocolController.updateProtocol);
router.delete('/:id', securityProtocolController.deleteProtocol);

module.exports = router; 