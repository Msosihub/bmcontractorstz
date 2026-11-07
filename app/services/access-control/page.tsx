import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccessPage } from "@/components/premium/access-control/Page";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    r = await getServiceRecord("access-control");
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  return pageMetadata(
    "/services/access-control",
    lang,
    lang === "en"
      ? [
          "ZKTeco Access Control, Time Attendance & Smart Locks Tanzania",
          "Door access, fingerprint and face attendance, hotel locks and ZKTeco software. Explore equipment and request installation or maintenance in Moshi, Arusha and Tanzania.",
        ]
      : [
          "ZKTeco: Udhibiti wa Milango, Mahudhurio na Makufuli Janja",
          "Mifumo ya ZKTeco ya milango, mahudhurio ya fingerprint/uso, makufuli ya hoteli na programu. Omba vifaa, ufungaji au matengenezo Moshi, Arusha na Tanzania.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    record = await getServiceRecord("access-control");
  if (record && !record.isPublished) notFound();
  return <AccessPage lang={lang} record={record} />;
}
