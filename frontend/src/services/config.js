const config_urls = {
  local: 'http://localhost:3000',
  development: 'http://localhost:8000',
  production: import.meta.env.VITE_SERVER_URL_API,
};

export const BASE_URL = config_urls[import.meta.env.VITE_DEVELOPMENT_MODE || 'development'];
export const API_URL =
  config_urls[import.meta.env.VITE_DEVELOPMENT_MODE || 'development'] + '/api/v1';
export const public_url = 'https://mosque-management-public-portal.vercel.app';
