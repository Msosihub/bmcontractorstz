import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GuideCards } from "@/components/blog/Guides";
import { pageMetadata } from "@/lib/seo";
import type { Language } from "@/lib/i18n/config";
import "@/components/blog/blog.css";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const lang: Language = (await searchParams).lang === "sw" ? "sw" : "en";
  return pageMetadata(
    "/blog",
    lang,
    lang === "sw"
      ? [
          "Makala za BM: Usalama na Teknolojia Tanzania",
          "Miongozo mifupi kuhusu mahudhurio, milango na vifaa vya usalama. Fahamu chaguo zako na omba ushauri au nukuu kutoka BM Contractors.",
        ]
      : [
          "The BM Journal: Security & Technology Guides Tanzania",
          "Short, practical guides to attendance, access control and security equipment. Understand your options and request advice or a quotation from BM Contractors.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const lang: Language = (await searchParams).lang === "sw" ? "sw" : "en",
    sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main bm-blog">
        <header className="bm-blog-header">
          <p className="eyebrow">{sw ? "MAKALA ZA BM" : "THE BM JOURNAL"}</p>
          <h1>
            {sw
              ? "Teknolojia inayoeleweka. Chaguo lenye maana."
              : "Technology, understood. Better decisions, made."}
          </h1>
          <p className="lead">
            {sw
              ? "Miongozo mifupi kwa nyumba, biashara na taasisi Tanzania. Maelezo yanayokusaidia kuchagua, kupanga na kuuliza maswali sahihi."
              : "Short reads for homes, businesses and institutions in Tanzania. Practical explanations to help you choose, plan and ask the right questions."}
          </p>
        </header>
        <section
          className="bm-blog-list"
          aria-label={sw ? "Makala" : "Articles"}
        >
          <GuideCards lang={lang} />
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
