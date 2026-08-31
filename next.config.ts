import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/whatsapp",
        destination: "https://wa.me/255760111880",
        permanent: true,
      },
      {
        source: "/huduma",
        destination: "/services?lang=sw",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
