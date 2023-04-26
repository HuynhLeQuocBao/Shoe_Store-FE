/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["shoestore-backend-0uam.onrender.com"],
    domains: ["backend-shoestore-refactor.onrender.com"],
  },
};

module.exports = nextConfig;
