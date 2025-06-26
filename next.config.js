/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false, // Using pages directory for simpler structure
  },
  images: {
    domains: [],
  },
  env: {
    CUSTOM_KEY: 'generator-doa',
  },
  // Export as static site for easy deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
