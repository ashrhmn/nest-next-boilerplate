require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  // distDir: "dist/.next",
  // output: "export",
  ...(process.env.NODE_ENV === "production" ? { distDir: "dist/.next" } : {}),
};

module.exports = nextConfig;
