import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo, EnquiryLink } from "./Frame";
import type { Language } from "@/lib/i18n/config";
import services from "@/data/premium-services.json";
import type { Service } from "@prisma/client";
export function PremiumService({
  slug,
  lang,
  record,
}: {
  slug: string;
  lang: Language;
  record?: Service | null;
}) {
  const s = services.find((x) => x.slug === slug)!;
  const base = s[lang];
  const t = record
    ? {
        ...base,
        name: lang === "sw" ? record.titleSw || record.titleEn : record.titleEn,
        intro:
          lang === "sw"
            ? record.descriptionSw || record.descriptionEn || base.intro
            : record.descriptionEn || base.intro,
      }
    : base;
  return (
    <>
      <Header lang={lang} />
      <main className="premium-main" id="main">
        <section className="service-hero">
          <div>
            <p className="eyebrow">
              <a href={"/services?lang=" + lang}>
                {lang === "sw" ? "HUDUMA ZETU" : "OUR EXPERTISE"}
              </a>{" "}
              / {t.name}
            </p>
            <h1>{t.headline}</h1>
            <p className="lead">{t.intro}</p>
            {record &&
              lang === "sw" &&
              (!record.titleSw || !record.descriptionSw) && (
                <p className="scope-note">
                  Baadhi ya maelezo ya huduma hii bado yako kwa Kiingereza.
                </p>
              )}
            <EnquiryLink lang={lang} subject={t.name} />
          </div>
          <Photo asset={s.asset} lang={lang} />
        </section>
        <section className="section technical">
          <div>
            <p className="eyebrow">
              {lang === "sw" ? "KAZI INAVYOPANGWA" : "A CONSIDERED SCOPE"}
            </p>
            <h2>{t.scopeHeadline}</h2>
            <p className="scope-note">
              {lang === "sw"
                ? "Kazi, vifaa, nyaraka na masharti ya utekelezaji hukubaliwa baada ya tathmini. Huu ni mwongozo wa maombi, si cheti cha kiufundi au ahadi ya upatikanaji."
                : "Equipment, documentation and delivery scope are agreed after assessment. This is an enquiry guide, not certification or a stock commitment."}
            </p>
          </div>
          <div className="technical-sections">
            {record &&
              (lang === "sw"
                ? record.contentSw || record.contentEn
                : record.contentEn) && (
                <article>
                  <p className="eyebrow">
                    {lang === "sw" ? "MAELEZO YA HUDUMA" : "SERVICE RECORD"}
                  </p>
                  <p>
                    {lang === "sw"
                      ? record.contentSw || record.contentEn
                      : record.contentEn}
                  </p>
                </article>
              )}

            {t.sections.map((x, i) => (
              <article key={x.title}>
                <p className="eyebrow">0{i + 1}</p>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="brief-band">
          <div>
            <p className="eyebrow">
              {lang === "sw" ? "TUAJIE NA MAELEZO" : "BRING US YOUR BRIEF"}
            </p>
            <h2>
              {lang === "sw"
                ? "Mazungumzo yenye\nmaelezo yanayofaa."
                : "A better brief.\nA useful next step."}
            </h2>
          </div>
          <div>
            <ul>
              {t.requirements.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <EnquiryLink lang={lang} subject={t.name} />
          </div>
        </section>
        <section className="section related">
          <p className="eyebrow">
            {lang === "sw" ? "MIFUMO INAYOHUSIANA" : "CONNECTED EXPERTISE"}
          </p>
          {services
            .filter(
              (x) =>
                ([
                  "generators",
                  "solar-panel-systems",
                  "power-backup",
                  "electrical-contracting",
                ].includes(slug)
                  ? [
                      "generators",
                      "solar-panel-systems",
                      "power-backup",
                      "electrical-contracting",
                    ]
                  : [
                        "networking",
                        "telephone-systems",
                        "institutional-procurement",
                      ].includes(slug)
                    ? [
                        "networking",
                        "telephone-systems",
                        "institutional-procurement",
                      ]
                    : ["cctv", "electric-fence", "gate-motors"]
                ).includes(x.slug) && x.slug !== slug,
            )
            .map((x) => (
              <a key={x.slug} href={"/services/" + x.slug + "?lang=" + lang}>
                {x[lang].name}
                <span>↗</span>
              </a>
            ))}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
