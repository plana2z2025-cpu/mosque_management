const express = require("express");
const EventCategoryRoutes = express.Router();
const {
  Authentication,
  Authorization,
  CheckMosqueAccess,
  CheckMosqueAuthorization,
} = require("../../Middlewares/Auth.middleware");
const { ADMIN, SUB_USER } = require("../../Constants/roles.constants");
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
  categoryValidations.createEventCategory,
  createEventCategoryController
);

EventCategoryRoutes.route("/categories").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  categoryValidations.getAllEventCategories,
  getAllEventCategoriesController
);

EventCategoryRoutes.route("/:categoryId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    getEventCategoryByIdController
  )
  .put(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    updateEventCategoryController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN),
    deleteEventCategoryController
  );

EventCategoryRoutes.route("/categories/all/names").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  getAllEventsCategoryNamesController
);

module.exports = EventCategoryRoutes;
