import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  },
  images: {
    domains: ['static.nike.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        pathname: '/a/images/**'
      }
    ]
  }
}

export default nextConfig
