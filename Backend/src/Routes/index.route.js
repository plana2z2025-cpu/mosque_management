const express = require("express");
const UserRoutes = require("./users/user.routes");
const MosqueRoutes = require("./mosque.routes");
const EventRoutes = require("./events/event.routes");
const EventCategoryRoutes = require("./events/category.routes");
const SubUserRoutes = require("./users/subUser.routes");
const ExpenseRoutes = require("./expenses/expenses.routes");
const ExpenseCategoryRoutes = require("./expenses/category.routes");
const PayeeRoutes = require("./expenses/payee.routes");
const ExpenseGraphRoutes = require("./expenses/graphexpense.routes");
const EventGraphRoutes = require("./events/graphevent.routes");
const RamadanTimingsRoutes = require("./mosque/ramadan_timings.routes");

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
IndexRoutes.use("/event/graph", EventGraphRoutes);

// event category routes
IndexRoutes.use("/event/category", EventCategoryRoutes);

// ----------------------------------------
//  Event Routes
// ----------------------------------------
// event routes
IndexRoutes.use("/expense", ExpenseRoutes);
IndexRoutes.use("/expenses/graph", ExpenseGraphRoutes);
// event category routes
IndexRoutes.use("/expenses/category", ExpenseCategoryRoutes);
IndexRoutes.use("/expenses/payee", PayeeRoutes);

// Ramadan
IndexRoutes.use("/ramadan/timings", RamadanTimingsRoutes);

// export the routes
module.exports = IndexRoutes;
