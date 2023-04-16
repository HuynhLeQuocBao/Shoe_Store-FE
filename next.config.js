/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["shoestore-backend-0uam.onrender.com"],
    domains: ["be-refactor-shoestore.onrender.com"],
  },
};

module.exports = nextConfig;
