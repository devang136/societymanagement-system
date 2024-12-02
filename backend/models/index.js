const mongoose = require('mongoose');

// Import models in correct order
require('./Society');
require('./User');
require('./Poll');
require('./Complaint');
require('./SecurityProtocol');

// Export models
module.exports = {
  Society: mongoose.model('Society'),
  User: mongoose.model('User'),
  Poll: mongoose.model('Poll'),
  Complaint: mongoose.model('Complaint'),
  SecurityProtocol: mongoose.model('SecurityProtocol')
}; 