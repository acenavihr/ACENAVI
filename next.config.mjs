/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.acenavi.in',
          },
        ],
        destination: 'https://acenavi.in/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
