/**
 * Solar Panel Systems Service Page
 * --------------------------------
 * Public service page for solar power systems.
 *
 * SEO:
 * - Targets solar panels, solar backup and solar power solutions for homes and businesses.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Solar Panel Systems in Tanzania",
  description:
    "Solar panel systems for homes, offices, shops, lodges, guest houses and business premises in Tanzania. Solar backup planning, batteries and inverter guidance.",
  openGraph: {
    title: "Solar Panel Systems in Tanzania | BM Contractors",
    description:
      "Solar panel system planning, battery backup guidance, inverter capacity guidance, installation and support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SolarPanelSystemsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="solar-panel-systems" />;
}
