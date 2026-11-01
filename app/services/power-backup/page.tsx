/**
 * Power Backup Service Page
 * -------------------------
 * Public service page for UPS and backup power.
 *
 * SEO:
 * - Strong title and description for UPS/power backup systems.
 */

import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { isLanguage, type Language } from "@/lib/i18n/config";


type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function PowerBackupServicePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  return <ServiceDetailPage lang={lang} slug="power-backup" />;
}
