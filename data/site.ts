/**
 * Site Configuration
 * ------------------
 * Central place for BM Contractors website contact and brand details.
 *
 * Purpose:
 * - Avoid hardcoding phone numbers, emails and company details in many files.
 * - Make future admin settings integration easier.
 * - Keep public website contact information consistent.
 *
 * Later:
 * - Move these values to Neon Postgres SiteSetting table.
 * - Manage them from /admin/settings.
 */

export const siteConfig = {
  companyName: "BM Engineering Contractors Limited",
  description: {
    en: "BM Engineering Contractors supplies security and engineering equipment and installs CCTV, electric fencing, gate automation, electrical, power and communication systems. Visit our Moshi and Arusha offices; scheduled field services are available in Dar es Salaam and Dodoma.",
    sw: "BM Engineering Contractors husambaza vifaa vya ulinzi na uhandisi, na kufunga CCTV, uzio wa umeme, mageti ya kiotomatiki, mifumo ya umeme, nishati na mawasiliano. Tuna ofisi Moshi na Arusha, na mafundi kwa kazi zilizopangwa Dar es Salaam na Dodoma.",
  },
  coverage: {
    scheduledFieldCities: ["Dar es Salaam", "Dodoma"],
    northernSupplyLocations: ["Moshi", "Arusha", "Tanga"],
  },
  shortName: "BM Contractors LTD",
  brandName: "BM Contractors Tanzania",
  domain: "bmcontractorstz.com",

  email: "sales@bmcontractorstz.com",

  whatsapp: {
    label: "+255 745 778 821",
    url:
      process.env.NEXT_PUBLIC_BM_PREVIEW === "1"
        ? "/preview-notifications-disabled"
        : "https://wa.me/255745778821",
    raw: "+255745778821",
  },

  sales: { label: "+255 760 111 880", raw: "+255760111880" },
  offices: {
    moshi: {
      phone: { label: "+255 745 778 821", raw: "+255745778821" },
      address: "55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania",
      streetAddress: "55 Market Road, Vijana Street",
      city: "Moshi",
      region: "Kilimanjaro",
      country: "TZ",
    },
    // Owner-confirmed locality only; no street number, building, coordinates or hours.
    arusha: {
      address: "Mianzini, Arusha, Tanzania",
      locality: "Mianzini",
      city: "Arusha",
      country: "TZ",
      phone: { label: "+255 799 660 068", raw: "+255799660068" },
    },
  },

  phones: [
    {
      label: "+255 745 778 821",
      raw: "+255745778821",
      type: "Moshi office",
    },
    {
      label: "+255 760 111 880",
      raw: "+255760111880",
      type: "National sales",
    },
    { label: "+255 799 660 068", raw: "+255799660068", type: "Arusha office" },
  ],

  // Display contacts do not change existing notification recipients.
  notificationNumbers: ["+255745778821", "+255760111880"],

  location: {
    country: "Tanzania",
    city: "Moshi",
    address: "55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania",
  },

  services: [
    "CCTV Systems",
    "Electric Fence",
    "Gate Motors",
    "Access Control",
    "Networking",
    "Power Backup",
  ],

  // Owner-supplied certificate reviewed 20 November 2026; no distributor claim.
  authorizations: {
    hikvision: {
      designation: "Hikvision Authorized Dealer",
      territory: "Tanzania",
      validFrom: "2026-01-01",
      validThrough: "2026-12-31",
      description: {
        en: "Hikvision Authorized Dealer in Tanzania — certificate valid 1 January–31 December 2026.",
        sw: "Muuzaji aliyeidhinishwa wa Hikvision nchini Tanzania — cheti ni halali kuanzia 1 Januari hadi 31 Desemba 2026.",
      },
    },
  },

  social: {
    facebook: "https://www.facebook.com/p/BM-Contractors-61558249603510/",
    instagram: "https://www.instagram.com/bm_contractorstz/",
    linkedin: "",
    tiktok: "",
  },

  businessHours: {
    en: "Monday - Saturday",
    sw: "Jumatatu - Jumamosi",
  },
};
