import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  return (
    <ServiceDetailPage
      slug="electrical-contracting"
      lang={(await searchParams).lang === "sw" ? "sw" : "en"}
    />
  );
}
