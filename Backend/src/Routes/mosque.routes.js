const express = require("express");
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../Middlewares/Auth.middleware");
const {
  SUPPER_ADMIN,
  ADMIN,
  SUB_USER,
} = require("../Constants/roles.constants");
const {
  createNewMosqueController,
  getMosquesListController,
  getSingleMosqueDetailController,
  createMosqueEmailValidateController,
  createMosqueSlugValidateController,
  getCommunityMosqueDetailsController,
} = require("../Controllers/mosque.controller");
const ValidateObjectId = require("../Middlewares/validateObjectid.middleware");
const mosqueValidations = require("../validators/mosque.joi");

const MosqueRoutes = express.Router();

MosqueRoutes.route("/create-new").post(
  mosqueValidations.createNewMosqueValidation,
  createNewMosqueController
);
MosqueRoutes.route("/create-new/email-verify/available").post(
  mosqueValidations.createMosqueEmailValidation,
  createMosqueEmailValidateController
);
MosqueRoutes.route("/create-new/slug-verify/available").post(
  mosqueValidations.createMosqueSlugValidation,
  createMosqueSlugValidateController
);

MosqueRoutes.route("/mosques").get(
  Authentication,
  Authorization(SUPPER_ADMIN),
  getMosquesListController
);
MosqueRoutes.route("/mosques/:slug").get(
  Authentication,
  Authorization(SUPPER_ADMIN),
  // ValidateObjectId("mosqueId"),
  getSingleMosqueDetailController
);

// -----------------------------------------------------------------------------
// __TYPE__ : ROOT => ADMIN,MOSQUE-USERS
// -----------------------------------------------------------------------------
MosqueRoutes.route("/community/mosque-detail").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  getCommunityMosqueDetailsController
);

module.exports = MosqueRoutes;
