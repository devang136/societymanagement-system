const express = require('express');
const router = express.Router();
const securityProtocolController = require('../controllers/securityProtocolController');
const auth = require('../middleware/auth');

router.get('/all', auth, securityProtocolController.getProtocols);
router.post('/create', auth, securityProtocolController.createProtocol);

module.exports = router; 