import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "93cf30e14ffe27bbc170-56f4a41899529a041b24911e6894a309.ssl.cf1.rackcdn.com",
      },
      {
        protocol: "https",
        hostname: "evorastudio.com.br",
      },
      {
        protocol: "https",
        hostname: "storage.alboom.ninja",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
