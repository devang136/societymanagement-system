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

// Download invoice
router.get('/download/:id', auth, invoiceController.downloadInvoice);

module.exports = router; 