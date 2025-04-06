const config_urls = {
  local: "http://localhost:3000",
  development: "http://localhost:8000",
  dev: "http://mosqueapi.shahidnagodriya.online",
  production:
    process.env.NEXT_PUBLIC_SERVER_URL_API || "https://mosque.dev.mooo.com",

  local_dashboard: "http://localhost:5173",
  production_dashboard: "https://mosque-management-dev.vercel.app",
};

export const BASE_URL =
  config_urls[process.env.NEXT_PUBLIC_DEVELOPMENT_MODE || "production"];
export const API_URL =
  config_urls[process.env.NEXT_PUBLIC_DEVELOPMENT_MODE || "production"] +
  "/api/v1";

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "development"
    ? config_urls.local_dashboard
    : config_urls.production_dashboard;
