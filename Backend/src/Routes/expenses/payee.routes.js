const express = require("express");
const PayeeRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
const payeeValidations = require("../../validators/expenses/payee.joi");
const {
  createPayeeController,
  getAllPayeesController,
  getPayeeByIdController,
  updatePayeeController,
  deletePayeeController,
} = require("../../Controllers/expenses/payee.controller");

PayeeRoutes.route("/create-new-payee").post(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  payeeValidations.createPayeeValidation,
  createPayeeController
);

PayeeRoutes.route("/payees").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  payeeValidations.allPayeesValidation,
  getAllPayeesController
);

PayeeRoutes.route("/:payeeId")
  .get(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    getPayeeByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    payeeValidations.updatePayeeValidation,
    updatePayeeController
  )
  .delete(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    deletePayeeController
  );

module.exports = PayeeRoutes;
