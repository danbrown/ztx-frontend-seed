const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
});

module.exports = withPWA({
  pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
  reactStrictMode: true,
  redirects: require("./next-redirect"),
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, child_process: false };

    return config;
  },
});
