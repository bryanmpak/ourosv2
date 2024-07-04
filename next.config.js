/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "ouros.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
}

module.exports = nextConfig
