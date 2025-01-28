const express = require("express");
const EventRoutes = express.Router();
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
const eventValidations = require("../../validators/events/event.joi");
const {
  createEventController,
  getEventByIdController,
  getAllEventController,
  deleteEventController,
  updateEventController,
} = require("../../Controllers/events/event.controller");

EventRoutes.route("/new-event").post(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  eventValidations.createEventValidation,
  createEventController
);

EventRoutes.route("/events").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  getAllEventController
);

EventRoutes.route("/:eventId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(READ),
    getEventByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(UPDATE),
    updateEventController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(DELETE),
    deleteEventController
  );

module.exports = EventRoutes;
