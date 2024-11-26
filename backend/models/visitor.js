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
    required: [true, 'Purpose of visit is required'],
    trim: true
  },
  hostResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: [true, 'Host resident information is required']
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
  vehicle: {
    type: {
      type: String,
      enum: ['car', 'bike', 'other', 'none'],
      default: 'none'
    },
    number: String
  },
  idProof: {
    type: {
      type: String,
      enum: ['driving_license', 'national_id', 'passport', 'other'],
      required: [true, 'ID proof type is required']
    },
    number: {
      type: String,
      required: [true, 'ID proof number is required']
    }
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['checked_in', 'checked_out', 'overstayed'],
    default: 'checked_in'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: [true, 'Approval information is required']
  },
  temperature: {  // For health screening
    type: Number
  },
  covidScreening: {
    symptoms: { type: Boolean, default: false },
    travelHistory: { type: Boolean, default: false },
    contactWithCovidPatient: { type: Boolean, default: false }
  },
  photo: {
    type: String  // URL to visitor's photo
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

visitorSchema.virtual('duration').get(function() {
  if (!this.exitTime) return null;
  return (this.exitTime - this.entryTime) / (1000 * 60); // Duration in minutes
});

visitorSchema.pre('save', function(next) {
  if (this.exitTime && this.status === 'checked_in') {
    const duration = (this.exitTime - this.entryTime) / (1000 * 60 * 60); // Duration in hours
    if (duration > 24) {
      this.status = 'overstayed';
    }
  }
  next();
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;