/**
 * Video Intercom Service Page
 * ---------------------------
 * Public service page for video intercom systems.
 *
 * SEO:
 * - Targets video intercom, gate communication and visitor entry control.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Video Intercom Systems in Tanzania",
  description:
    "Video intercom systems for homes, apartments, offices, gates and reception areas in Tanzania. Visitor communication, door station setup and electric lock integration.",
  openGraph: {
    title: "Video Intercom Systems in Tanzania | BM Contractors",
    description:
      "Video intercom installation for gates, homes, apartments, offices and reception areas with visitor communication and smart entry support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function VideoIntercomServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="video-intercom" />;
}
