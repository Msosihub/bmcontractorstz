import { centurionProducts } from "@/lib/catalogue/provider";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GateAutomationPage } from "@/components/premium/gate-automation/Page";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    r = await getServiceRecord("gate-motors");
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  return pageMetadata(
    "/services/gate-motors",
    lang,
    lang === "en"
      ? [
          "CENTURION Gate Motor Installation, Equipment & Repairs",
          "Sliding and swing gate automation, garage doors and traffic barriers in Tanzania. Explore CENTURION SMΔRT+ equipment and request a site survey in Moshi or Arusha.",
        ]
      : [
          "Ufungaji na Matengenezo ya Mota za Geti za CENTURION",
          "Mota za geti za kuteleza na bawaba, gereji na vizuizi vya magari Tanzania. Chunguza SMΔRT+ na uombe ukaguzi wa eneo Moshi au Arusha.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    record = await getServiceRecord("gate-motors");
  if (record && !record.isPublished) notFound();
  const products = await centurionProducts();
  return <GateAutomationPage lang={lang} record={record} products={products} />;
}
