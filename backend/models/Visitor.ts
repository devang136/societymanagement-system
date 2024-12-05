const mongoose = require('mongoose');

// Clear any existing model to prevent schema conflicts
if (mongoose.models.Visitor) {
  delete mongoose.models.Visitor;
}

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v.replace(/\s/g, ''));
      },
      message: 'Please enter a valid 10-digit phone number'
    }
  },
  hostUnit: {
    building: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    }
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);