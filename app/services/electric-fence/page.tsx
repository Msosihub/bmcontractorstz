/**
 * Electric Fence Service Page
 * ---------------------------
 * Public service page for electric fence installation.
 *
 * SEO:
 * - Strong title and description for electric fence services in Tanzania.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Electric Fence Installation in Tanzania",
  description:
    "Electric fence installation for homes, compounds, businesses, schools, warehouses and institutions in Tanzania. Request a BM Contractors site survey.",
  openGraph: {
    title: "Electric Fence Installation in Tanzania | BM Contractors",
    description:
      "Electric fence planning, energizer selection, HT wire installation, insulators, earth rods and support.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ElectricFenceServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="electric-fence" />;
}
