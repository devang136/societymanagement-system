require('dotenv').config();
const express = require('express');
const http = require('http'); // For creating the server
const { Server } = require('socket.io'); // For WebSocket functionality
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const residentRoutes = require('./routes/residentRoutes');
const financialRoutes = require('./routes/financialRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
// const securityRoutes = require('./routes/securityRoutes');
const securityGuardRoutes = require('./routes/securityGuard');
// const reservationRoutes = require('./routes/reservationRoutes');
const societyRoutes = require("./routes/societyRoutes");
const expenseRoutes = require('./routes/expenses');
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Replace '*' with your frontend URL in production
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/security', securityGuardRoutes);
app.use('/api/guards', securityGuardRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/api/notes", noteRoutes);
// app.use('/api/reservations', reservationRoutes);

// Chat-related in-memory storage (Replace with a database like MongoDB in production)
let messages = [];

// Real-time WebSocket connection (Socket.io)
const chatNamespace = io.of('/chat');  // Custom namespace

chatNamespace.on('connection', (socket) => {
  console.log('A user connected to chat namespace:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected from chat namespace:', socket.id);
  });
});
// Create an HTTP POST endpoint to send messages
app.post('/send-message', (req, res) => {
  const { username, message } = req.body;

  // Validate input
  if (!username || !message) {
    return res.status(400).json({ error: 'Username and message are required!' });
  }

  const messageData = {
    username: username,
    message: message,
    timestamp: new Date(),
  };

  // Emit message via Socket.io to all connected clients
  io.emit('newMessage', messageData);

  // Send success response
  res.status(200).json({ message: 'Message sent!', data: messageData });
});

// Real-time WebSocket connection (Socket.io)
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
});
// to check when a client sends a message:

io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    console.log('Message received from client:', data);
  });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to the database:', error);
    process.exit(1);
  });

  