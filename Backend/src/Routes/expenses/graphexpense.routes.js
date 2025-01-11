const express = require("express");
const ExpenseGraphRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");

const {
  expenseGraphController,
  expensePayeeGraphController,
} = require("../../Controllers/expenses/graphexpense.controller");

ExpenseGraphRoutes.route("/dashboard").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  expenseGraphController
);
ExpenseGraphRoutes.route("/payee/:payeeId").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  expensePayeeGraphController
);
module.exports = ExpenseGraphRoutes;
