const express = require("express");
const UserRoutes = require("./user.routes");
const MosqueRoutes = require("./mosque.routes");
const EventRoutes = require("./events/event.routes");
const EventCategoryRoutes = require("./events/category.routes");

// Route config
const IndexRoutes = express.Router();
// ----------------------------------------
//  user  routes
// ----------------------------------------
IndexRoutes.use("/user", UserRoutes);

// ----------------------------------------
// Mosque routes
// ----------------------------------------
IndexRoutes.use("/mosque", MosqueRoutes);

// ----------------------------------------
//  Event Routes
// ----------------------------------------
// event routes
IndexRoutes.use("/event", EventRoutes);
// event category routes
IndexRoutes.use("/event/category", EventCategoryRoutes);

// export the routes
module.exports = IndexRoutes;
