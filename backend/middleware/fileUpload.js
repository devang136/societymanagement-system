const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for local file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create upload directory if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Cloudinary upload utility
const uploadToCloudinary = async (filePath, folder) => {
    return await cloudinary.uploader.upload(filePath, { folder });
};

// Middleware to handle Cloudinary uploads after saving locally
const handleFileUpload = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const filePath = req.file.path;
        const result = await uploadToCloudinary(filePath, 'expenses');
        req.file.cloudinaryUrl = result.secure_url;

        // Remove the local file after uploading to Cloudinary
        fs.unlinkSync(filePath);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { upload, handleFileUpload };
