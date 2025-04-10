const express = require("express");
const GoogleAuthServiceClass = require("../../Services/google.auth.service");
const GoogleCalendarServiceClass = require("../../Services/google.calendar.service");
const userModel = require("../../Schema/users/user.model");

const GoogleAuthRoutes = express.Router();

GoogleAuthRoutes.route("/").get((req, res) => {
  const googleAuthService = new GoogleAuthServiceClass();
  const authUrl = googleAuthService.generateAuthUrl("673e19244f630ca743c7abd0");
  res.redirect(authUrl);
});

GoogleAuthRoutes.route("/callback").get(async (req, res) => {
  const { code, state } = req.query;
  const googleAuthService = new GoogleAuthServiceClass();
  try {
    const tokens = await googleAuthService.getTokensFromCode(code);
    // const userInfo = await googleAuthService.getUserInfo(tokens.access_token);
    let details = {
      tokens,
    };

    let userDetails = await userModel.findByIdAndUpdate(
      state,
      { google: details },
      { $new: true }
    );

    // Store tokens in session or database as needed
    res.status(200).json({
      success: true,
      message: "Google authentication successful",
      tokens,
      //   userInfo,
      userDetails,
    });
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).json({
      success: false,
      message: "Error getting tokens",
      error: error.message,
    });
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
