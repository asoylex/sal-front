import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  nextConfig: {
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
  },
};

export default nextConfig;
