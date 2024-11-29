const Complaint = require('../models/Complaint');

exports.createComplaint = async (complaintData) => {
  try {
    const complaint = new Complaint(complaintData);
    return await complaint.save();
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

exports.getAllComplaints = async () => {
  try {
    return await Complaint.find().sort({ requestDate: -1 });
  } catch (error) {
    console.error('Service error:', error);
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
    return await Complaint.findByIdAndDelete(id);
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
    