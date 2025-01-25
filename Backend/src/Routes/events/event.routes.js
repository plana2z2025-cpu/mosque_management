const express = require("express");
const EventRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
  CheckMosqueAuthorization,
} = require("../../Middlewares/Auth.middleware");
const {
  SUPPER_ADMIN,
  ADMIN,
  SUB_USER,
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
  eventValidations.createEventValidation,
  createEventController
);

EventRoutes.route("/events").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  getAllEventController
);

EventRoutes.route("/:eventId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    getEventByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    updateEventController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN),
    deleteEventController
  );

module.exports = EventRoutes;
