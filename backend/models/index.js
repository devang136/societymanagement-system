const mongoose = require('mongoose');

// Import models in correct order
require('./Society');
require('./User');
require('./Poll');
require('./Complaint');
require('./SecurityProtocol');
require('./Event');
require('./Invoice');
require('./Member');
require('./Vehicle');

// Export models
module.exports = {
  Society: mongoose.model('Society'),
  User: mongoose.model('User'),
  Poll: mongoose.model('Poll'),
  Complaint: mongoose.model('Complaint'),
  SecurityProtocol: mongoose.model('SecurityProtocol'),
  Event: mongoose.model('Event'),
  Invoice: mongoose.model('Invoice'),
  Member: mongoose.model('Member'),
  Vehicle: mongoose.model('Vehicle')
}; 