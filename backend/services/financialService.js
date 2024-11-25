const { Maintenance, Income, Expense } = require('../models/Financial');
const { AppError } = require('../utils/errorHelper');

class FinancialService {
  // Maintenance Services
  async getAllMaintenance() {
    return await Maintenance.find().populate('residentId');
  }

  async getMaintenanceById(id) {
    const maintenance = await Maintenance.findById(id).populate('residentId');
    if (!maintenance) {
      throw new AppError('Maintenance record not found', 404);
    }
    return maintenance;
  }

  async createMaintenance(data) {
    return await Maintenance.create(data);
  }

  async updateMaintenance(id, data) {
    const maintenance = await Maintenance.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate('residentId');

    if (!maintenance) {
      throw new AppError('Maintenance record not found', 404);
    }
    return maintenance;
  }

  async deleteMaintenance(id) {
    const maintenance = await Maintenance.findByIdAndDelete(id);
    if (!maintenance) {
      throw new AppError('Maintenance record not found', 404);
    }
    return maintenance;
  }

  // Income Services
  async getAllIncome() {
    return await Income.find();
  }

  async getIncomeById(id) {
    const income = await Income.findById(id);
    if (!income) {
      throw new AppError('Income record not found', 404);
    }
    return income;
  }

  async createIncome(data) {
    return await Income.create(data);
  }

  async updateIncome(id, data) {
    const income = await Income.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!income) {
      throw new AppError('Income record not found', 404);
    }
    return income;
  }

  async deleteIncome(id) {
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      throw new AppError('Income record not found', 404);
    }
    return income;
  }

  // Expense Services
  async getAllExpenses() {
    return await Expense.find();
  }

  async getExpenseById(id) {
    const expense = await Expense.findById(id);
    if (!expense) {
      throw new AppError('Expense record not found', 404);
    }
    return expense;
  }

  async createExpense(data) {
    return await Expense.create(data);
  }

  async updateExpense(id, data) {
    const expense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!expense) {
      throw new AppError('Expense record not found', 404);
    }
    return expense;
  }

  async deleteExpense(id) {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      throw new AppError('Expense record not found', 404);
    }
    return expense;
  }
}

module.exports = new FinancialService();