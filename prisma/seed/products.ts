/**
 * Products Seed Data
 * ------------------
 * Sample product categories and products for BM Contractors.
 *
 * Purpose:
 * - Quickly fills Neon database with realistic security/safety products.
 * - Avoids manual product entry during early development.
 * - Gives /products and /admin/products useful data immediately.
 *
 * Later:
 * - Add product images.
 * - Add Swahili product descriptions.
 * - Add retail/technician/reseller price levels.
 */

export const productCategorySeeds = [
  {
    slug: "cctv-cameras",
    nameEn: "CCTV Cameras",
    nameSw: "Camera za CCTV",
    description:
      "IP cameras, analog cameras, DVRs, NVRs, HDDs and CCTV accessories.",
  },
  {
    slug: "electric-fence",
    nameEn: "Electric Fence",
    nameSw: "Uzio wa Umeme",
    description:
      "Energizers, HT wire, insulators, brackets, earth rods and fence accessories.",
  },
  {
    slug: "gate-motors",
    nameEn: "Gate Motors",
    nameSw: "Gate Motors",
    description:
      "Automatic gate motors, remotes, rails, sensors and service accessories.",
  },
  {
    slug: "access-control",
    nameEn: "Access Control",
    nameSw: "Access Control",
    description:
      "Biometric devices, magnetic locks, exit buttons and attendance systems.",
  },
  {
    slug: "networking",
    nameEn: "Networking",
    nameSw: "Networking",
    description:
      "Routers, switches, access points, network cables and accessories.",
  },
  {
    slug: "power-backup",
    nameEn: "Power Backup",
    nameSw: "Power Backup",
    description:
      "UPS, batteries and backup power products for CCTV, routers and offices.",
  },
  {
    slug: "accessories",
    nameEn: "Accessories",
    nameSw: "Accessories",
    description:
      "Installation accessories, connectors, adapters, video baluns and related items.",
  },
];

export const productSeeds = [
  {
    slug: "hikvision-2mp-camera",
    name: "Hikvision 2MP Camera",
    brand: "Hikvision",
    categorySlug: "cctv-cameras",
    description:
      "Reliable 2MP CCTV camera option for homes, shops, offices and small business installations.",
    price: null,
  },
  {
    slug: "hikvision-5mp-camera",
    name: "Hikvision 5MP Camera",
    brand: "Hikvision",
    categorySlug: "cctv-cameras",
    description:
      "Higher resolution CCTV camera suitable for customers who need clearer image quality.",
    price: null,
  },
  {
    slug: "tiandy-2mp-camera",
    name: "Tiandy 2MP Camera",
    brand: "Tiandy",
    categorySlug: "cctv-cameras",
    description:
      "Affordable CCTV camera option for residential and small business installations.",
    price: null,
  },
  {
    slug: "8-channel-dvr",
    name: "8 Channel DVR",
    brand: "Hikvision / Tiandy",
    categorySlug: "cctv-cameras",
    description:
      "DVR for small and medium CCTV systems with up to 8 analog cameras.",
    price: null,
  },
  {
    slug: "16-channel-dvr",
    name: "16 Channel DVR",
    brand: "Hikvision / Tiandy",
    categorySlug: "cctv-cameras",
    description: "DVR for medium CCTV systems with up to 16 analog cameras.",
    price: null,
  },
  {
    slug: "1tb-surveillance-hdd",
    name: "1TB Surveillance HDD",
    brand: "WD / Seagate",
    categorySlug: "cctv-cameras",
    description:
      "Surveillance hard drive for CCTV video recording and storage.",
    price: null,
  },
  {
    slug: "2tb-surveillance-hdd",
    name: "2TB Surveillance HDD",
    brand: "WD / Seagate",
    categorySlug: "cctv-cameras",
    description:
      "Larger surveillance hard drive for longer CCTV recording storage.",
    price: null,
  },
  {
    slug: "electric-fence-energizer",
    name: "Electric Fence Energizer",
    brand: "Security Fence",
    categorySlug: "electric-fence",
    description:
      "Core power unit for electric fence installations in homes, compounds and businesses.",
    price: null,
  },
  {
    slug: "ht-wire-roll",
    name: "HT Wire Roll",
    brand: "Electric Fence",
    categorySlug: "electric-fence",
    description:
      "High tension wire used for electric fence lines around compounds and premises.",
    price: null,
  },
  {
    slug: "electric-fence-insulators",
    name: "Electric Fence Insulators",
    brand: "Electric Fence",
    categorySlug: "electric-fence",
    description:
      "Insulators for holding electric fence wire safely and correctly.",
    price: null,
  },
  {
    slug: "gate-motor-kit",
    name: "Gate Motor Kit",
    brand: "Gate Automation",
    categorySlug: "gate-motors",
    description:
      "Automatic gate motor solution for homes, apartments and business premises.",
    price: null,
  },
  {
    slug: "gate-motor-remote",
    name: "Gate Motor Remote",
    brand: "Gate Automation",
    categorySlug: "gate-motors",
    description: "Remote control accessory for automatic gate motor systems.",
    price: null,
  },
  {
    slug: "biometric-access-control",
    name: "Biometric Access Control",
    brand: "ZKTeco / Hikvision",
    categorySlug: "access-control",
    description:
      "Biometric access control and attendance solution for offices and businesses.",
    price: null,
  },
  {
    slug: "magnetic-door-lock",
    name: "Magnetic Door Lock",
    brand: "Access Control",
    categorySlug: "access-control",
    description:
      "Magnetic lock for access control doors, offices and secure rooms.",
    price: null,
  },
  {
    slug: "exit-button",
    name: "Exit Button",
    brand: "Access Control",
    categorySlug: "access-control",
    description: "Exit button accessory for door access control systems.",
    price: null,
  },
  {
    slug: "mikrotik-router",
    name: "MikroTik Router",
    brand: "MikroTik",
    categorySlug: "networking",
    description:
      "Business router for office networks, CCTV remote viewing and internet sharing.",
    price: null,
  },
  {
    slug: "tp-link-router",
    name: "TP-Link Router",
    brand: "TP-Link",
    categorySlug: "networking",
    description:
      "Router solution for homes, small offices and business internet sharing.",
    price: null,
  },
  {
    slug: "cat6-indoor-cable",
    name: "CAT6 Indoor Cable",
    brand: "Networking",
    categorySlug: "networking",
    description:
      "Network cable for indoor CCTV, office networking and data installations.",
    price: null,
  },
  {
    slug: "cat6-outdoor-cable",
    name: "CAT6 Outdoor Cable",
    brand: "Networking",
    categorySlug: "networking",
    description:
      "Outdoor network cable for CCTV, long cable routes and external installations.",
    price: null,
  },
  {
    slug: "ups-650va",
    name: "UPS 650VA",
    brand: "UPS",
    categorySlug: "power-backup",
    description:
      "Backup power for CCTV systems, routers, NVRs and small office devices.",
    price: null,
  },
  {
    slug: "ups-1200va",
    name: "UPS 1200VA",
    brand: "UPS",
    categorySlug: "power-backup",
    description: "Larger UPS backup option for CCTV and office equipment.",
    price: null,
  },
  {
    slug: "video-balun-pair",
    name: "Video Balun Pair",
    brand: "CCTV Accessories",
    categorySlug: "accessories",
    description:
      "Video balun accessory used in CCTV cabling and camera installations.",
    price: null,
  },
  {
    slug: "cctv-power-supply",
    name: "CCTV Power Supply",
    brand: "CCTV Accessories",
    categorySlug: "accessories",
    description:
      "Power supply unit for CCTV cameras and installation projects.",
    price: null,
  },
];
