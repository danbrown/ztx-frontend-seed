// SITE CONSTANTS
export const SITE_TITLE = "Boilerplate";
export const SITE_DESCRIPTION = "Boilerplate app";
export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://example.com"
    : "http://localhost:3005";

export const isProd = process.env.NODE_ENV === "production";

export const browsersList = [
  "Chrome",
  "Chromium",
  "Firefox",
  "Safari",
  "Opera",
  "Edge",
  "Internet Explorer",
];
