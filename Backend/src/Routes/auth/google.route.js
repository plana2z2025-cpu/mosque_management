const express = require("express");
const GoogleAuthServiceClass = require("../../Services/google.auth.service");
const GoogleCalendarServiceClass = require("../../Services/google.calendar.service");
const errorHandling = require("../../Utils/errorHandling");

const GoogleAuthRoutes = express.Router();

GoogleAuthRoutes.route("/").get((req, res) => {
  const googleAuthService = new GoogleAuthServiceClass(
    "673e19244f630ca743c7abd0"
  );
  const authUrl = googleAuthService.generateAuthUrl();
  res.redirect(authUrl);
});

GoogleAuthRoutes.route("/callback").get(async (req, res) => {
  const { code, state } = req.query;
  const googleAuthService = new GoogleAuthServiceClass(state);
  try {
    const { tokens, userDetails } = await googleAuthService.getTokensFromCode(
      code
    );

    res.status(200).json({
      success: true,
      message: "Google authentication successful",
      tokens,
      userDetails,
    });
  } catch (error) {
    errorHandling.handleCustomErrorService(error, next);
  }
});

GoogleAuthRoutes.route("/google-events-list").get(async (req, res) => {
  try {
    const userID = "673e19244f630ca743c7abd0";
    const googleCalendarService = await new GoogleCalendarServiceClass(userID);
    await googleCalendarService.initialize();
    const calendarEvents = await googleCalendarService.listEvents();
    res.status(200).json({
      success: true,
      message: "Google Calendar events retrieved successfully",
      events: calendarEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting events",
      error: error.message,
    });
  }
});
module.exports = GoogleAuthRoutes;
