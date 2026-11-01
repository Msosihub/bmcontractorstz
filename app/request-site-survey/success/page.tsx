import { PremiumSuccess } from "@/components/premium/Success";
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
      id={p.id?.slice(0, 100)}
    />
  );
}
