require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: "export",
  ...(process.env.NODE_ENV === "production" ? { distDir: "dist/client" } : {}),
};

module.exports = nextConfig;
