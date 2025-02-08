const axios = require("axios");
const logger = require("../Config/logger.config");
const moment = require("moment");
const {
  BARKAT_BOT_WEBHOOK,
  SERVER_STATUS_WEBHOOK,
} = require("../Config/index.config");

const newRegistrationMosqueWebhook = async (details) => {
  try {
    let description = Object.entries({
      street: details.address.street,
      city: details.address.city,
      state: details.address.state,
      country: details.address.country,
      postalCode: details.address.postalCode,
      phone: details.contactInfo.phone,
      email: details.contactInfo.email,
    })
      .filter(([_, value]) => value) // Remove empty values
      .map(
        ([key, value]) =>
          `**${key.charAt(0).toUpperCase() + key.slice(1)}**: ${value}`
      )
      .join("\n");
    const json = {
      content: "",
      tts: false,
      embeds: [
        {
          title: "Registration Form Details : -",
          description,
          color: 1237032,
          fields: [],
          author: {
            name: details.name,
          },
          footer: {
            text: details._id,
          },
          timestamp: moment,
        },
      ],
      components: [],
      actions: {},
    };

    await axios.post(BARKAT_BOT_WEBHOOK, json);
  } catch (error) {
    logger.error(
      "Hooks - registration.webhook - newRegistrationMosqueWebhook",
      error
    );
  }
};

const serverStatusWebhook = async (serverDetails) => {
  try {
    // Define colors for different states
    const STATUS_COLORS = {
      success: 3066993, // Discord Green
      error: 15158332, // Discord Red
    };

    const isServerUp = serverDetails.status === "running";

    let description = Object.entries({
      status: serverDetails.status,
      port: serverDetails.port,
      environment: serverDetails.env,
      version: serverDetails.version,
    })
      .filter(([_, value]) => value)
      .map(
        ([key, value]) =>
          `**${key.charAt(0).toUpperCase() + key.slice(1)}**: ${value}`
      )
      .join("\n");

    const json = {
      content: "",
      tts: false,
      embeds: [
        {
          title: "Server Status Update",
          description,
          color: isServerUp ? STATUS_COLORS.success : STATUS_COLORS.error,
          fields: [
            {
              name: "Status",
              value: isServerUp
                ? "✅ Server Started Successfully"
                : "❌ Server Failed to Start",
              inline: true,
            },
            {
              name: "Timestamp",
              value: new Date().toISOString(),
              inline: true,
            },
          ],
          author: {
            name: serverDetails.serverName || "API Server",
          },
          footer: {
            text: `Server ID: ${serverDetails.serverId || "unknown"}`,
          },
          timestamp: new Date(),
        },
      ],
      components: [],
      actions: {},
    };

    await axios.post(SERVER_STATUS_WEBHOOK, json);
  } catch (error) {
    logger.error("Hooks - server.webhook - serverStatusWebhook", error);
  }
};

module.exports = {
  newRegistrationMosqueWebhook,
  serverStatusWebhook,
};
