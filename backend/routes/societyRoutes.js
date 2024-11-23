const express = require('express');
const router = express.Router();
const societyController = require('../controllers/societyController');
const authenticate = require('../middleware/auth');

router.post('/', societyController.createSociety);
router.get('/', societyController.getAllSocieties);
router.get('/:id', societyController.getSocietyById);
router.put('/:id', societyController.updateSociety);
router.delete('/:id',  societyController.deleteSociety);

module.exports = router;