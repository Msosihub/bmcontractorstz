import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBlogArticle } from "@/lib/blog";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import { solutionLinks } from "@/components/catalogue/links";
import type { Language } from "@/lib/i18n/config";
import "@/components/blog/blog.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const article = getBlogArticle((await params).slug),
    lang: Language = (await searchParams).lang === "sw" ? "sw" : "en";
  if (!article) return { robots: { index: false, follow: false } };
  const m = pageMetadata("/blog/" + article.slug, lang, [
    article.title[lang],
    article.summary[lang],
  ]);
  return {
    ...m,
    openGraph: { ...m.openGraph, type: "article", images: [article.image] },
    twitter: { ...m.twitter, images: [article.image] },
  };
}
export default async function Page({ params, searchParams }: Props) {
  const a = getBlogArticle((await params).slug);
  if (!a) notFound();
  const lang: Language = (await searchParams).lang === "sw" ? "sw" : "en",
    sw = lang === "sw",
    url = languageUrl("/blog/" + a.slug, lang),
    links = solutionLinks(lang, a.title[lang]);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: a.title[lang],
        description: a.summary[lang],
        inLanguage: sw ? "sw-TZ" : "en-TZ",
        mainEntityOfPage: url,
        url,
        image: SITE_URL + a.image,
        author: {
          "@type": "Organization",
          name: "BM Engineering Contractors Limited",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "BM Engineering Contractors Limited",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: sw ? "Mwanzo" : "Home",
            item: languageUrl("/", lang),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: sw ? "Makala" : "Journal",
            item: languageUrl("/blog", lang),
          },
          { "@type": "ListItem", position: 3, name: a.title[lang], item: url },
        ],
      },
    ],
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main bm-blog">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
          }}
        />
        <article>
          <header className="bm-blog-header">
            <a href={`/blog?lang=${lang}`}>
              ← {sw ? "Makala za BM" : "The BM journal"}
            </a>
            <p className="eyebrow">{a.category[lang]}</p>
            <h1>{a.title[lang]}</h1>
            <p className="lead">{a.summary[lang]}</p>
          </header>
          <div
            className={
              "bm-blog-hero" +
              (a.image.includes("zk-d180") ? " bm-guide-product" : "")
            }
          >
            <Image src={a.image} alt={a.alt[lang]} fill priority sizes="88vw" />
          </div>
          <div className="bm-blog-reading">
            {a.sections.map((s) => (
              <section key={s.title.en}>
                <h2>{s.title[lang]}</h2>
                <p>{s.text[lang]}</p>
              </section>
            ))}
            <aside className="bm-blog-cta">
              <h2>
                {sw ? "Tupange suluhisho lako." : "Let’s plan your solution."}
              </h2>
              <p>{a.cta[lang]}</p>
              <a className="button light" href={links.quote}>
                {sw ? "Omba ushauri na nukuu" : "Ask BM for advice & a quote"}{" "}
                ↗
              </a>
              <a href={links.survey}>
                {sw ? "Omba tathmini ya eneo" : "Request a site survey"} ↗
              </a>
            </aside>
            <p className="bm-blog-source">
              <a href={a.source} rel="noopener noreferrer" target="_blank">
                {sw
                  ? "Rejea ya vifaa kutoka kwa mtengenezaji"
                  : "Manufacturer equipment reference"}{" "}
                ↗
              </a>
            </p>
            <nav aria-label={sw ? "Endelea kusoma" : "Continue exploring"}>
              <a href={`/services/${a.service}?lang=${lang}`}>
                {sw ? "Huduma na suluhisho" : "Explore the service"} ↗
              </a>
              {" · "}
              <a href={`/catalogue/zkteco?lang=${lang}`}>
                {sw ? "Katalogi ya ZKTeco" : "ZKTeco catalogue"} ↗
              </a>
            </nav>
          </div>
        </article>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
