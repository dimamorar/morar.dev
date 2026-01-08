/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.morar.dev",
      },
    ],
  },
};

export default nextConfig;
