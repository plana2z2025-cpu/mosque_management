const express = require("express");
const UserRoutes = require("./users/user.routes");
const MosqueRoutes = require("./mosque.routes");
const EventRoutes = require("./events/event.routes");
const EventCategoryRoutes = require("./events/category.routes");
const SubUserRoutes = require("./users/subUser.routes");
const ExpenseCategoryRoutes = require("./expenses/category.routes");

// Route config
const IndexRoutes = express.Router();
// ----------------------------------------
//  user  routes
// ----------------------------------------
IndexRoutes.use("/user", UserRoutes);
IndexRoutes.use("/user/sub-user", SubUserRoutes);

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

// ----------------------------------------
//  Event Routes
// ----------------------------------------
// event routes
// IndexRoutes.use("/event", EventRoutes);
// event category routes
IndexRoutes.use("/expenses/category", ExpenseCategoryRoutes);

// export the routes
module.exports = IndexRoutes;
