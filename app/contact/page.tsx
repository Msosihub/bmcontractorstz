import { PremiumEnquiry } from "@/components/premium/Enquiry";
import { createContactMessage } from "./actions";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; subject?: string }>;
}) {
  const p = await searchParams;
  return (
    <PremiumEnquiry
      lang={p.lang === "sw" ? "sw" : "en"}
      action={createContactMessage}
      service={(p.subject || "").slice(0, 200)}
    />
  );
}
