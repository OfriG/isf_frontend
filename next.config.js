/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove TypeScript checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow images from Strapi backend
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**', // Allow all paths from localhost:1337
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS domain for production
        pathname: '/**', // Allow all paths for production
      },
    ],
  },
}

module.exports = nextConfig
