const Facility = require('../models/Facility');

/**
 * Service to fetch all facilities
 * @returns {Promise<Array>} List of facilities
 */
exports.getAllFacilities = async () => {
    return await Facility.find();
};

/**
 * Service to create a new facility
 * @param {Object} facilityData - Data for the new facility
 * @returns {Promise<Object>} The created facility
 */
exports.createFacility = async (facilityData) => {
    const facility = new Facility(facilityData);
    return await facility.save();
};

/**
 * Service to update an existing facility
 * @param {String} id - Facility ID
 * @param {Object} updates - Updates for the facility
 * @returns {Promise<Object|null>} The updated facility or null if not found
 */
exports.updateFacility = async (id, updates) => {
    return await Facility.findByIdAndUpdate(id, updates, { new: true });
};

/**
 * Service to delete a facility
 * @param {String} id - Facility ID
 * @returns {Promise<Object|null>} The deleted facility or null if not found
 */
exports.deleteFacility = async (id) => {
    return await Facility.findByIdAndDelete(id);
};
