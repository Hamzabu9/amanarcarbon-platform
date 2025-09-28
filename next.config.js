/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 15
  
  // Optimize images
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack configuration will be added later if needed
  
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  
  // Output configuration
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  
  // Compression
  compress: true,
  
  // PoweredByHeader
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minification is enabled by default in Next.js 15
};

module.exports = nextConfig;
