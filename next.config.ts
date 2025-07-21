import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
    output: "export",
    basePath,
    assetPrefix: isProd ? `${basePath}/` : "",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
