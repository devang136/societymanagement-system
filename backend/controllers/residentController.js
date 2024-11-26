const residentService = require('../services/residentService');

exports.getResidents = async (req, res) => {
    try {
        const residents = await residentService.getAllResidents();
        res.json(residents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createResident = async (req, res) => {
    try {
        const newResident = await residentService.createResident(req.body);
        res.status(201).json(newResident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateResident = async (req, res) => {
    try {
        const updatedResident = await residentService.updateResident(req.params.id, req.body);
        if (!updatedResident) {
            return res.status(404).json({ message: 'Resident not found' });
        }
        res.json(updatedResident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteResident = async (req, res) => {
    try {
        const deletedResident = await residentService.deleteResident(req.params.id);
        if (!deletedResident) {
            return res.status(404).json({ message: 'Resident not found' });
        }
        res.json({ message: 'Resident deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
