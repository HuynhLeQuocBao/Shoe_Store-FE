/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
