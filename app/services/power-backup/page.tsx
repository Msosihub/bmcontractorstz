/**
 * Power Backup Service Page
 * -------------------------
 * Public service page for UPS and backup power.
 *
 * SEO:
 * - Strong title and description for UPS/power backup systems.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Power Backup & UPS Solutions in Tanzania",
  description:
    "UPS and backup power solutions for CCTV systems, routers, NVRs, access control, offices and business equipment in Tanzania.",
  openGraph: {
    title: "Power Backup & UPS Solutions in Tanzania | BM Contractors",
    description:
      "Backup power planning, UPS selection, power protection and support for security and office systems.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function PowerBackupServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="power-backup" />;
}
