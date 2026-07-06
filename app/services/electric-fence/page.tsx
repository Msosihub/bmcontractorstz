/**
 * Electric Fence Service Page
 * ---------------------------
 * Individual service page for Electric Fence.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ElectricFencePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="electric-fence" />;
}
