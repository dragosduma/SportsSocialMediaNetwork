/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:8080/:path*' // Proxy to Backend
      }
    ]
  }
}