const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../Middlewares/Auth.middleware");
const { SUPPER_ADMIN, USER } = require("../Constants/roles.contants");
const {
  createNewMosqueController,
  getMosquesListController,
  getSingleMosqueDetailController,
} = require("../Controllers/mosque.controller");
const ValidateObjectId = require("../Middlewares/validateObjectid.middleware");

const MosqueRoutes = express.Router();

MosqueRoutes.route("/create-new").post(createNewMosqueController);

MosqueRoutes.route("/mosques").get(
  Authentication,
  Authorization(SUPPER_ADMIN),
  getMosquesListController
);
MosqueRoutes.route("/mosques/:mosqueId").get(
  Authentication,
  Authorization(SUPPER_ADMIN),
  ValidateObjectId("mosqueId"),
  getSingleMosqueDetailController
);

module.exports = MosqueRoutes;
