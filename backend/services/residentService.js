// residentService.js
const Resident = require('../models/Resident');
const cloudinary = require('../utils/cloudinaryConfig');

/**
 * Get all residents
 */
exports.getAllResidents = async () => {
    return await Resident.find();
};

/**
 * Create a new resident with optional document upload to Cloudinary
 */
exports.createResident = async (data, files) => {
    const residentData = { ...data };

    if (files && files.documents) {
        residentData.documents = await Promise.all(
            files.documents.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'resident_documents',
                });
                return {
                    type: 'other', // Can be dynamic if passed in `data`
                    url: result.secure_url,
                    public_id: result.public_id,
                    uploadDate: new Date(),
                };
            })
        );
    }

    const resident = new Resident(residentData);
    return await resident.save();
};

/**
 * Update an existing resident
 */
exports.updateResident = async (id, data, files) => {
    const resident = await Resident.findById(id);
    if (!resident) throw new Error('Resident not found');

    if (files && files.documents) {
        const uploadedDocs = await Promise.all(
            files.documents.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'resident_documents',
                });
                return {
                    type: 'other',
                    url: result.secure_url,
                    public_id: result.public_id,
                    uploadDate: new Date(),
                };
            })
        );
        resident.documents.push(...uploadedDocs);
    }

    Object.assign(resident, data);
    return await resident.save();
};

/**
 * Delete a resident and optionally remove their documents from Cloudinary
 */
exports.deleteResident = async (id) => {
    const resident = await Resident.findById(id);
    if (!resident) throw new Error('Resident not found');

    // Optionally delete documents from Cloudinary
    if (resident.documents && resident.documents.length > 0) {
        await Promise.all(
            resident.documents.map(async (doc) => {
                if (doc.public_id) {
                    await cloudinary.uploader.destroy(doc.public_id);
                }
            })
        );
    }

    return await resident.remove();
};
