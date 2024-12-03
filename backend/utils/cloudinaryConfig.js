const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnig1wwzx', 
    api_key: '735686878754356', 
    api_secret: 'MyApiKey'
});

module.exports = cloudinary;
