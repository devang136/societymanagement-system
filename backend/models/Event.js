const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Cultural', 'Sports', 'Festival', 'Meeting', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  society: {
    type: String,
    required: true,
    index: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxParticipants: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

// Add indexes for common queries
eventSchema.index({ society: 1, date: 1 });
eventSchema.index({ society: 1, status: 1 });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;