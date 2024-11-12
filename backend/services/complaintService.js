const Complaint = require('../models/Complaint');

exports.createComplaint = async (data) => {
  const complaint = new Complaint(data);
  return await complaint.save();
};

exports.getComplaintById = async (id) => {
  return await Complaint.findById(id);
};

exports.updateComplaintStatus = async (id, status) => {
  return await Complaint.findByIdAndUpdate(id, { status }, { new: true });
};

exports.getAllComplaints = async () => {
  return await Complaint.find();
};
    