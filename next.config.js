/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["shoestore-backend-0uam.onrender.com"],
  },
  // images: {
  //   domains: ["https://shoestore-backend-0uam.onrender.com"],
  // },
};

module.exports = nextConfig;
