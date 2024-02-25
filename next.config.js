/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    webpackBuildWorker: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "d3ugyf2ht6aenh.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "www.somosfenix.com.ar",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "acdn.mitiendanube.com",
      },
      {
        protocol: "https",
        hostname: "d2r9epyceweg5n.cloudfront.net",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_TABLE_PRODUCTS:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
        ? "products_dev"
        : "products",
    NEXT_PUBLIC_TABLE_CONSULTS:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
        ? "consults_dev"
        : "consults",
    NEXT_PUBLIC_TABLE_CONSULTS:
      process.env.NEXT_PUBLIC_ENVIRONMENT === "dev"
        ? process.env.NEXT_PUBLIC_MP_ACCES_TOKEN_TEST
        : process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
