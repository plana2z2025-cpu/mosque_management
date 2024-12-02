const express = require("express");
const SubUserRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
const {
  createSubUserController,
  getAllSubUsersController,
  getSubUserByIdController,
  deleteSubUserByIdController,
} = require("../../Controllers/users/userMosque.controller");
const subUserValidation = require("../../validators/users/subuser.joi");

SubUserRoutes.route("/create-sub-user").post(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  subUserValidation.createSubUserValidation,
  createSubUserController
);

SubUserRoutes.route("/users").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  getAllSubUsersController
);

SubUserRoutes.route("/:subUserId")
  .get(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    getSubUserByIdController
  )
  .delete(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    deleteSubUserByIdController
  );

module.exports = SubUserRoutes;
