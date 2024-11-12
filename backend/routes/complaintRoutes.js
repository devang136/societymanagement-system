const express = require('express');
const complaintController = require('../controllers/complaintController');

const router = express.Router();

router.post('/add', complaintController.createComplaint);
router.get('/:id', complaintController.getComplaint);

module.exports = router;
