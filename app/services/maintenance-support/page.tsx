/**
 * Maintenance & Support Service Page
 * ----------------------------------
 * Public service page for technical maintenance and after-sales support.
 *
 * SEO:
 * - Targets CCTV maintenance, electric fence troubleshooting, gate motor servicing
 *   and security system support.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Security System Maintenance & Support in Tanzania",
  description:
    "Maintenance and support for CCTV, electric fence, gate motors, access control, networking and power backup systems in Tanzania.",
  openGraph: {
    title: "Security System Maintenance & Support in Tanzania | BM Contractors",
    description:
      "CCTV maintenance, remote viewing support, electric fence troubleshooting, gate motor servicing, network support and backup power guidance.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function MaintenanceSupportServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="maintenance-support" />;
}
