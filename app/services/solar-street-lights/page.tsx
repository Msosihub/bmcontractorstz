/**
 * Solar Street Lights Service Page
 * --------------------------------
 * Public service page for outdoor solar lighting.
 *
 * SEO:
 * - Targets solar street lights for homes, compounds, parking areas and business premises.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Solar Street Lights for Homes and Businesses in Tanzania",
  description:
    "Solar street lights for homes, compounds, gates, parking areas, schools, lodges, guest houses and business premises in Tanzania.",
  openGraph: {
    title: "Solar Street Lights in Tanzania | BM Contractors",
    description:
      "Outdoor solar lighting for home compounds, gates, parking areas, walkways, schools, lodges and business premises.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SolarStreetLightsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="solar-street-lights" />;
}
