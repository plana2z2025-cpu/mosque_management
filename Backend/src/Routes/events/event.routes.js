const express = require("express");
const EventRoutes = express.Router();

EventRoutes.route("/all").get((req, res) => {
  res.send("test events");
});

module.exports = EventRoutes;
