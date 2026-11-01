import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ElectricFenceCommercialPage } from "@/components/premium/electric-fence/Page";
import copy from "@/data/electric-fence-commercial.json";
import { getServiceRecord } from "@/lib/services";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
type PageProps = {
    searchParams: Promise<{
        lang?: string;
    }>;
};
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const p = await searchParams, lang: Language = isLanguage(p.lang) ? p.lang : "en";
    const record = await getServiceRecord("electric-fence");
    if (record && !record.isPublished)
        return { robots: { index: false, follow: false } };
    return pageMetadata("/services/electric-fence", lang, [copy[lang].metaTitle, copy[lang].metaDescription]);
}
export default async function ElectricFenceServicePage({ searchParams }: PageProps) {
    const p = await searchParams, lang: Language = isLanguage(p.lang) ? p.lang : "en";
    const record = await getServiceRecord("electric-fence");
    if (record && !record.isPublished)
        notFound();
    return <ElectricFenceCommercialPage lang={lang} record={record}/>;
}
