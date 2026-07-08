/**
 * Networking Service Page
 * -----------------------
 * Public service page for networking solutions.
 *
 * SEO:
 * - Strong title and description for office/CCTV networking.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Networking Services in Tanzania",
  description:
    "Office networking, CCTV networking, router setup, switches, Wi-Fi coverage, point-to-point links and troubleshooting in Tanzania.",
  openGraph: {
    title: "Networking Services in Tanzania | BM Contractors",
    description:
      "Networking setup for offices, CCTV systems, routers, switches, Wi-Fi coverage and business connectivity.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function NetworkingServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="networking" />;
}
