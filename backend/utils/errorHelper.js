// Custom error class to handle operational errors

// utils/errorHelper.js
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = { AppError };
  

// class AppError extends Error {
//     constructor(message, statusCode) {
//       super(message);
  
//       // Ensure `statusCode` is a valid number
//       if (!statusCode || typeof statusCode !== 'number') {
//         throw new Error('Status code must be a valid number');
//       }
  
//       this.statusCode = statusCode;
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//       this.isOperational = true;
  
//       // Capture the stack trace to the current position in the code
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

  
  // Async wrapper to catch errors in async functions
  const catchAsync = (fn) => {
    return (req, res, next) => {
      // Return a resolved promise and catch any errors to forward to error handler
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  
  // Global error handler middleware
  const errorHandler = (err, req, res, next) => {
    // Default error handling values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // Set the response for different environments (development vs production)
    if (process.env.NODE_ENV === 'development') {
      // Development: detailed error info including stack trace
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
    } else {
      // Production: Hide detailed error info to avoid leaking sensitive data
      res.status(err.statusCode).json({
        status: err.status,
        message: err.isOperational ? err.message : 'Something went wrong'
      });
    }
  };
  
  module.exports = {
    AppError,
    catchAsync,
    errorHandler
  };
  