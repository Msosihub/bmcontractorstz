import type { Metadata } from "next";
import { getCustomerBelt } from "@/lib/customer-belt";
import { notFound } from "next/navigation";
import { CctvCommercialPage } from "@/components/premium/cctv/Page";
import copy from "@/data/cctv-commercial.json";
import { getServiceRecord } from "@/lib/services";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
type PageProps = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const p = await searchParams,
    lang: Language = isLanguage(p.lang) ? p.lang : "en";
  const record = await getServiceRecord("cctv");
  if (record && !record.isPublished)
    return { robots: { index: false, follow: false } };
  return pageMetadata("/services/cctv", lang, [
    copy[lang].metaTitle,
    copy[lang].metaDescription,
  ]);
}
export default async function CctvServicePage({ searchParams }: PageProps) {
  const p = await searchParams,
    lang: Language = isLanguage(p.lang) ? p.lang : "en";
  const record = await getServiceRecord("cctv");
  if (record && !record.isPublished) notFound();
  const customers = await getCustomerBelt();
  return (
    <CctvCommercialPage
      lang={lang}
      record={record}
      customers={customers.items}
    />
  );
}
