require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  // distDir: "dist/.next",
  // output: "export",
  ...(process.env.NODE_ENV === "production" ? { distDir: "dist/.next" } : {}),
};

module.exports = nextConfig;
