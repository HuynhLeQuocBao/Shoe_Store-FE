/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "shoestore-backend-tjms.onrender.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "localhost",
    ],
  },
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
  },
};

module.exports = withBundleAnalyzer(nextConfig);
