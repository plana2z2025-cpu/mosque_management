const express = require("express");
const ExpenseGraphRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
  CheckMosqueAuthorization,
  CheckMosquePermissions,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER, READ } = require("../../Constants/roles.constants");

const {
  expenseGraphController,
  expensePayeeGraphController,
} = require("../../Controllers/expenses/graphexpense.controller");

ExpenseGraphRoutes.route("/dashboard").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  expenseGraphController
);
ExpenseGraphRoutes.route("/payee/:payeeId").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  expensePayeeGraphController
);
module.exports = ExpenseGraphRoutes;
