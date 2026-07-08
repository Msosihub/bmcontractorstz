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
    label: "+255 735 111 881",
    url: "https://wa.me/255745778821",
    raw: "+255745778821",
  },

  phones: [
    {
      label: "0745 77 88 21",
      raw: "+255745778821",
      type: "Office",
    },
    {
      label: "0760 111 880",
      raw: "+255760111880",
      type: "Sales",
    },
  ],

  notificationNumbers: ["+255745778821", "+255760111880"],

  location: {
    country: "Tanzania",
    city: "",
    address: "",
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
