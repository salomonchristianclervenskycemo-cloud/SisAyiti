import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow maplibre-gl worker to be bundled correctly
  transpilePackages: ['maplibre-gl'],
}

export default nextConfig
