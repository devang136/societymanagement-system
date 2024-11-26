// controllers/announcementController.js
const announcementService = require('../services/announcementService');

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = await announcementService.createAnnouncement(req.body);
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const updatedAnnouncement = await announcementService.updateAnnouncement(req.params.id, req.body);
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const response = await announcementService.deleteAnnouncement(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
