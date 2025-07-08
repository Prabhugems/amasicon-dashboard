/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AIRTABLE_API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    NEXT_PUBLIC_AIRTABLE_BASE_ID: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
