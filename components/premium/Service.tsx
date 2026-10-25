import { approvedRecordMedia } from "@/lib/approved-record-media";
import { RecordImage } from "./RecordImage";
import relations from "@/data/service-relations.json";
import { SpecialistDetail } from "./SpecialistDetail";
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
  // Reviewed bilingual editorial guidance; CMS publication and supplemental content remain authoritative.
  const t = s[lang];
  const relation = relations[slug as keyof typeof relations];
  return (
    <>
      <Header lang={lang} />
      <main className="premium-main" id="main">
        <section className="service-hero">
          <div>
            <p className="eyebrow">
              <a href={"/services?lang=" + lang}>
                {lang === "sw" ? "HUDUMA ZETU" : "OUR EXPERTISE"}
              </a>
            </p>
            <p className="service-identity">{t.name}</p>
            <h1>{t.headline}</h1>
            <p className="lead">{t.intro}</p>
            {record &&
              lang === "sw" &&
              Boolean(record.contentEn) &&
              !record.contentSw && (
                <p className="scope-note">
                  Maelezo ya ziada kutoka rekodi ya huduma bado yako kwa
                  Kiingereza.
                </p>
              )}
            <EnquiryLink lang={lang} subject={t.name} />
            {slug !== "institutional-procurement" && (
              <a
                className="institutional-brief"
                href={"/services/institutional-procurement?lang=" + lang}
              >
                {lang === "sw"
                  ? "Una BOQ au ombi la taasisi?"
                  : "Have a BOQ or institutional RFQ?"}{" "}
                ↗
              </a>
            )}
          </div>
          {record && approvedRecordMedia("service", record) ? (
            <RecordImage kind="service" record={record} lang={lang} />
          ) : (
            <Photo asset={s.asset} lang={lang} />
          )}
        </section>
        <section className="section technical">
          <div>
            <p className="eyebrow">
              {lang === "sw" ? "KAZI INAVYOPANGWA" : "A CONSIDERED SCOPE"}
            </p>
            <h2>{t.scopeHeadline}</h2>
            <h3>{lang === "sw" ? "Inafaa kwa nani?" : "Who is it for?"}</h3>
            <p>{t.applications}</p>
            <p className="scope-note">
              {lang === "sw"
                ? "Kazi, vifaa, nyaraka na masharti ya utekelezaji hukubaliwa baada ya tathmini. "
                : "Your quotation should set out the assessed equipment, installation, documentation and agreed delivery terms."}
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
        <section className="section service-method">
          <article>
            <p className="eyebrow">
              {lang === "sw" ? "VIFAA NA MPANGILIO" : "EQUIPMENT & APPROACH"}
            </p>
            <h2>
              {lang === "sw"
                ? "Chaguo linaloongozwa na mahitaji."
                : "Selection follows the requirement."}
            </h2>
            <p>{t.equipment}</p>
            <a
              href={
                "/products?lang=" +
                lang +
                "&q=" +
                encodeURIComponent(relation?.equipmentQuery || "")
              }
            >
              {lang === "sw"
                ? "Angalia vifaa na mwongozo wa vipimo"
                : "Explore equipment & specification guidance"}{" "}
              ↗
            </a>
          </article>
          <div>
            <article>
              <h3>
                {lang === "sw"
                  ? "Tathmini, ufungaji na makabidhiano"
                  : "Assessment, installation & handover"}
              </h3>
              <p>{t.delivery}</p>
            </article>
            <article>
              <h3>
                {lang === "sw"
                  ? "Matengenezo na huduma baada ya ufungaji"
                  : "Maintenance & ongoing care"}
              </h3>
              <p>{t.maintenance}</p>
            </article>
          </div>
        </section>
        <SpecialistDetail slug={slug} lang={lang} />
        <section className="section service-faq">
          <div>
            <p className="eyebrow">
              {lang === "sw" ? "KABLA YA KUAMUA" : "BEFORE YOU DECIDE"}
            </p>
            <h2>
              {lang === "sw"
                ? "Maswali yanayosaidia kupanga."
                : "Questions worth asking."}
            </h2>
          </div>
          <div>
            {t.faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
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
                relation?.related.includes(x.slug) &&
                x.slug !== "institutional-procurement",
            )
            .map((x) => (
              <a key={x.slug} href={"/services/" + x.slug + "?lang=" + lang}>
                {x[lang].name}
                <span>↗</span>
              </a>
            ))}
          {slug !== "institutional-procurement" && (
            <a href={"/services/institutional-procurement?lang=" + lang}>
              {lang === "sw"
                ? "Ununuzi wa taasisi na orodha za vifaa"
                : "Institutional procurement & equipment schedules"}
              <span>↗</span>
            </a>
          )}
          {slug === "cctv" && (
            <a href={"/cctv-packages?lang=" + lang}>
              {lang === "sw" ? "Vifurushi vya CCTV" : "CCTV packages"}
              <span>↗</span>
            </a>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
