const { validationResult } = require('express-validator');
const financialService = require('../services/financialService');
const { catchAsync } = require('../utils/errorHelper');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Maintenance Controllers
exports.getAllMaintenance = catchAsync(async (req, res) => {
  const maintenance = await financialService.getAllMaintenance();
  successResponse(res, maintenance, 'Maintenance records retrieved successfully');
});

exports.getMaintenanceById = catchAsync(async (req, res) => {
  const maintenance = await financialService.getMaintenanceById(req.params.id);
  successResponse(res, maintenance, 'Maintenance record retrieved successfully');
});

exports.createMaintenance = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const maintenance = await financialService.createMaintenance(req.body);
  successResponse(res, maintenance, 'Maintenance record created successfully', 201);
});

exports.updateMaintenance = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const maintenance = await financialService.updateMaintenance(req.params.id, req.body);
  successResponse(res, maintenance, 'Maintenance record updated successfully');
});

exports.deleteMaintenance = catchAsync(async (req, res) => {
  await financialService.deleteMaintenance(req.params.id);
  successResponse(res, null, 'Maintenance record deleted successfully');
});

// Income Controllers
exports.getAllIncome = catchAsync(async (req, res) => {
  const income = await financialService.getAllIncome();
  successResponse(res, income, 'Income records retrieved successfully');
});

exports.getIncomeById = catchAsync(async (req, res) => {
  const income = await financialService.getIncomeById(req.params.id);
  successResponse(res, income, 'Income record retrieved successfully');
});

exports.createIncome = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const income = await financialService.createIncome(req.body);
  successResponse(res, income, 'Income record created successfully', 201);
});

exports.updateIncome = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const income = await financialService.updateIncome(req.params.id, req.body);
  successResponse(res, income, 'Income record updated successfully');
});

exports.deleteIncome = catchAsync(async (req, res) => {
  await financialService.deleteIncome(req.params.id);
  successResponse(res, null, 'Income record deleted successfully');
});

// Expense Controllers
exports.getAllExpenses = catchAsync(async (req, res) => {
  const expenses = await financialService.getAllExpenses();
  successResponse(res, expenses, 'Expense records retrieved successfully');
});

exports.getExpenseById = catchAsync(async (req, res) => {
  const expense = await financialService.getExpenseById(req.params.id);
  successResponse(res, expense, 'Expense record retrieved successfully');
});

exports.createExpense = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const expense = await financialService.createExpense(req.body);
  successResponse(res, expense, 'Expense record created successfully', 201);
});

exports.updateExpense = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation Error', 400, errors.array());
  }

  const expense = await financialService.updateExpense(req.params.id, req.body);
  successResponse(res, expense, 'Expense record updated successfully');
});

exports.deleteExpense = catchAsync(async (req, res) => {
  await financialService.deleteExpense(req.params.id);
  successResponse(res, null, 'Expense record deleted successfully');
});