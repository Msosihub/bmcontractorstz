import { PremiumEnquiry } from "@/components/premium/Enquiry";
import { createContactMessage } from "./actions";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    subject?: string;
    brief?: string;
    service?: string;
    product?: string;
    package?: string;
  }>;
}) {
  const p = await searchParams;
  return (
    <PremiumEnquiry
      lang={p.lang === "sw" ? "sw" : "en"}
      initialMessage={(p.brief || "").slice(0, 3000)}
      action={createContactMessage}
      service={(p.subject || p.service || "").slice(0, 200)}
      product={(p.product || "").slice(0, 200)}
      selectedPackage={(p.package || "").slice(0, 200)}
    />
  );
}
