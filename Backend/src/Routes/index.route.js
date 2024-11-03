const express = require("express");
const UserRoutes = require("./user.routes");
const MosqueRoutes = require("./mosque.routes");

// Route config
const IndexRoutes = express.Router();

//  using a routes
IndexRoutes.use("/user", UserRoutes);

IndexRoutes.use("/mosque", MosqueRoutes);

// export the routes
module.exports = IndexRoutes;
