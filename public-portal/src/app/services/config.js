const config_urls = {
  local: "http://localhost:3000",
  development: "http://localhost:8000",
  production:
    process.env.NEXT_PUBLIC_SERVER_URL_API || "https://mosque.dev.mooo.com",
};

export const BASE_URL =
  config_urls[process.env.NEXT_PUBLIC_DEVELOPMENT_MODE || "production"];
export const API_URL =
  config_urls[process.env.NEXT_PUBLIC_DEVELOPMENT_MODE || "production"] +
  "/api/v1";
