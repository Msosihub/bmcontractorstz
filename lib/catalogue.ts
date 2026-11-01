export type CatalogueProduct = { slug: string; name: string; brand: string | null; price: number | null; imageUrl: string | null; description: string | null; category: { nameEn: string; nameSw: string | null } | null };
export type CataloguePackage = { slug: string; titleEn: string; titleSw: string | null; descriptionEn: string | null; descriptionSw: string | null; cameras: number; priceFrom: number | null; includedItems: string[] };
export function formatCataloguePrice(price: number | null, lang: "en" | "sw") {
 return price === null ? (lang === "sw" ? "Uliza bei" : "Request price") : "TZS " + price.toLocaleString("en-US");
}
