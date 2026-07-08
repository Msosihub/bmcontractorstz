/**
 * Gate Motors Service Page
 * ------------------------
 * Public service page for gate motor installation.
 *
 * SEO:
 * - Strong title and description for automatic gate motor services.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Gate Motor Installation in Tanzania",
  description:
    "Automatic gate motor installation, service and support for homes, apartments, offices and businesses in Tanzania.",
  openGraph: {
    title: "Gate Motor Installation in Tanzania | BM Contractors",
    description:
      "Automatic sliding gate motors, swing gate systems, remotes, safety sensors, service and repair support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function GateMotorsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="gate-motors" />;
}
