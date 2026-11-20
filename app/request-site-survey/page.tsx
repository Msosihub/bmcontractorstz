import { PremiumEnquiry } from "@/components/premium/Enquiry";
import { createSiteSurveyRequest } from "./actions";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    service?: string;
    product?: string;
    package?: string;
    brief?: string;
  }>;
}) {
  const p = await searchParams;
  return (
    <PremiumEnquiry
      lang={p.lang === "sw" ? "sw" : "en"}
      survey
      initialMessage={(p.brief || "").slice(0, 2000)}
      action={createSiteSurveyRequest}
      service={(p.service || "").slice(0, 100)}
      product={(p.product || "").slice(0, 200)}
      selectedPackage={(p.package || "").slice(0, 200)}
    />
  );
}
