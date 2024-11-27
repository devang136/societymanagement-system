// errorMiddleware.js

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500; // default to 500 if no status code is set
    const message = err.message || 'Internal Server Error';
  
    // Log error for debugging purposes (optional)
    console.error(err.stack);
  
    // Send error response
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
  };
  
  module.exports = { errorHandler };
  