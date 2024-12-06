const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
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
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'security'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Add index for common queries
userSchema.index({ society: 1, role: 1 });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
