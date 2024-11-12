const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.post('/add', requestController.createRequest);
router.get('/:id', requestController.getRequest);

module.exports = router;
