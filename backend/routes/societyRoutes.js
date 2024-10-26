const express = require('express');
const router = express.Router();
const societyController = require('../controllers/societyController');
const auth = require('../middleware/auth');

router.post('/', auth, societyController.createSociety);
router.get('/', societyController.getAllSocieties);
router.get('/:id', societyController.getSocietyById);
router.put('/:id', auth, societyController.updateSociety);
router.delete('/:id', auth, societyController.deleteSociety);

module.exports = router;