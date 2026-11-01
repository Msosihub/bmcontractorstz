/**
 * Solar Panel Systems Service Page
 * --------------------------------
 * Public service page for solar power systems.
 *
 * SEO:
 * - Targets solar panels, solar backup and solar power solutions for homes and businesses.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SolarPanelSystemsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="solar-panel-systems" />;
}
