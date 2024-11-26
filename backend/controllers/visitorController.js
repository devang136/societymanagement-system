// controllers/visitorController.js
const visitorService = require('../services/visitorService');

// Get all visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await visitorService.getAllVisitors();
    res.status(200).json(visitors);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Create a new visitor
exports.createVisitor = async (req, res) => {
  try {
    const newVisitor = await visitorService.createVisitor(req.body);
    res.status(201).json(newVisitor);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

// Update a visitor entry
exports.updateVisitor = async (req, res) => {
  try {
    const updatedVisitor = await visitorService.updateVisitor(req.params.id, req.body);
    res.status(200).json(updatedVisitor);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

// Delete a visitor entry
exports.deleteVisitor = async (req, res) => {
  try {
    const response = await visitorService.deleteVisitor(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
