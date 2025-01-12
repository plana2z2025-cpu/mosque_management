const express = require("express");
const EventGraphRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
const {
  eventGraphController,
} = require("../../Controllers/events/graphevent.controller");

EventGraphRoutes.route("/dashboard").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  eventGraphController
);

module.exports = EventGraphRoutes;
