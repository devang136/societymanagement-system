const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Maintenance', 'Security', 'Cleanliness', 'Other']
  },
  status: {
    type: String,
    enum: ['Open', 'Pending', 'Solved'],
    default: 'Open'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  society: {
    type: String,
    required: true
  },
  wing: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);