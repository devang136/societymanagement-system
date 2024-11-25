// controllers/securityGuardController.js
const SecurityGuard = require('../models/SecurityGuard');

// Get all security guards
exports.getAllSecurityGuards = async (req, res) => {
    try {
        const guards = await SecurityGuard.find();
        res.json(guards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific security guard by ID
exports.getSecurityGuardById = async (req, res) => {
    try {
        const guard = await SecurityGuard.findById(req.params.id);
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        res.json(guard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new security guard
exports.createSecurityGuard = async (req, res) => {
    const { name, number, gender, shift, shiftDate, shiftTime, aadharCard } = req.body;
    const guard = new SecurityGuard({ name, number, gender, shift, shiftDate, shiftTime, aadharCard });

    try {
        const newGuard = await guard.save();
        res.status(201).json(newGuard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a security guard by ID
exports.updateSecurityGuard = async (req, res) => {
    try {
        const updatedGuard = await SecurityGuard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGuard) return res.status(404).json({ message: 'Guard not found' });
        res.json(updatedGuard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a security guard by ID
exports.deleteSecurityGuard = async (req, res) => {
    try {
        const guard = await SecurityGuard.findByIdAndDelete(req.params.id);
        if (!guard) return res.status(404).json({ message: 'Guard not found' });
        res.json({ message: 'Guard deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
