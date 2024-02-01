/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
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
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/home",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
