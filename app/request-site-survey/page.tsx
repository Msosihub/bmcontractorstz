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
  }>;
}) {
  const p = await searchParams;
  return (
    <PremiumEnquiry
      lang={p.lang === "sw" ? "sw" : "en"}
      survey
      action={createSiteSurveyRequest}
      service={(p.service || "").slice(0, 100)}
      product={(p.product || "").slice(0, 200)}
      selectedPackage={(p.package || "").slice(0, 200)}
    />
  );
}
