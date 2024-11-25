    // models/SecurityGuard.js

const mongoose = require('mongoose');

const SecurityGuardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    shift: {
        type: String,
        required: true,
    },
    shiftDate: {
        type: Date,
        required: true,
    },
    shiftTime: {
        type: String,
        required: true,
    },
    aadharCard: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('SecurityGuard', SecurityGuardSchema);
