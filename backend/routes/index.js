const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Complaint routes
router.get('/complaints', complaintController.getAllComplaints);
router.post('/complaints/add', complaintController.createComplaint);
router.get('/complaints/:id', complaintController.getComplaint);
router.delete('/complaints/:id', complaintController.deleteComplaint);

module.exports = router; 