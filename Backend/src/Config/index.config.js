const dotenv = require("dotenv");
//   env load
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.PORT || 8001,
  DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE || "development",
  DEVELOPMENT_MONGODB_URL: process.env.DB_URL_DEV,
  PRODUCTION_MONGODB_URL: process.env.DB_URL,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME,
  CORS_ALLOW_ORIGINS: process.env.ALLOW_ORIGINS_ACCESS,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY: process.env.CLOUDINARY_API_SECRET_KEY,

  // webhooks
  BARKAT_BOT_WEBHOOK: process.env.BARKAT_BOT_WEBHOOK,
  SERVER_STATUS_WEBHOOK: process.env.SERVER_STATUS_WEBHOOK,
};
