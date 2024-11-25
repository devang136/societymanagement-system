const express = require('express');
const { body } = require('express-validator');
const financialController = require('../controllers/financialController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Validation middleware
const maintenanceValidation = [
  body('residentId').notEmpty(),
  body('amount').isNumeric(),
  body('dueDate').isISO8601().toDate()
];

const incomeValidation = [
  body('title').notEmpty().trim(),
  body('amount').isNumeric(),
  body('date').isISO8601().toDate(),
  body('category').isIn(['maintenance', 'rental', 'parking', 'other'])
];

const expenseValidation = [
  body('title').notEmpty().trim(),
  body('amount').isNumeric(),
  body('date').isISO8601().toDate(),
  body('category').isIn(['utilities', 'maintenance', 'repairs', 'staff', 'other'])
];

// Maintenance Routes
router
  .route('/maintenance')
  .get(financialController.getAllMaintenance)
  .post(authorize('admin'), maintenanceValidation, financialController.createMaintenance);

router
  .route('/maintenance/:id')
  .get(financialController.getMaintenanceById)
  .put(authorize('admin'), maintenanceValidation, financialController.updateMaintenance)
  .delete(authorize('admin'), financialController.deleteMaintenance);

// Income Routes
router
  .route('/income')
  .get(financialController.getAllIncome)
  .post(authorize('admin'), incomeValidation, financialController.createIncome);

router
  .route('/income/:id')
  .get(financialController.getIncomeById)
  .put(authorize('admin'), incomeValidation, financialController.updateIncome)
  .delete(authorize('admin'), financialController.deleteIncome);

// Expense Routes
router
  .route('/expenses')
  .get(financialController.getAllExpenses)
  .post(authorize('admin'), expenseValidation, financialController.createExpense);

router
  .route('/expenses/:id')
  .get(financialController.getExpenseById)
  .put(authorize('admin'), expenseValidation, financialController.updateExpense)
  .delete(authorize('admin'), financialController.deleteExpense);

module.exports = router;