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
  companyName: "BM Engineering Contractors LTD",
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
    // Public street address and hours are not yet confirmed.
    arusha: { phone: { label: "+255 799 660 068", raw: "+255799660068" } },
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

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
  },

  businessHours: {
    en: "Monday - Saturday",
    sw: "Jumatatu - Jumamosi",
  },
};
