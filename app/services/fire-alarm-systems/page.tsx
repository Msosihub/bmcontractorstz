/**
 * Fire Alarm Systems Service Page
 * -------------------------------
 * Public service page for fire detection and alarm systems.
 *
 * SEO:
 * - Targets fire alarm systems, smoke detectors, heat detectors and building safety.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function FireAlarmSystemsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="fire-alarm-systems" />;
}
