const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("A token is required for authentication");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.user = decoded;
        next();
    });
};
// authMiddleware.js
// const User = require('../models/User');
const AppError = require('../utils/errorHelper').AppError;

// Protect middleware to check if the user is authenticated
const protect = async (req, res, next) => {
  let token;
  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the decoded JWT payload
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      next(new AppError('Not authorized to access this route', 401));
    }
  }

  // If no token provided
  if (!token) {
    next(new AppError('Not authorized to access this route', 401));
  }
};

// Authorization middleware to restrict access based on roles
const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }
      next();
    };
  };

module.exports = {
  protect,
  authorize
};
