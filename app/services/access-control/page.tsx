/**
 * Access Control Service Page
 * ---------------------------
 * Public service page for access control systems.
 *
 * SEO:
 * - Strong title and description for access control and biometric systems.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AccessControlServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="access-control" />;
}
