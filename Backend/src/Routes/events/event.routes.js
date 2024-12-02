const express = require("express");
const EventRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
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
  Authorization(ADMIN),
  CheckMosqueAccess,
  eventValidations.createEventValidation,
  createEventController
);

EventRoutes.route("/events").get(
  Authentication,
  Authorization(ADMIN),
  CheckMosqueAccess,
  getAllEventController
);

EventRoutes.route("/:eventId")
  .get(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    getEventByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    updateEventController
  )
  .delete(
    Authentication,
    Authorization(ADMIN),
    CheckMosqueAccess,
    deleteEventController
  );

module.exports = EventRoutes;
