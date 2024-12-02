// utils/errorHelper.js

// Custom error class to handle operational errors
class AppError extends Error {
  constructor(message, statusCode) {
    if (!statusCode || typeof statusCode !== 'number') {
      throw new Error('Status code must be a valid number');
    }

    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture the stack trace at the point of error creation
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async wrapper to catch errors in async functions
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Set default values for error properties
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  // Send detailed error response in development environment
  if (isDevelopment) {
    res.status(statusCode).json({
      status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Send a simplified error response in production
    res.status(statusCode).json({
      status,
      message: err.isOperational ? err.message : 'Something went wrong',
    });
  }
};

module.exports = {
  AppError,
  catchAsync,
  errorHandler,
};
