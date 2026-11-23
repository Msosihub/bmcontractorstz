import { PremiumSuccess } from "@/components/premium/Success";
import { confirmedEnquiryReceipt } from "@/lib/enquiries/receipt";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; id?: string }>;
}) {
  const p = await searchParams;
  return (
    <PremiumSuccess
      lang={p.lang === "sw" ? "sw" : "en"}
      survey
      id={await confirmedEnquiryReceipt("survey")}
    />
  );
}
