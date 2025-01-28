const express = require("express");
const EventCategoryRoutes = express.Router();
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
const categoryValidations = require("../../validators/events/eventCategory.joi");
const {
  createEventCategoryController,
  deleteEventCategoryController,
  getEventCategoryByIdController,
  getAllEventCategoriesController,
  updateEventCategoryController,
  getAllEventsCategoryNamesController,
} = require("../../Controllers/events/eventCategory.controller");

EventCategoryRoutes.route("/create-new-category").post(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  categoryValidations.createEventCategory,
  createEventCategoryController
);

EventCategoryRoutes.route("/categories").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  categoryValidations.getAllEventCategories,
  getAllEventCategoriesController
);

EventCategoryRoutes.route("/:categoryId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(READ),
    getEventCategoryByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(UPDATE),
    updateEventCategoryController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(DELETE),
    deleteEventCategoryController
  );

EventCategoryRoutes.route("/categories/all/names").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  getAllEventsCategoryNamesController
);

module.exports = EventCategoryRoutes;
