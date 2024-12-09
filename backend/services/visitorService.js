// services/visitorService.js
const Visitor = require('../models/visitor');
const AppError = require('../utils/errorHelper').AppError;

// Get all visitors
const getAllVisitors = async () => {
  try {
    return await Visitor.find().sort({ entryTime: -1 });
  } catch (error) {
    throw new AppError('Error fetching visitors', 500);
  }
};

// Create a new visitor entry
const createVisitor = async (visitorData) => {
  try {
    const visitor = new Visitor(visitorData);
    return await visitor.save();
  } catch (error) {
    throw new AppError('Error creating visitor entry', 400);
  }
};

// Update an existing visitor entry
const updateVisitor = async (id, updateData) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(id, updateData, { new: true });
    if (!visitor) {
      throw new AppError('Visitor not found', 404);
    }
    return visitor;
  } catch (error) {
    throw new AppError('Error updating visitor entry', 400);
  }
};

// Delete a visitor entry
const deleteVisitor = async (id) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(id);
    if (!visitor) {
      throw new AppError('Visitor not found', 404);
    }
    return { message: 'Visitor deleted' };
  } catch (error) {
    throw new AppError('Error deleting visitor entry', 500);
  }
};

module.exports = {
  getAllVisitors,
  createVisitor,
  updateVisitor,
  deleteVisitor
};
