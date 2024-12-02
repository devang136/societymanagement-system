const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');

router.post('/create', auth, complaintController.createComplaint);
router.get('/all', auth, complaintController.getComplaints);
router.put('/:id', auth, complaintController.updateComplaint);
router.delete('/:id', auth, complaintController.deleteComplaint);

module.exports = router;
