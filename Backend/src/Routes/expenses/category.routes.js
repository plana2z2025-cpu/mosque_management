const express = require("express");
const ExpenseCategoryRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
  CheckMosqueAuthorization,
  CheckMosquePermissions,
} = require("../../Middlewares/Auth.middleware");
const {
  SUPPER_ADMIN,
  ADMIN,
  SUB_USER,
  READ,
  CREATE,
  DELETE,
  UPDATE,
} = require("../../Constants/roles.constants");
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
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  categoryValidations.createExpenseCategoryValidation,
  createExpenseCategoryController
);

ExpenseCategoryRoutes.route("/categories").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  categoryValidations.getAllExpenseCategoriesValidation,
  getAllExpenseCategoriesController
);

ExpenseCategoryRoutes.route("/:categoryId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(READ),
    getExpenseCategoryByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(UPDATE),
    categoryValidations.updateExpenseCategoryValidation,
    updateExpenseCategoryController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(DELETE),
    deleteExpenseCategoryController
  );

ExpenseCategoryRoutes.route("/categories/all/names").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  getAllExpenseCategoryNamesController
);

module.exports = ExpenseCategoryRoutes;
