const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  relation: { type: String, required: true }
});

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Two Wheelers, Four Wheelers
  name: { type: String, required: true },
  number: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  // Personal Details
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  
  // Address & Society Details
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  society: { type: String, required: true },
  wing: { type: String, required: true },
  unit: { type: String, required: true },
  
  // Owner Details (if user is tenant)
  ownerDetails: {
    name: String,
    phone: String,
    address: String
  },

  // Role and Status
  role: {
    type: String,
    enum: ['admin', 'user', 'security'],
    default: 'user'
  },
  userType: {
    type: String,
    enum: ['owner', 'tenant'],
    required: true
  },
  password: { type: String, required: true },

  // Family Members
  familyMembers: [familyMemberSchema],

  // Vehicles
  vehicles: [vehicleSchema],

  // Documents
  documents: [{
    name: String,
    fileUrl: String,
    fileSize: String,
    fileType: String
  }],

  // Maintenance Details
  maintenanceAmount: { type: Number, default: 0 },
  penaltyAmount: { type: Number, default: 0 }
}, {
  timestamps: true
});

userSchema.index({ society: 1, role: 1 });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
