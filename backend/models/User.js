const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('./Society');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  society: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
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
  role: {
    type: String,
    enum: ['admin', 'user', 'security'],
    default: 'user'
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, { 
  timestamps: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
