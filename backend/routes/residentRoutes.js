const express = require('express');
const { validateResident } = require('../middleware/validators');
const { getResidents, createResident, updateResident, deleteResident } = require('../controllers/residentController');

const router = express.Router();
router.get('/', getResidents);
router.post('/', validateResident, createResident);
router.put('/:id', validateResident, updateResident);
router.delete('/:id', deleteResident);

module.exports = router;
