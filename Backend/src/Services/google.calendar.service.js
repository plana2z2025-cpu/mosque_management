const GoogleAuthServiceClass = require("./google.auth.service");
const { google } = require("googleapis");

class GoogleCalendarServiceClass extends GoogleAuthServiceClass {
  constructor(userID) {
    super();
    this.calendar = null;
    this.setUserID(userID);
  }

  async initialize() {
    try {
      // Instead of just getting tokens, we'll get a valid access token
      await this.getValidAccessToken();

      // Initialize the calendar client with our authenticated client
      this.calendar = google.calendar({
        version: "v3",
        auth: this.getAuthClient(),
      });

      return true;
    } catch (error) {
      if (error.message === "REFRESH_TOKEN_EXPIRED") {
        // Token cannot be refreshed, user needs to re-authenticate
        throw new Error("User needs to re-authenticate with Google");
      }
      console.error("Failed to initialize calendar service:", error);
      throw error;
    }
  }

  // Helper method to ensure we have valid tokens before any API call
  async ensureAuthenticated() {
    if (!this.calendar) {
      await this.initialize();
    } else {
      // Make sure we have a valid token before proceeding
      await this.getValidAccessToken();
    }
  }

  async listEvents(calendarId = "primary", maxResults = 10) {
    try {
      await this.ensureAuthenticated();

      const response = await this.calendar.events.list({
        calendarId,
        maxResults,
        singleEvents: true,
        orderBy: "startTime",
      });
      return response.data.items;
    } catch (error) {
      if (this.isAuthError(error)) {
        // Handle auth errors specifically
        throw new Error("Authentication error with Google Calendar API");
      }
      console.error("Failed to list calendar events:", error);
      throw error;
    }
  }

  async createEvent(calendarId = "primary", event) {
    try {
      await this.ensureAuthenticated();

      const response = await this.calendar.events.insert({
        calendarId,
        resource: event,
      });
      return response.data;
    } catch (error) {
      if (this.isAuthError(error)) {
        throw new Error("Authentication error with Google Calendar API");
      }
      console.error("Failed to create event:", error);
      throw error;
    }
  }

  async deleteEvent(calendarId = "primary", eventId) {
    try {
      await this.ensureAuthenticated();

      await this.calendar.events.delete({
        calendarId,
        eventId,
      });
      return { success: true };
    } catch (error) {
      if (this.isAuthError(error)) {
        throw new Error("Authentication error with Google Calendar API");
      }
      console.error("Failed to delete event:", error);
      throw error;
    }
  }

  // Helper to identify authentication-related errors
  isAuthError(error) {
    return (
      error.code === 401 ||
      error.code === 403 ||
      (error.response &&
        (error.response.status === 401 || error.response.status === 403)) ||
      (error.message &&
        (error.message.includes("authentication") ||
          error.message.includes("auth") ||
          error.message.includes("token")))
    );
  }
}

module.exports = GoogleCalendarServiceClass;
