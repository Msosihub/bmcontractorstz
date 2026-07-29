/**
 * Air Conditioners Service Page
 * -----------------------------
 * Public service page for air conditioner supply, installation and support.
 *
 * SEO:
 * - Targets AC installation for homes, offices, shops, hotels, lodges and guest houses.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Air Conditioner Installation in Tanzania",
  description:
    "Air conditioner supply, installation and support for homes, offices, shops, hotels, lodges, guest houses and business spaces in Tanzania.",
  openGraph: {
    title: "Air Conditioner Installation in Tanzania | BM Contractors",
    description:
      "AC installation and support for homes, offices, shops, hotels, lodges, guest houses and business premises.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AirConditionersServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="air-conditioners" />;
}
