const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../Middlewares/Auth.middleware");
const { SUPPER_ADMIN, USER } = require("../Constants/roles.contants");
const {
  createNewMosqueController,
  getMosquesListController,
} = require("../Controllers/mosque.controller");

const MosqueRoutes = express.Router();

MosqueRoutes.route("/create-new").post(createNewMosqueController);

MosqueRoutes.route("/get-all-mosques").get(getMosquesListController);

module.exports = MosqueRoutes;
