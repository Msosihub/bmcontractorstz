/**
 * Fire Alarm Systems Service Page
 * -------------------------------
 * Public service page for fire detection and alarm systems.
 *
 * SEO:
 * - Targets fire alarm systems, smoke detectors, heat detectors and building safety.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Fire Alarm Systems in Tanzania",
  description:
    "Fire alarm systems for offices, schools, shops, warehouses, apartments and commercial buildings in Tanzania. Smoke detectors, heat detectors, call points and alarm panels.",
  openGraph: {
    title: "Fire Alarm Systems in Tanzania | BM Contractors",
    description:
      "Fire alarm installation with smoke detectors, heat detectors, manual call points, sounders, control panels and testing support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function FireAlarmSystemsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="fire-alarm-systems" />;
}
