import Image from "next/image";
import { CustomerBelt } from "./CustomerBelt";
import type { BeltCustomer } from "@/lib/customer-belt-policy";
import type { Service } from "@prisma/client";
import type { Language } from "@/lib/i18n/config";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { approvedRecordMedia } from "@/lib/approved-record-media";
import { RecordImage } from "@/components/premium/RecordImage";
import copy from "@/data/cctv-commercial.json";
import references from "@/data/cctv-equipment-references.json";
import { CctvPlanner } from "./Planner";
import { cctvLinks } from "./links";
import "./cctv.css";
export function CctvCommercialPage({
  lang,
  record,
  customers = [],
}: {
  lang: Language;
  record?: Service | null;
  customers?: BeltCustomer[];
}) {
  const t = copy[lang],
    sw = lang === "sw",
    links = cctvLinks(lang, sw ? "Ufungaji wa CCTV" : "CCTV installation");
  const anchors = ["plan", "options", "questions"];
  const related = [
    "electric-fence",
    "gate-motors",
    "networking",
    "power-backup",
    "institutional-procurement",
  ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main cctv-commercial">
        <section className="cctv-hero">
          <div className="cctv-hero-copy">
            <p className="eyebrow">
              <a href={"/services?lang=" + lang}>
                {sw ? "HUDUMA" : "OUR EXPERTISE"}
              </a>{" "}
              / CCTV
            </p>
            <p className="cctv-identity">{t.service}</p>
            <h1>
              {t.title}
              <br />
              <em>{t.emphasis}</em>
            </h1>
            <p className="lead">{t.intro}</p>
            <div className="cctv-hero-actions">
              <a className="button dark" href="#plan">
                {sw ? "Angalia vifurushi" : "Explore installation packages"}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="cctv-text-action" href={links.whatsapp}>
                {t.whatsapp} ↗
              </a>
            </div>
            <p className="cctv-territory">{t.territory}</p>
          </div>
          {record && approvedRecordMedia("service", record) ? (
            <RecordImage kind="service" record={record} lang={lang} />
          ) : (
            <figure className="cctv-hero-image">
              <Image
                src="/assets/cctv-1440.webp"
                alt={
                  sw
                    ? "Picha ya mfano ya kamera kwenye mlango; si mradi wa BM"
                    : "Illustrative entrance camera; not a BM installation"
                }
                fill
                priority
                sizes="(max-width:760px) 100vw, 52vw"
              />
            </figure>
          )}
        </section>
        <nav
          className="cctv-jump"
          aria-label={sw ? "Sehemu za ukurasa wa CCTV" : "CCTV page sections"}
        >
          {t.jump.map((x, i) => (
            <a key={x} href={"#" + anchors[i]}>
              <span>0{i + 1}</span>
              {x}
            </a>
          ))}
        </nav>
        <CustomerBelt items={customers} lang={lang} />
        <CctvPlanner lang={lang} />
        <section
          className="cctv-section cctv-lifecycle"
          aria-label={
            sw
              ? "Matengenezo na maandalizi ya CCTV"
              : "CCTV maintenance and construction preparation"
          }
        >
          {t.lifecycle.map((item) => {
            const action = cctvLinks(lang, item.context);
            return (
              <article key={item.context}>
                <p className="eyebrow">{item.label}</p>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <a href={item.survey ? action.survey : action.quote}>
                  {item.action} ↗
                </a>
              </article>
            );
          })}
        </section>
        <section className="cctv-section cctv-options" id="options">
          <div className="cctv-options-intro">
            <div className="cctv-section-heading">
              <p className="eyebrow">{t.optionsLabel}</p>
              <h2>{t.optionsTitle}</h2>
              <p>{t.optionsIntro}</p>
              <div className="cctv-options-actions">
                <a
                  className="button dark"
                  href={cctvLinks(lang, t.optionsContext).whatsapp}
                >
                  {t.optionsAction}
                  <span aria-hidden="true">↗</span>
                </a>
                <a href={cctvLinks(lang, t.optionsContext).survey}>
                  {t.survey} ↗
                </a>
              </div>
            </div>
            <figure className="cctv-consultation">
              <div>
                <Image
                  src="/assets/team-960.webp"
                  fill
                  sizes="(max-width:760px) 100vw, 42vw"
                  alt={
                    sw
                      ? "Mfano wa AI wa watu wakijadili mpango wa eneo; si wafanyakazi au wateja halisi wa BM"
                      : "AI illustration of people discussing a site plan; not actual BM staff or clients"
                  }
                />
              </div>
              <figcaption>
                {sw
                  ? "Mfano wa ushauri · Si wafanyakazi wa BM"
                  : "Illustrative consultation · Not BM staff"}
              </figcaption>
            </figure>
          </div>
          <div className="cctv-option-grid">
            {t.options.map((x, i) => (
              <details key={x.title}>
                <summary>
                  <span className="cctv-option-number">0{i + 1}</span>
                  {x.title}
                </summary>
                <p>{x.body}</p>
              </details>
            ))}
          </div>
          <details className="cctv-discreet">
            <summary>{t.hiddenTitle}</summary>
            <p>{t.hiddenBody}</p>
          </details>
        </section>
        <section className="cctv-hotel">
          <figure>
            <Image
              src="/assets/cctv-commercial/hotel-1440.webp"
              alt={
                sw
                  ? "Mfano wa AI wa mapokezi ya lodge yenye kamera ndogo; si eneo la mteja wa BM"
                  : "AI illustration of discreet CCTV at a lodge reception; not a BM client site"
              }
              fill
              sizes="(max-width:760px) 100vw, 58vw"
            />
          </figure>
          <div>
            <p className="eyebrow">{t.hotelLabel}</p>
            <h2>{t.hotelTitle}</h2>
            <p>{t.hotelBody}</p>
            <a
              href={
                cctvLinks(
                  lang,
                  sw
                    ? "CCTV ya hoteli au ofisi ya utalii"
                    : "Hotel or tour-office CCTV",
                ).survey
              }
            >
              {t.survey} ↗
            </a>
          </div>
        </section>
        <section className="cctv-section cctv-equipment-compact" id="equipment">
          <details className="cctv-brand-details">
            <summary>
              {sw
                ? "Chapa na vifaa vya kifurushi chako"
                : "Brands and equipment in your installation"}
            </summary>
            <h3>{t.brandTitle}</h3>
            <p>{t.brandIntro}</p>
            <p>{t.equipmentBody}</p>
            <ul className="cctv-reference-list">
              {references.products.map((x) => (
                <li key={x.model}>
                  <a href={x.source} target="_blank" rel="noreferrer">
                    {x.brand} {x.model} ↗
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <details className="cctv-solar-note">
            <summary>
              {sw
                ? "Hikvision AOV SolarVu na chaguo za sola/4G"
                : "Hikvision AOV SolarVu and solar/4G options"}
            </summary>
            <p>{t.solarNote}</p>
            <a href={references.solar.source} target="_blank" rel="noreferrer">
              {t.sourceLink} ↗
            </a>
          </details>
          {record && (sw ? record.contentSw : record.contentEn) && (
            <details className="cctv-solar-note">
              <summary>
                {sw
                  ? "Maelezo ya ziada ya huduma kutoka BM"
                  : "Additional BM service information"}
              </summary>
              <p>{sw ? record.contentSw : record.contentEn}</p>
            </details>
          )}
          {record && sw && record.contentEn && !record.contentSw && (
            <p className="scope-note">
              Maelezo ya ziada ya rekodi ya BM bado yanahitaji tafsiri; mwongozo
              wote wa ukurasa huu unapatikana kwa Kiswahili.
            </p>
          )}
        </section>
        <section className="cctv-section cctv-installation" id="installation">
          <div className="cctv-section-heading">
            <p className="eyebrow">{t.deliveryLabel}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <ol>
            {t.process.map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="cctv-section cctv-questions" id="questions">
          <div>
            <p className="eyebrow">{t.technicalLabel}</p>
            <h2>{t.technicalTitle}</h2>
            <p>
              {sw
                ? "Swali lako halipo hapa? Tuulize kuhusu eneo na vifaa vyako."
                : "Not seeing your question? Ask us about your site and equipment."}
            </p>
            <a href={links.whatsapp}>{t.whatsapp} ↗</a>
          </div>
          <div>
            {t.faqs.map((x) => (
              <details key={x.q}>
                <summary>{x.q}</summary>
                <p>{x.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="cctv-final">
          <div>
            <p className="eyebrow">{t.briefLabel}</p>
            <h2>{t.briefTitle}</h2>
            <p>{t.briefBody}</p>
          </div>
          <div className="cctv-final-actions">
            <a className="button light" href={links.quote}>
              {t.quote}
              <span aria-hidden="true">↗</span>
            </a>
            <a href={links.survey}>{t.survey} ↗</a>
            <a href={links.whatsapp}>{t.whatsapp} ↗</a>
            <a href={links.call}>{t.call} · +255 760 111 880</a>
          </div>
        </section>
        <p className="cctv-media-note">{t.mediaNote}</p>
        <nav className="cctv-section cctv-related" aria-label={t.related}>
          <h2>{t.related}</h2>
          <div>
            {t.relatedLinks.map((x, i) => (
              <a key={x} href={"/services/" + related[i] + "?lang=" + lang}>
                {x} ↗
              </a>
            ))}
          </div>
        </nav>
      </main>
      <Footer lang={lang} />
      <nav
        className="cctv-mobile-actions"
        aria-label={sw ? "Wasiliana kuhusu CCTV" : "CCTV enquiry actions"}
      >
        <a href={links.whatsapp}>WhatsApp ↗</a>
        <a href={links.quote}>
          {sw ? "Omba makadirio" : "Request quotation"} ↗
        </a>
      </nav>
    </>
  );
}
