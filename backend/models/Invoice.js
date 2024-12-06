const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: false
  },
  ownerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  billDate: {
    type: Date,
    required: true
  },
  paymentDate: Date,
  maintenanceAmount: {
    type: Number,
    required: true
  },
  penaltyAmount: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema); 