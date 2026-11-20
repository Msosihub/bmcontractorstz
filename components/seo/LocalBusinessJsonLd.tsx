import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";

export function LocalBusinessJsonLd({ lang = "en" }: { lang?: Language } = {}) {
  const base = "https://www.bmcontractorstz.com";
  const offices = siteConfig.offices;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": base + "/#business",
        name: siteConfig.companyName,
        alternateName: siteConfig.brandName,
        url: base,
        logo: base + "/assets/official-logo.png",
        email: siteConfig.email,
        telephone: siteConfig.sales.raw,
        description: siteConfig.description[lang],
        areaServed: [
          { "@type": "Country", name: "Tanzania" },
          ...siteConfig.coverage.scheduledFieldCities.map((name) => ({
            "@type": "City",
            name,
          })),
          { "@type": "AdministrativeArea", name: "Tanga" },
        ],
        location: [
          { "@id": base + "/contact#moshi-office" },
          { "@id": base + "/contact#arusha-office" },
        ],
        knowsAbout: [
          "CCTV installation",
          "Electric fence installation",
          "Gate automation",
          "Access control",
          "Electrical contracting",
          "Equipment supply",
          "Retail and trade quotations",
          "Solar and backup power",
          "Networking",
          "Public address and sound systems",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            name: "National sales and coordination",
            telephone: siteConfig.sales.raw,
            email: siteConfig.email,
            contactType: "Sales, trade supply and installation enquiries",
            areaServed: "TZ",
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
        // Add sameAs only when the owner has supplied verified profile URLs.
        ...(Object.values(siteConfig.social).some(Boolean)
          ? { sameAs: Object.values(siteConfig.social).filter(Boolean) }
          : {}),
      },
      {
        "@type": "LocalBusiness",
        "@id": base + "/contact#moshi-office",
        name: "BM Contractors — Moshi office",
        branchOf: { "@id": base + "/#business" },
        url: base + "/contact#moshi-office",
        telephone: offices.moshi.phone.raw,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: offices.moshi.streetAddress,
          addressLocality: offices.moshi.city,
          addressRegion: offices.moshi.region,
          addressCountry: offices.moshi.country,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": base + "/contact#arusha-office",
        name: "BM Contractors — Arusha office",
        branchOf: { "@id": base + "/#business" },
        url: base + "/contact#arusha-office",
        telephone: offices.arusha.phone.raw,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          extendedAddress: offices.arusha.locality,
          addressLocality: offices.arusha.city,
          addressRegion: offices.arusha.city,
          addressCountry: offices.arusha.country,
        },
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
