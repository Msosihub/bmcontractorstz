import { getPublicService } from "@/lib/services";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { pageMetadata, SITE_URL, publicPages } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const context = await headers();
  const lang = context.get("x-bm-language") === "sw" ? "sw" : "en";
  const path = context.get("x-bm-path") || "/";
  let localized = pageMetadata(path, lang);
  if (path.startsWith("/services/")) {
    const service = await getPublicService(path.split("/").pop() || "");
    if (service) {
      const title = publicPages[path]?.[lang][0] || (lang === "sw" ? service.titleSw : service.titleEn) || service.titleEn;
      const description = (lang === "sw" ? service.descriptionSw : service.descriptionEn) || (lang === "sw" ? "Omba ushauri na ukaguzi wa eneo kutoka BM Contractors." : "Request guidance and a site survey from BM Contractors.");
      localized = pageMetadata(path, lang, [title, description], Boolean(service.titleSw && service.descriptionSw && service.contentSw));
    }
  }
  return {
    metadataBase: new URL(SITE_URL),
    ...localized,
    icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
  };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const context = await headers();
  const lang = context.get("x-bm-language") === "sw" ? "sw" : "en";
  return <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
    <body className="min-h-full flex flex-col"><LocalBusinessJsonLd />{children}</body>
  </html>;
}
