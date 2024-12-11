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
const dashboardRoutes = require('./routes/dashboardRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const userRoutes = require('./routes/userRoutes');

// Import models
require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://societymanagement-system.onrender.com', 'http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/security-protocols', securityProtocolRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/personal', personalDetailsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', require('./routes/expenses'));

const startServer = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://parth160:123@cluster0.54rkf.mongodb.net/DashStack';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    try {
      await initializeDb();
      console.log('Database initialization completed');
    } catch (initError) {
      console.error('Database initialization failed:', initError);
      // Continue running the server even if initialization fails
    }

    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Don't exit the process, just log the error
});

startServer();

module.exports = app;
