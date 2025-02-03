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
  bulkUploadRamadanTimingsController,
  getMosqueRamadanTimingsController,
} = require("../../Controllers/ramadan/ramadan_timings.controller");
const {
  bulkUploadTimingsValidation,
} = require("../../validators/mosque/ramadan_timings.joi");

const RamadanTimingsRoutes = express.Router();

RamadanTimingsRoutes.route("/bulk-upload").post(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  bulkUploadTimingsValidation,
  bulkUploadRamadanTimingsController
);

RamadanTimingsRoutes.route("/community").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  getMosqueRamadanTimingsController
);
module.exports = RamadanTimingsRoutes;
