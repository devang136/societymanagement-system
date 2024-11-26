// routes/announcementRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Announcement Validation Middleware
const announcementValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('content').notEmpty().trim().withMessage('Content is required'),
  body('category').isIn(['general', 'maintenance', 'emergency', 'event', 'notice', 'other']).withMessage('Invalid category'),
  body('priority').isIn(['low', 'medium', 'high', 'urgent']).optional().withMessage('Invalid priority'),
  body('author').notEmpty().withMessage('Author is required'),
  body('targetAudience').isArray().optional().withMessage('Target audience must be an array')
];

// Apply authentication middleware to all routes
router.use(protect);

// Routes for announcements
router
  .route('/')
  .get(getAnnouncements)  // Get all announcements
  .post(authorize('admin'), announcementValidation, createAnnouncement);  // Create a new announcement

router
  .route('/:id')
  .put(authorize('admin'), announcementValidation, updateAnnouncement)  // Update announcement
  .delete(authorize('admin'), deleteAnnouncement);  // Delete announcement

module.exports = router;
