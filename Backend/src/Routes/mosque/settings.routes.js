const express = require("express");
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

const {
  createSettingsController,
  updateSettingsController,
} = require("../../Controllers/mosque/settings.controller");
const {
  updateSettingsValidation,
  createSettingsValidation,
} = require("../../validators/mosque/mosque_settings.joi");

const MosqueSettingsRoutes = express.Router();

MosqueSettingsRoutes.route("/test").post(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  createSettingsValidation,
  createSettingsController
);

MosqueSettingsRoutes.route("/community").put(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN),
  CheckMosquePermissions(UPDATE),
  updateSettingsValidation,
  updateSettingsController
);
module.exports = MosqueSettingsRoutes;
