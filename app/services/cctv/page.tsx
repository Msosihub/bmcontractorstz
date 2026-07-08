/**
 * CCTV Service Page
 * -----------------
 * Public service page for CCTV installation.
 *
 * SEO:
 * - Strong title and description for CCTV installation in Tanzania.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "CCTV Installation in Tanzania",
  description:
    "Professional CCTV camera installation for homes, shops, offices, schools, warehouses and businesses in Tanzania. Request a BM Contractors site survey.",
  openGraph: {
    title: "CCTV Installation in Tanzania | BM Contractors",
    description:
      "CCTV camera installation, DVR/NVR setup, HDD recording, remote viewing and site survey support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function CctvServicePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="cctv" />;
}
