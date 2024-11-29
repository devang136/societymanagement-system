const express = require('express');
const multer = require('multer');
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Example custom middleware
const protect = (req, res, next) => {
    console.log('Protect middleware triggered');
    next(); // Pass control to the next middleware
};

app.use(protect);

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define upload folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Route using multer middleware
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});
