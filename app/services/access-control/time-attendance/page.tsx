import { notFound } from "next/navigation";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import {
  SolutionPage,
  solutionContent,
} from "@/components/premium/access-control/SolutionPage";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    r = await getServiceRecord("access-control");
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  const c = solutionContent["time-attendance"];
  return pageMetadata("/services/access-control/time-attendance", lang, [
    c.title[lang] + (lang === "en" ? " in Tanzania" : " Tanzania"),
    c.intro[lang],
  ]);
}
export default async function Page({ searchParams }: Props) {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    r = await getServiceRecord("access-control");
  if (r && !r.isPublished) notFound();
  return <SolutionPage kind="time-attendance" lang={lang} />;
}
