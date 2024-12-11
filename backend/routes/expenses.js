const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { 
    createExpense, 
    getExpenses, 
    deleteExpense, 
    updateExpense, 
    viewExpense 
} = require('../controllers/expenseController');

// Create expense route
router.post('/create', protect, upload.single('bill'), createExpense);

// Get all expenses
router.get('/', protect, getExpenses);

// Update expense
router.put('/update/:id', protect, upload.single('bill'), updateExpense);

// Delete expense
router.delete('/delete/:id', protect, deleteExpense);

// Get single expense
router.get('/:id', protect, viewExpense);

module.exports = router;
