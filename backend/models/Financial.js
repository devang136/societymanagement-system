const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Maintenance amount is required']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  paidStatus: {
    type: Boolean,
    default: false
  },
  paidDate: {
    type: Date
  }
}, { timestamps: true });

const incomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    enum: ['maintenance', 'rental', 'parking', 'other'],
    required: true
  }
}, { timestamps: true });

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  receiptImage: {
    type: String
  },
  category: {
    type: String,
    enum: ['utilities', 'maintenance', 'repairs', 'staff', 'other'],
    required: true
  }
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
const Income = mongoose.model('Income', incomeSchema);
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = { Maintenance, Income, Expense };