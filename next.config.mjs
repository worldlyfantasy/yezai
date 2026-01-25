/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  output: 'export',
  images: {
    // Disable default loader so static export works without the image optimizer.
    unoptimized: true
  }
};

export default nextConfig;
