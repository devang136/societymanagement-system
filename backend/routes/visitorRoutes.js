// routes/visitorRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getVisitors,
  createVisitor,
  updateVisitor,
  deleteVisitor
} = require('../controllers/visitorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Visitor Validation Middleware
const visitorValidation = [
  body('name').notEmpty().trim().withMessage('Visitor name is required'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Phone number must be a valid 10-digit number'),
  body('purpose').notEmpty().trim().withMessage('Purpose of visit is required'),
  body('hostResident').notEmpty().withMessage('Host resident information is required'),
  body('hostUnit.building').notEmpty().withMessage('Building name is required'),
  body('hostUnit.number').notEmpty().withMessage('Unit number is required'),
  body('vehicle.type').optional().isIn(['car', 'bike', 'other', 'none']).withMessage('Invalid vehicle type'),
  body('vehicle.number').optional().notEmpty().withMessage('Vehicle number is required when vehicle type is provided'),
  body('idProof.type').notEmpty().withMessage('ID proof type is required'),
  body('idProof.number').notEmpty().withMessage('ID proof number is required'),
  body('approvedBy').notEmpty().withMessage('Approval information is required'),
];

// Apply authentication middleware to all routes
router.use(protect);

// Routes for visitors
router
  .route('/')
  .get(getVisitors)  // Get all visitors
  .post(authorize('admin', 'security'), visitorValidation, createVisitor);  // Create a new visitor

router
  .route('/:id')
  .put(authorize('admin', 'security'), visitorValidation, updateVisitor)  // Update visitor
  .delete(authorize('admin', 'security'), deleteVisitor);  // Delete visitor

module.exports = router;
