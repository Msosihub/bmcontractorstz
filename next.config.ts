import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/whatsapp",
        destination: "https://wa.me/255745778821",
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



export default nextConfig;
