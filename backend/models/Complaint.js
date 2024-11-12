const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintName: { type: String, required: true },
    complainerName: { type: String, required: true },
    description: { type: String, required: true },
    wing: { type: String, required: true },
    unit: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
