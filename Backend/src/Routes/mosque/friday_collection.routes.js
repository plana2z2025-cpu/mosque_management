const express = require("express");
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
const {
  createFridayCollectionController,
  getFridayCollectionController,
  getSingleFridayCollectionController,
  updateFridayCollectionController,
  deleteFridayCollectionController,
} = require("../../Controllers/mosque/fridaycollection.controller");
const fridayCollection = require("../../validators/mosque/friday_collection.joi");

const FridayCollectionRoute = express.Router();

FridayCollectionRoute.route("/friday-collection/create").post(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(CREATE),
  fridayCollection.createFridayCollectionValidation,
  createFridayCollectionController
);

FridayCollectionRoute.route("/friday-collection/all").get(
  Authentication,
  Authorization(ADMIN, SUB_USER),
  CheckMosqueAccess,
  CheckMosqueAuthorization(ADMIN, SUB_USER),
  CheckMosquePermissions(READ),
  fridayCollection.getAllFridayCollectionValidation,
  getFridayCollectionController
);

FridayCollectionRoute.route("/collection/:collectionId")
  .get(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(READ),
    getSingleFridayCollectionController
  )
  .put(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(UPDATE),
    fridayCollection.updateFridayCollectionValidation,
    updateFridayCollectionController
  )
  .delete(
    Authentication,
    Authorization(ADMIN, SUB_USER),
    CheckMosqueAccess,
    CheckMosqueAuthorization(ADMIN, SUB_USER),
    CheckMosquePermissions(DELETE),
    deleteFridayCollectionController
  );

module.exports = FridayCollectionRoute;
