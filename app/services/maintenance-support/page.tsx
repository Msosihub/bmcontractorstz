/**
 * Maintenance & Support Service Page
 * ----------------------------------
 * Public service page for technical maintenance and after-sales support.
 *
 * SEO:
 * - Targets CCTV maintenance, electric fence troubleshooting, gate motor servicing
 *   and security system support.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


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
