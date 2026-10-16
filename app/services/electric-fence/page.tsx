/**
 * Electric Fence Service Page
 * ---------------------------
 * Public service page for electric fence installation.
 *
 * SEO:
 * - Strong title and description for electric fence services in Tanzania.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


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
