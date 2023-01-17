// SITE CONSTANTS
export const SITE_TITLE = "Ztx Base";
export const SITE_DESCRIPTION = "Ztx Base";
export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://example.com"
    : "http://localhost:3005";
export const isProd = process.env.NODE_ENV === "production";
