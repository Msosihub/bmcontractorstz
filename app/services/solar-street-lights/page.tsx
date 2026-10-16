/**
 * Solar Street Lights Service Page
 * --------------------------------
 * Public service page for outdoor solar lighting.
 *
 * SEO:
 * - Targets solar street lights for homes, compounds, parking areas and business premises.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { defaultLanguage, isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SolarStreetLightsServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang)
    ? params.lang
    : defaultLanguage;

  return <ServiceDetailPage lang={lang} slug="solar-street-lights" />;
}
