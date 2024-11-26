const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Facility name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Facility type is required'],
        enum: ['Gym', 'Swimming Pool', 'Park', 'Community Hall', 'Other']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required']
    },
    status: {
        type: String,
        enum: ['Available', 'Under Maintenance', 'Reserved'],
        default: 'Available'
    },
    description: {
        type: String,
        trim: true
    },
    maintenanceSchedule: {
        lastMaintenance: Date,
        nextMaintenance: Date
    },
    bookingFee: {
        type: Number,
        default: 0
    },
    rules: [{
        type: String
    }],
    amenities: [{
        type: String
    }],
    images: [{
        type: String  // URLs to facility images
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add indexes for common queries
facilitySchema.index({ name: 1 });
facilitySchema.index({ type: 1 });
facilitySchema.index({ status: 1 });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
