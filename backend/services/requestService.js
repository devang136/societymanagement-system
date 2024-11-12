const Request = require('../models/Request');

exports.createRequest = async (data) => {
  const request = new Request(data);
  return await request.save();
};

exports.getRequestById = async (id) => {
  return await Request.findById(id);
};

exports.updateRequestStatus = async (id, status) => {
  return await Request.findByIdAndUpdate(id, { status }, { new: true });
};

exports.getAllRequests = async () => {
  return await Request.find();
};
