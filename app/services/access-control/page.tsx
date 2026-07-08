/**
 * Access Control Service Page
 * ---------------------------
 * Public service page for access control systems.
 *
 * SEO:
 * - Strong title and description for access control and biometric systems.
 */

import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Access Control Systems in Tanzania",
  description:
    "Access control, biometric attendance, magnetic locks, exit buttons and smart door entry systems for offices and businesses in Tanzania.",
  openGraph: {
    title: "Access Control Systems in Tanzania | BM Contractors",
    description:
      "Biometric access control, attendance systems, door locks, controllers, exit buttons and office access management.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AccessControlServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="access-control" />;
}
