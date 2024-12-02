require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const complaintRoutes = require('./routes/complaintRoutes');
const pollRoutes = require('./routes/pollRoutes');
const authRoutes = require('./routes/authRoutes');
const initializeDb = require('./utils/initDb');
const securityProtocolRoutes = require('./routes/securityProtocolRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const personalDetailsRoutes = require('./routes/personalDetailsRoutes');

// Import models
require('./models');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/society-management')
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    try {
      await initializeDb();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/security-protocols', securityProtocolRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/personal', personalDetailsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
        server.close();
        startServer(PORT + 1);
      } else {
        console.error('Server error:', error);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;
