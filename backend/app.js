const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/complaints', complaintRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://parth160:123@cluster0.54rkf.mongodb.net/DashStack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 