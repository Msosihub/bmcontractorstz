/**
 * Products Data
 * -------------
 * Temporary frontend product data for BM Contractors.
 *
 * Purpose:
 * - Allows us to build the products UI before connecting admin/database editing.
 * - Supports English and Swahili fields from the beginning.
 * - Later this data will move to Neon Postgres and be managed from /admin/products.
 */

export const productCategories = [
  {
    slug: "cctv",
    nameEn: "CCTV Cameras",
    nameSw: "Camera za CCTV",
    descriptionEn:
      "IP cameras, analog cameras, DVRs, NVRs and CCTV accessories.",
    descriptionSw: "Camera za IP, analog, DVR, NVR na vifaa vya CCTV.",
  },
  {
    slug: "electric-fence",
    nameEn: "Electric Fence",
    nameSw: "Uzio wa Umeme",
    descriptionEn:
      "Energizers, HT wire, insulators, warning signs and fence accessories.",
    descriptionSw:
      "Energizer, HT wire, insulators, warning signs na vifaa vya fence.",
  },
  {
    slug: "gate-motors",
    nameEn: "Gate Motors",
    nameSw: "Gate Motors",
    descriptionEn:
      "Automatic gate motors, remotes, rails, sensors and service parts.",
    descriptionSw: "Gate motors, remote, rail, sensors na vifaa vya service.",
  },
  {
    slug: "access-control",
    nameEn: "Access Control",
    nameSw: "Access Control",
    descriptionEn:
      "Biometric devices, door locks, exit buttons and access systems.",
    descriptionSw: "Biometric, door locks, exit buttons na mifumo ya access.",
  },
  {
    slug: "networking",
    nameEn: "Networking",
    nameSw: "Networking",
    descriptionEn:
      "Routers, switches, access points, cables and networking accessories.",
    descriptionSw:
      "Routers, switches, access points, cables na vifaa vya networking.",
  },
  {
    slug: "power-backup",
    nameEn: "Power Backup",
    nameSw: "Power Backup",
    descriptionEn:
      "UPS, batteries and backup solutions for security and networking systems.",
    descriptionSw: "UPS, batteries na backup power kwa security na networking.",
  },
];

export const featuredProducts = [
  {
    slug: "hikvision-2mp-camera",
    name: "Hikvision 2MP Camera",
    categorySlug: "cctv",
    brand: "Hikvision",
    summaryEn: "Reliable camera option for homes, shops and offices.",
    summarySw: "Camera nzuri kwa nyumba, maduka na ofisi.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "8-channel-dvr",
    name: "8 Channel DVR",
    categorySlug: "cctv",
    brand: "Hikvision / Tiandy",
    summaryEn: "Suitable DVR for small and medium CCTV installations.",
    summarySw: "DVR inayofaa kwa CCTV ndogo na za kati.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "hdd-1tb-surveillance",
    name: "1TB Surveillance HDD",
    categorySlug: "cctv",
    brand: "WD / Seagate",
    summaryEn: "Storage drive for CCTV recording systems.",
    summarySw: "Hard disk kwa kuhifadhi video za CCTV.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "electric-fence-energizer",
    name: "Electric Fence Energizer",
    categorySlug: "electric-fence",
    brand: "Security Fence",
    summaryEn: "Core power unit for electric fence installations.",
    summarySw: "Kifaa kikuu cha kuendesha electric fence.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "gate-motor-kit",
    name: "Gate Motor Kit",
    categorySlug: "gate-motors",
    brand: "Gate Automation",
    summaryEn: "Automatic gate motor solution for homes and businesses.",
    summarySw: "Mfumo wa kufungua gate automatic kwa nyumba na biashara.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "biometric-access-control",
    name: "Biometric Access Control",
    categorySlug: "access-control",
    brand: "ZKTeco / Hikvision",
    summaryEn:
      "Access control and attendance solution for offices and businesses.",
    summarySw: "Mfumo wa access control na attendance kwa ofisi na biashara.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "network-router",
    name: "Business Router",
    categorySlug: "networking",
    brand: "MikroTik / TP-Link",
    summaryEn:
      "Router solution for offices, CCTV remote viewing and internet sharing.",
    summarySw: "Router kwa ofisi, CCTV remote viewing na internet sharing.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
  {
    slug: "ups-backup",
    name: "UPS Backup",
    categorySlug: "power-backup",
    brand: "UPS",
    summaryEn: "Power backup for CCTV, routers, NVRs and office devices.",
    summarySw: "Backup power kwa CCTV, routers, NVR na vifaa vya ofisi.",
    priceLabelEn: "Request price",
    priceLabelSw: "Omba bei",
  },
];
