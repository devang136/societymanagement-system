const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Option text is required'] 
  },
  votes: { 
    type: Number, 
    default: 0 
  },
  voters: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }]
});

const pollSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: [true, 'Question is required'],
    trim: true
  },
  pollType: {
    type: String,
    enum: ['Ranking polls', 'Multichoice polls', 'Rating polls', 'Numeric polls', 'Text polls'],
    required: [true, 'Poll type is required']
  },
  options: [optionSchema],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'Creator is required']
  },
  society: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: [true, 'Society is required']
  },
  endDate: Date,
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Poll', pollSchema); 