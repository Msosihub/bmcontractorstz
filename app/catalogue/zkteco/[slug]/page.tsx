import Image from "next/image";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceEnquiry } from "@/components/catalogue/ReferenceCatalogue";
import {
  zktecoProducts,
  zktecoCategories,
  referenceStatus,
} from "@/lib/catalogue/zkteco";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [{ slug }, q] = await Promise.all([params, searchParams]),
    lang = isLanguage(q.lang) ? q.lang : "en",
    p = zktecoProducts.find((p) => p.slug === slug);
  if (!p) return { robots: { index: false, follow: false } };
  return pageMetadata("/catalogue/zkteco/" + slug, lang, [
    p.name +
      (lang === "sw"
        ? " — Bei na Ufungaji Tanzania"
        : " — Equipment & Installation Tanzania"),
    p.summary[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, q] = await Promise.all([params, searchParams]),
    lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    p = zktecoProducts.find((p) => p.slug === slug);
  if (!p) notFound();
  const base = "/catalogue/zkteco",
    json = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          name: p.name,
          brand: { "@type": "Brand", name: p.brand },
          description: p.summary[lang],
          image: p.images.map((i) => "https://www.bmcontractorstz.com" + i.src),
          url: languageUrl(base + "/" + slug, lang),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: sw ? "Udhibiti wa milango" : "Access control",
              item: languageUrl("/services/access-control", lang),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "ZKTeco",
              item: languageUrl(base, lang),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: p.name,
              item: languageUrl(base + "/" + slug, lang),
            },
          ],
        },
      ],
    };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(json).replace(/</g, "\\u003c"),
          }}
        />
        <nav
          className="ac-section rc-breadcrumb"
          aria-label={sw ? "Njia ya ukurasa" : "Breadcrumb"}
        >
          <a href={`/services/access-control?lang=${lang}`}>
            {sw ? "Udhibiti wa milango" : "Access control"}
          </a>
          <span>/</span>
          <a href={`${base}?lang=${lang}`}>ZKTeco</a>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
        <section className="ac-section rc-detail-hero">
          <div className="rc-detail-art">
            <Image
              src={p.images[0].src}
              width={640}
              height={640}
              priority
              sizes="(max-width:800px) 90vw, 45vw"
              alt={p.images[0].alt}
            />
            <p className="ac-note">
              {referenceStatus[p.classification][lang]} ·{" "}
              {sw ? "Picha ya mtengenezaji" : "Manufacturer photograph"}
            </p>
          </div>
          <div className="rc-detail-copy">
            <p className="eyebrow">
              ZKTECO / {zktecoCategories[p.category][lang]}
            </p>
            <h1>{p.name}</h1>
            <p className="lead">{p.summary[lang]}</p>
            <ReferenceEnquiry p={p} lang={lang} />
          </div>
        </section>
        <section className="ac-section ac-sage rc-specs">
          <div className="ac-two">
            <div>
              <p className="eyebrow">
                {sw ? "VIPIMO NA UCHAGUZI" : "SPECIFICATIONS & SELECTION"}
              </p>
              <h2>
                {sw ? "Modeli sahihi ina maana." : "The exact model matters."}
              </h2>
              <p>{p.compatibility[lang]}</p>
              <p className="ac-note">
                {sw
                  ? "Taarifa zimehakikiwa 2 Novemba 2026. Toleo halisi, nyaraka za sasa na tathmini ya eneo ndizo huongoza ufungaji."
                  : "Reviewed 2 November 2026. The exact supplied revision, current manufacturer documentation and site assessment govern installation."}
              </p>
            </div>
            <dl>
              {p.specs.map((s) => (
                <div key={s.label.en}>
                  <dt>{s.label[lang]}</dt>
                  <dd>{s.value[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rc-documents">
            {p.documents.map((d) => (
              <a href={d.url} key={d.url} target="_blank" rel="noreferrer">
                {d.label[lang]} ↗
              </a>
            ))}
          </div>
          <p className="ac-note">
            {sw
              ? "Nyaraka za ziada zinaweza kuhitaji akaunti ya mtengenezaji. Hakuna installer inayohifadhiwa au kupakuliwa hapa."
              : "Additional manuals may require a manufacturer account. No software installer is hosted or downloaded here."}
          </p>
        </section>
        <section className="ac-section">
          <h2>
            {sw
              ? "Endelea na suluhisho zima."
              : "Continue with the complete solution."}
          </h2>
          <nav
            className="ac-actions"
            aria-label={sw ? "Huduma zinazohusiana" : "Related solutions"}
          >
            <a href={`/services/access-control?lang=${lang}`}>
              {sw ? "Milango na programu" : "Door access & software"} ↗
            </a>
            <a href={`/services/access-control/time-attendance?lang=${lang}`}>
              {sw ? "Mahudhurio ya wafanyakazi" : "Staff attendance"} ↗
            </a>
            <a href={`/services/access-control/smart-locks?lang=${lang}`}>
              {sw ? "Makufuli na hoteli" : "Smart locks & hotels"} ↗
            </a>
          </nav>
          <div className="rc-grid">
            {p.related
              .map((id) => zktecoProducts.find((x) => x.slug === id))
              .filter((x) => !!x)
              .map((x) => (
                <ReferenceCard
                  key={x.slug}
                  p={x}
                  lang={lang}
                  namespace={base}
                />
              ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
