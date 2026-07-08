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
    name: "BM Engineering Contractors LTD",
    alternateName: "BM Contractors Tanzania",
    url: "https://bmcontractorstz.com",
    email: siteConfig.email,
    telephone: siteConfig.phones[0]?.raw || "+255745778821",
    areaServed: {
      "@type": "Country",
      name: "Tanzania",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TZ",
      addressLocality: "Tanzania",
    },
    description:
      "BM Contractors Tanzania provides CCTV installation, electric fence, gate motors, access control, networking and power backup solutions for homes, businesses and institutions.",
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
    serviceType: [
      "CCTV Systems",
      "Electric Fence",
      "Gate Motors",
      "Access Control",
      "Networking",
      "Power Backup",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.whatsapp.raw,
        contactType: "WhatsApp",
        areaServed: "TZ",
        availableLanguage: ["English", "Swahili"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phones[0]?.raw || "+255745778821",
        contactType: "Customer Service",
        areaServed: "TZ",
        availableLanguage: ["English", "Swahili"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
