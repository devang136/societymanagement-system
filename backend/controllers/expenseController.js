const expenseService = require('../services/expenseService');

// Create Expense
exports.createExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
        const billFile = req.file ? req.file.filename : null;

        const expense = await expenseService.createExpense({
            title,
            description,
            date,
            amount,
            billFile,
            userId: req.user.id
        });

        res.status(201).json({ message: 'Expense created successfully', expense });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getExpenses(req.user.id);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

// Update Expense
exports.updateExpense = async (req, res) => {
    try {
        const { title, description, date, amount } = req.body;
        const billFile = req.file ? req.file.filename : null;

        const expense = await expenseService.updateExpense(req.params.id, {
            title,
            description,
            date,
            amount,
            billFile
        });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        const success = await expenseService.deleteExpense(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

// View Single Expense
exports.viewExpense = async (req, res) => {
    try {
        const expense = await expenseService.viewExpense(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to view expense' });
    }
};
