const Expense = require('../models/Expense');

// Create Expense
exports.createExpense = async ({ title, description, date, amount, billFile, userId }) => {
    let expense = new Expense({
        title,
        description,
        date,
        amount,
        billFormat: billFile,
        createdBy: userId
    });
    return await expense.save();
};

// Get All Expenses
exports.getExpenses = async (userId) => {
    return await Expense.find({ createdBy: userId });
};

// Update Expense
exports.updateExpense = async (id, { title, description, date, amount, billFile }) => {
    const expenseData = { title, description, date, amount };
    if (billFile) expenseData.billFormat = billFile;
    return await Expense.findByIdAndUpdate(id, expenseData, { new: true });
};

// Delete Expense
exports.deleteExpense = async (id) => {
    const expense = await Expense.findByIdAndDelete(id);
    return !!expense; // Return true if deleted, false otherwise
};

// View Single Expense
exports.viewExpense = async (id) => {
    return await Expense.findById(id);
};
