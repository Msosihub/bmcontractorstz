import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { blogArticles } from "@/lib/blog";
import "./blog.css";
export function GuideCards({
  lang,
  service,
}: {
  lang: Language;
  service?: string;
}) {
  const articles = blogArticles.filter(
    (a) => !service || a.service === service,
  );
  const Heading = service ? "h3" : "h2";
  return (
    <div className="bm-guide-grid">
      {articles.map((a) => (
        <article key={a.slug} className="bm-guide-card">
          <a
            href={`/blog/${a.slug}?lang=${lang}`}
            className={
              a.image.includes("zk-d180")
                ? "bm-guide-image bm-guide-product"
                : "bm-guide-image"
            }
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={a.image}
              alt=""
              fill
              sizes="(max-width:700px) 100vw, 33vw"
            />
          </a>
          <div>
            <p className="eyebrow">{a.category[lang]}</p>
            <Heading>
              <a href={`/blog/${a.slug}?lang=${lang}`}>
                {a.title[lang]} <span aria-hidden="true">↗</span>
              </a>
            </Heading>
            <p>{a.summary[lang]}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
export function RelatedGuides({
  lang,
  service,
}: {
  lang: Language;
  service: string;
}) {
  if (!blogArticles.some((a) => a.service === service)) return null;
  return (
    <section className="bm-related-guides" aria-labelledby="bm-guides-title">
      <div className="bm-guide-heading">
        <div>
          <p className="eyebrow">
            {lang === "sw"
              ? "SOMA KWA DAKIKA CHACHE"
              : "A FEW MINUTES. A CLEARER CHOICE."}
          </p>
          <h2 id="bm-guides-title">
            {lang === "sw"
              ? "Fahamu kabla ya kuchagua."
              : "Understand before you choose."}
          </h2>
        </div>
        <a href={`/blog?lang=${lang}`}>
          {lang === "sw" ? "Makala za BM" : "The BM journal"} ↗
        </a>
      </div>
      <GuideCards lang={lang} service={service} />
    </section>
  );
}
