const express = require("express");
const PayeeRoutes = express.Router();
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
const payeeValidations = require("../../validators/expenses/payee.joi");
const {
  createPayeeController,
  getAllPayeesController,
  getPayeeByIdController,
  updatePayeeController,
  deletePayeeController,
  getAllPayeesExpensesController,
} = require("../../Controllers/expenses/payee.controller");

PayeeRoutes.route("/create-new-payee").post(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  payeeValidations.createPayeeValidation,
  createPayeeController
);

PayeeRoutes.route("/payees").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  payeeValidations.allPayeesValidation,
  getAllPayeesController
);

PayeeRoutes.route("/:payeeId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(READ),
    getPayeeByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(UPDATE),
    payeeValidations.updatePayeeValidation,
    updatePayeeController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(DELETE),
    deletePayeeController
  );

PayeeRoutes.route("/:payeeId/expenses").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  getAllPayeesExpensesController
);

module.exports = PayeeRoutes;
