import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  return (
    <ServiceDetailPage
      slug="institutional-procurement"
      lang={(await searchParams).lang === "sw" ? "sw" : "en"}
    />
  );
}
