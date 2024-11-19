const axios = require("axios");
const logger = require("../Config/logger.config");
const moment = require("moment");
const { BARKAT_BOT_WEBHOOK } = require("../Config/index.config");

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

module.exports = {
  newRegistrationMosqueWebhook,
};
