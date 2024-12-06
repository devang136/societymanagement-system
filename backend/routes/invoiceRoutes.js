const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

// Get all events
router.get('/events', auth, invoiceController.getEvents);

// Get all invoices
router.get('/all', auth, invoiceController.getInvoices);

// Get maintenance invoices
router.get('/maintenance', auth, invoiceController.getMaintenanceInvoices);

// Get event invoices
router.get('/event', auth, invoiceController.getEventInvoices);

// Create invoice
router.post('/create', auth, invoiceController.createInvoice);

// Download invoice
router.get('/download/:invoiceId', auth, invoiceController.downloadInvoice);

module.exports = router; 