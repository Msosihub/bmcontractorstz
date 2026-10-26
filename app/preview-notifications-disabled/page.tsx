import { PremiumArticle } from "@/components/premium/Article";
import { isPreview } from "@/lib/preview-safety.mjs";
import { notFound } from "next/navigation";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  if (!isPreview()) notFound();
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  return (
    <PremiumArticle
      lang={lang}
      title={
        lang === "sw"
          ? "Mazingira binafsi ya majaribio."
          : "Private testing environment."
      }
      intro={
        lang === "sw"
          ? "Arifa za SMS na WhatsApp zimezimwa. Tumia taarifa za kubuni kwa majaribio pekee."
          : "SMS and WhatsApp notifications are disabled. Use synthetic information for testing only."
      }
      enquiry={false}
    >
      <a href={"/?lang=" + lang}>
        {lang === "sw" ? "Rudi kwenye tovuti" : "Return to website"} ↗
      </a>
    </PremiumArticle>
  );
}
