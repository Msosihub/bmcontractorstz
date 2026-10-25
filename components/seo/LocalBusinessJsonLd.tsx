/**
 * LocalBusinessJsonLd Component
 * -----------------------------
 * Adds structured SEO data for BM Contractors.
 *
 * Purpose:
 * - Helps Google understand the business name, website, services and contacts.
 * - Improves local/business SEO foundation.
 * - Does not display anything visually on the page.
 */

import { siteConfig } from "@/data/site";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.bmcontractorstz.com/#business",
    name: "BM Engineering Contractors LTD",
    alternateName: "BM Contractors Tanzania",
    url: "https://www.bmcontractorstz.com",
    email: siteConfig.email,
    telephone: siteConfig.sales.raw,
    areaServed: {
      "@type": "Country",
      name: "Tanzania",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.offices.moshi.streetAddress,
      addressLocality: siteConfig.offices.moshi.city,
      addressRegion: siteConfig.offices.moshi.region,
      addressCountry: siteConfig.offices.moshi.country,
    },
    description:
      "BM Contractors provides CCTV installation, electric fencing, gate automation, networking and backup power, with a Moshi office in Kilimanjaro and an Arusha office coordinating enquiries and site visits. National sales handles quotations and institutional RFQs across Tanzania.",
    knowsAbout: [
      "CCTV installation",
      "Electric fence installation",
      "Gate motors",
      "Access control",
      "Networking",
      "Power backup",
      "Security systems",
      "Site survey",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        name: "Main sales / national enquiries",
        telephone: siteConfig.sales.raw,
        email: siteConfig.email,
        contactType: "Sales and institutional RFQs",
        areaServed: "TZ",
        availableLanguage: ["en", "sw"],
      },
      {
        "@type": "ContactPoint",
        name: "Moshi office",
        telephone: siteConfig.offices.moshi.phone.raw,
        contactType: "Moshi office customer enquiries",
        areaServed: { "@type": "AdministrativeArea", name: "Kilimanjaro" },
        availableLanguage: ["en", "sw"],
      },
      {
        "@type": "ContactPoint",
        name: "Arusha office",
        telephone: siteConfig.offices.arusha.phone.raw,
        contactType: "Arusha office enquiries and site visit coordination",
        areaServed: { "@type": "City", name: "Arusha" },
        availableLanguage: ["en", "sw"],
      },
      {
        "@type": "ContactPoint",
        name: "Moshi WhatsApp",
        telephone: siteConfig.whatsapp.raw,
        contactType: "WhatsApp",
        availableLanguage: ["en", "sw"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
