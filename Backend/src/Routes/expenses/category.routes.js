const express = require("express");
const ExpenseCategoryRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
const categoryValidations = require("../../validators/expenses/expenseCategory.joi");
const {
  createExpenseCategoryController,
  deleteExpenseCategoryController,
  getExpenseCategoryByIdController,
  getAllExpenseCategoriesController,
  updateExpenseCategoryController,
  getAllExpenseCategoryNamesController,
} = require("../../Controllers/expenses/expenseCategory.controller");

ExpenseCategoryRoutes.route("/create-new-category").post(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  categoryValidations.createExpenseCategoryValidation,
  createExpenseCategoryController
);

ExpenseCategoryRoutes.route("/categories").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  categoryValidations.getAllExpenseCategoriesValidation,
  getAllExpenseCategoriesController
);

ExpenseCategoryRoutes.route("/:categoryId")
  .get(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    getExpenseCategoryByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    categoryValidations.updateExpenseCategoryValidation,
    updateExpenseCategoryController
  )
  .delete(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    deleteExpenseCategoryController
  );

ExpenseCategoryRoutes.route("/categories/all/names").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  getAllExpenseCategoryNamesController
);

module.exports = ExpenseCategoryRoutes;
