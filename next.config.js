/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.jotateclimatizacion.com/:path*",
      },
    ];
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
  },
};

module.exports = nextConfig;
