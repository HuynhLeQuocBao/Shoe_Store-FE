/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["shoestore-backend-0uam.onrender.com"],
    domains: [
      "backend-shoestore-refactor.onrender.com",
      "shoe-store-be-bcd.onrender.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
