const express = require("express");
const EventGraphRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
  CheckMosqueAuthorization,
  CheckMosquePermissions,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER, READ } = require("../../Constants/roles.constants");
const {
  eventGraphController,
} = require("../../Controllers/events/graphevent.controller");

EventGraphRoutes.route("/dashboard").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  eventGraphController
);

module.exports = EventGraphRoutes;
