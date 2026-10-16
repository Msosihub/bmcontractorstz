/**
 * CCTV Service Page
 * -----------------
 * Public service page for CCTV installation.
 *
 * SEO:
 * - Strong title and description for CCTV installation in Tanzania.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


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
