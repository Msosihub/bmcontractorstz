import { PremiumSuccess } from "@/components/premium/Success";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  return (
    <PremiumSuccess lang={(await searchParams).lang === "sw" ? "sw" : "en"} />
  );
}
