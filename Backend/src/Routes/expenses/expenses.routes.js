const express = require("express");
const ExpenseRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
const expenseValidations = require("../../validators/expenses/expense.joi");
const {
  createExpenseController,
  getExpenseByIdController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
} = require("../../Controllers/expenses/expense.controller");

ExpenseRoutes.route("/create-new").post(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  expenseValidations.createExpenseValidation,
  createExpenseController
);

ExpenseRoutes.route("/all").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  expenseValidations.getAllExpensesValidation,
  getAllExpensesController
);

ExpenseRoutes.route("/:expenseId")
  .get(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    getExpenseByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    expenseValidations.updateExpenseValidation,
    updateExpenseController
  )
  .delete(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    deleteExpenseController
  );

module.exports = ExpenseRoutes;
