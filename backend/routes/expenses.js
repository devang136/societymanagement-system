const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Adjust path as needed
const { protect,  } = require('../middleware/authMiddleware');
const { createExpense,getExpenses,deleteExpense,updateExpense,viewExpense } = require('../controllers/expenseController');

router.post(
    '/create',
    protect,
    upload.single('bill'), // Ensure 'bill' matches the frontend form's field name
    createExpense
);
router.get('/', protect,  getExpenses);
router.put('/update/:id', protect, upload.single('bill'), updateExpense);
router.delete('/delete/:id', protect, deleteExpense);
router.get('/:id', protect,  viewExpense);

module.exports = router;
