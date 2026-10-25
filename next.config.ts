import {assertPreviewEnvironment,isPreview} from "./lib/preview-safety.mjs";
assertPreviewEnvironment();
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {NEXT_PUBLIC_BM_PREVIEW: isPreview() ? "1" : "0"},
  async headers(){return isPreview()?[{source:"/:path*",headers:[{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}]}]:[];},
  async redirects() {
    return [
      {
        source: "/whatsapp",
        destination: isPreview() ? "/preview-notifications-disabled" : "https://wa.me/255745778821",
        permanent: !isPreview(),
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
