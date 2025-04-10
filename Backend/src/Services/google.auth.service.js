const { google } = require("googleapis");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = require("../Config/index.config.js");
const userModel = require("../Schema/users/user.model.js");

const scopes = ["email", "profile", "https://www.googleapis.com/auth/calendar"];

class GoogleAuthServiceClass {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
    this.userID = null;
  }

  generateAuthUrl(userID) {
    return this.oAuth2Client.generateAuthUrl({
      access_type: "offline", // Ensures refresh_token is returned on first consent
      prompt: "consent", // Always show the consent screen
      scope: scopes,
      state: userID, // Pass userID in state to retrieve it later
    });
  }

  async getTokensFromCode(code) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);
    return tokens; // you can persist refresh_token if needed
  }

  setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
  }

  getAuthClient() {
    return this.oAuth2Client;
  }

  async getUserInfo(accessToken) {
    let details = await this.oAuth2Client.getTokenInfo(accessToken);
    return details;
  }

  async getTokens() {
    let tokens = await userModel.findById(this.userID).select("google").lean();
    if (!tokens) {
      throw new Error("No tokens found for this user.");
    } else {
      return tokens.google.tokens;
    }
  }
}

class GoogleAuthServiceClass2 {
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
    this.userID = null;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  generateAuthUrl(userID) {
    return this.oAuth2Client.generateAuthUrl({
      access_type: "offline", // Ensures refresh_token is returned on first consent
      prompt: "consent", // Always show the consent screen
      scope: scopes,
      state: userID, // Pass userID in state to retrieve it later
    });
  }

  async getTokensFromCode(code) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);

    // Store tokens in database
    if (this.userID) {
      await this.saveTokensToDatabase(tokens);
    }

    return tokens;
  }

  setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
  }

  getAuthClient() {
    return this.oAuth2Client;
  }

  async getUserInfo(accessToken) {
    let details = await this.oAuth2Client.getTokenInfo(accessToken);
    return details;
  }

  async saveTokensToDatabase(tokens) {
    try {
      await userModel.findByIdAndUpdate(
        this.userID,
        { "google.tokens": tokens },
        { new: true, upsert: true }
      );
    } catch (error) {
      console.error("Error saving tokens to database:", error);
      throw new Error("Failed to save tokens to database");
    }
  }

  async getTokens() {
    try {
      const user = await userModel
        .findById(this.userID)
        .select("google")
        .lean();
      if (!user || !user.google || !user.google.tokens) {
        throw new Error("No tokens found for this user.");
      }
      return user.google.tokens;
    } catch (error) {
      console.error("Error retrieving tokens:", error);
      throw new Error("Failed to retrieve tokens");
    }
  }

  async getValidAccessToken() {
    try {
      // Get current tokens from database
      const tokens = await this.getTokens();

      // Set credentials
      this.setCredentials(tokens);

      // Check if access token is expired
      const isTokenExpired = this.oAuth2Client.isTokenExpiring();

      if (isTokenExpired) {
        try {
          // Try to refresh the token
          const { credentials } = await this.oAuth2Client.refreshAccessToken();

          // Save new tokens to database
          await this.saveTokensToDatabase(credentials);

          return credentials.access_token;
        } catch (refreshError) {
          // Handle refresh token expiration
          if (
            refreshError.message.includes("invalid_grant") ||
            refreshError.message.includes("refresh token expired")
          ) {
            // Refresh token is expired - user needs to re-authenticate
            throw new Error("REFRESH_TOKEN_EXPIRED");
          }
          throw refreshError;
        }
      }

      return tokens.access_token;
    } catch (error) {
      if (error.message === "REFRESH_TOKEN_EXPIRED") {
        throw error; // Propagate this specific error
      }
      console.error("Error getting valid access token:", error);
      throw new Error("Failed to get valid access token");
    }
  }

  // Helper method to check if we need to prompt user to re-authenticate
  async requiresReAuthentication() {
    try {
      await this.getValidAccessToken();
      return false;
    } catch (error) {
      return error.message === "REFRESH_TOKEN_EXPIRED";
    }
  }
}

module.exports = GoogleAuthServiceClass;
