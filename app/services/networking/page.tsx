/**
 * Networking Service Page
 * -----------------------
 * Public service page for networking solutions.
 *
 * SEO:
 * - Strong title and description for office/CCTV networking.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function NetworkingServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="networking" />;
}
