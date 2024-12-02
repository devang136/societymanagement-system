const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

router.get('/events', auth, invoiceController.getEvents);
router.get('/latest', auth, invoiceController.getInvoice);
router.get('/download/:id', auth, invoiceController.downloadInvoice);

module.exports = router; 