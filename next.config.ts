import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.23"],
  ...(process.env.GITHUB_PAGES === "true" && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
