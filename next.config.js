/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  // images: {
  //   domains: ["http://localhost:3010"],
  // },
};

module.exports = nextConfig;
