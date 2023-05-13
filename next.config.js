/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "shoestore-backend-tjms.onrender.com",
      "lh3.googleusercontent.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
