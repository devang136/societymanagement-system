const mongoose = require('mongoose');

const securityProtocolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Emergency', 'Daily', 'Visitor', 'Maintenance', 'Other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Under Review', 'Archived'],
    default: 'Active'
  },
  society: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SecurityProtocol', securityProtocolSchema); 