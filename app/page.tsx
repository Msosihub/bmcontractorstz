import Homepage from "@/components/premium/Homepage";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  return <Homepage lang={(await searchParams).lang === "sw" ? "sw" : "en"} />;
}
