const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');

exports.createComplaint = async (complaintData) => {
  try {
    console.log('Creating complaint with data:', complaintData);
    const complaint = new Complaint(complaintData);
    const savedComplaint = await complaint.save();
    console.log('Saved complaint:', savedComplaint);
    return savedComplaint;
  } catch (error) {
    console.error('Error saving complaint:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      throw new Error(`Validation failed: ${messages.join(', ')}`);
    }
    throw error;
  }
};

exports.getAllComplaints = async () => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    console.log('Retrieved complaints:', complaints);
    return complaints;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

exports.getComplaintById = async (id) => {
  try {
    return await Complaint.findById(id);
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

exports.deleteComplaint = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid complaint ID');
    }
    console.log('Service: Deleting complaint with ID:', id);
    const result = await Complaint.findByIdAndDelete(id);
    console.log('Service: Delete result:', result);
    return result;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
    