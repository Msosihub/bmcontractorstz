/**
 * Gate Motors Service Page
 * ------------------------
 * Public service page for gate motor installation.
 *
 * SEO:
 * - Strong title and description for automatic gate motor services.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


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
