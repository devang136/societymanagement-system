const facilityService = require('../services/facilityService');

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await facilityService.getAllFacilities();
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFacility = async (req, res) => {
    try {
        const newFacility = await facilityService.createFacility(req.body);
        res.status(201).json(newFacility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFacility = async (req, res) => {
    try {
        const updatedFacility = await facilityService.updateFacility(req.params.id, req.body);
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json(updatedFacility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFacility = async (req, res) => {
    try {
        const deletedFacility = await facilityService.deleteFacility(req.params.id);
        if (!deletedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json({ message: 'Facility deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
