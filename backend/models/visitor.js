// models/Visitor.js

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Visitor name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  purpose: {
    type: String,
    default: 'General Visit',
    trim: true
  },
  hostResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: false
  },
  hostUnit: {
    building: {
      type: String,
      required: [true, 'Building number/name is required']
    },
    number: {
      type: String,
      required: [true, 'Unit number is required']
    }
  },
  status: {
    type: String,
    enum: ['checked_in', 'checked_out'],
    default: 'checked_in'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  date: {
    type: String,
    required: true
  },
  entryTime: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);