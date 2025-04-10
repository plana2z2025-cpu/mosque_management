const GoogleAuthServiceClass = require("./google.auth.service");

class GoogleCalendarServiceClass extends GoogleAuthServiceClass {
  constructor(userID) {
    super();
    this.userID = userID;
    this.calendar = null;
  }

  async initialize() {
    let tokens = await this.getTokens();
    this.setCredentials(tokens); // Use dynamic access/refresh tokens per user
    this.calendar = google.calendar({
      version: "v3",
      auth: this.getAuthClient(),
    });
  }

  async listEvents(calendarId = "primary", maxResults = 10) {
    try {
      const response = await this.calendar.events.list({
        calendarId,
        maxResults,
        singleEvents: true,
        orderBy: "startTime",
      });
      return response.data.items;
    } catch (error) {
      console.error("Failed to list calendar events:", error);
      throw error;
    }
  }

  async createEvent(calendarId = "primary", event) {
    try {
      const response = await this.calendar.events.insert({
        calendarId,
        resource: event,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create event:", error);
      throw error;
    }
  }

  async deleteEvent(calendarId = "primary", eventId) {
    try {
      await this.calendar.events.delete({
        calendarId,
        eventId,
      });
      return { success: true };
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw error;
    }
  }
}

module.exports = GoogleCalendarServiceClass;
