// services/announcementService.js
const Announcement = require('../models/');
const AppError = require('../utils/errorHelper').AppError;

// Get all announcements
const getAllAnnouncements = async () => {
  try {
    return await Announcement.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new AppError('Error fetching announcements', 500);
  }
};

// Create a new announcement
const createAnnouncement = async (announcementData) => {
  try {
    const announcement = new Announcement(announcementData);
    return await announcement.save();
  } catch (error) {
    throw new AppError('Error creating announcement', 400);
  }
};

// Update an existing announcement
const updateAnnouncement = async (id, updateData) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(id, updateData, { new: true });
    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }
    return announcement;
  } catch (error) {
    throw new AppError('Error updating announcement', 400);
  }
};

// Delete an announcement
const deleteAnnouncement = async (id) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      throw new AppError('Announcement not found', 404);
    }
    return { message: 'Announcement deleted' };
  } catch (error) {
    throw new AppError('Error deleting announcement', 500);
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
