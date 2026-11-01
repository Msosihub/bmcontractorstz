/**
 * Air Conditioners Service Page
 * -----------------------------
 * Public service page for air conditioner supply, installation and support.
 *
 * SEO:
 * - Targets AC installation for homes, offices, shops, hotels, lodges and guest houses.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AirConditionersServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="air-conditioners" />;
}
