const express = require('express');
const router = express.Router();
const {
    getResidents,
    createResident,
    updateResident,
    deleteResident
} = require('../controllers/residentController');

router.get('/', getResidents);
router.post('/', createResident);
router.put('/:id', updateResident);
router.delete('/:id', deleteResident);

module.exports = router;
