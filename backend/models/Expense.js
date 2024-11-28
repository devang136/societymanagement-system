const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    billFormat: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

module.exports = Expense;
