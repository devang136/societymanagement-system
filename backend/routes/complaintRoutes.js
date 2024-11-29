const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/', complaintController.getAllComplaints);
router.post('/add', complaintController.createComplaint);
router.get('/:id', complaintController.getComplaint);
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
