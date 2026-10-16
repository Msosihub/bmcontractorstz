/**
 * Video Intercom Service Page
 * ---------------------------
 * Public service page for video intercom systems.
 *
 * SEO:
 * - Targets video intercom, gate communication and visitor entry control.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function VideoIntercomServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="video-intercom" />;
}
