/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enable compression
  compress: true,

  // Output configuration for smaller builds
  output: 'standalone',

  // Optimize images
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable SWC minification
  swcMinify: true,

  // Reduce chunk sizes
  experimental: {
    optimizeCss: true,
  },

  // WWW redirect
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

  // Custom headers for caching and compression
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2099 23:59:59 GMT'
          }
        ],
      },
      {
        source: '/:path*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,otf}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2099 23:59:59 GMT'
          }
        ],
      },
      {
        source: '/:path*.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2099 23:59:59 GMT'
          }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2099 23:59:59 GMT'
          }
        ],
      },
    ]
  },
}

export default nextConfig