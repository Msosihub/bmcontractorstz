import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ExperienceMotion } from "@/components/premium/ExperienceMotion";
import chapters from "@/data/electrical-contracting.json";
import { getServiceRecord } from "@/lib/services";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import type { Language } from "@/lib/i18n/config";
import "./electrical.css";
import { EquipmentGuide } from "./EquipmentGuide";
const path = "/services/electrical-contracting";
type Props = { searchParams: Promise<{ lang?: string }> };
const seo = {
  en: [
    "Electrical Engineering & Industrial Contracting Tanzania | BM Contractors",
    "Commercial and industrial electrical contracting, panels, motor controls, transformers, power infrastructure and maintenance across Tanzania. Request a technical quotation.",
  ],
  sw: [
    "Uhandisi na Ukandarasi wa Umeme Tanzania | BM Contractors",
    "Ukandarasi wa umeme wa majengo na viwanda, paneli, udhibiti wa mota, transfoma, miundombinu na matengenezo Tanzania. Omba nukuu ya kiufundi.",
  ],
} satisfies Record<Language, [string, string]>;
export async function generateMetadata({ searchParams }: Props) {
  const { lang } = await searchParams;
  return pageMetadata(
    path,
    lang === "sw" ? "sw" : "en",
    seo[lang === "sw" ? "sw" : "en"],
  );
}
export default async function Page({ searchParams }: Props) {
  const [params, record] = await Promise.all([
    searchParams,
    getServiceRecord("electrical-contracting"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang: Language = params.lang === "sw" ? "sw" : "en",
    sw = lang === "sw",
    l = sw ? 1 : 0;
  const brief = (scope: string) =>
    sw
      ? `Wigo: ${scope}\nEneo la mradi:\nAina ya jengo/kiwanda:\nUmeme uliopo au unaopangwa:\nVoltage (ikiwa unajua):\nMizigo ya vifaa na matumizi:\nVifaa pekee / ufungaji / tathmini / vipimo / matengenezo:\nBOQ au michoro iliyopo:\nMuda unaohitaji:`
      : `Scope: ${scope}\nProject location:\nBuilding/facility type:\nExisting or proposed supply:\nVoltage, if known:\nEquipment loads and use:\nSupply / installation / assessment / testing / maintenance:\nBOQ or drawings available:\nTimeframe:`;
  const quote = (scope: string) =>
    `/contact?${new URLSearchParams({ lang, subject: (sw ? "Umeme — " : "Electrical — ") + scope, brief: brief(scope) })}`;
  const survey = (scope: string) =>
    `/request-site-survey?${new URLSearchParams({ lang, service: scope.slice(0, 100), brief: brief(scope) })}`;
  const actions = (scope: string) => (
    <div className="ee-actions">
      <a className="ee-link" href={quote(scope)}>
        {sw ? "Jadili wigo wa kazi" : "Discuss this scope"}
        <span aria-hidden="true">↗</span>
      </a>
      <a href={survey(scope)}>
        {sw ? "Panga tathmini" : "Plan an assessment"} ↗
      </a>
    </div>
  );
  const detail = (c: (typeof chapters)[number]) => (
    <details className="ee-details">
      <summary>
        {sw
          ? "Wigo wa kiufundi na taarifa za kuandaa"
          : "Technical scope & what to prepare"}
        <span aria-hidden="true">+</span>
      </summary>
      <ul>
        {c.details.map((d, i) => (
          <li key={i}>{d[l]}</li>
        ))}
      </ul>
    </details>
  );
  const copy = (c: (typeof chapters)[number]) => (
    <div className="ee-copy">
      <p className="ee-eyebrow">
        {c.letter} / {c.title[l]}
      </p>
      <h2 id={`ee-${c.id}`}>{c.headline[l]}</h2>
      <p>{c.intro[l]}</p>
      <span className="ee-scope">{c.scope[l]}</span>
      {detail(c)}
      {actions(c.title[l])}
    </div>
  );
  const image = (src: string, alt: string) => (
    <div className="ee-photo">
      <Image src={src} alt={alt} fill sizes="(max-width:760px) 100vw, 52vw" />
    </div>
  );
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": languageUrl(path, lang) + "#service",
        name: sw
          ? "Uhandisi na ukandarasi wa umeme"
          : "Electrical engineering and contracting",
        serviceType: sw
          ? "Ukandarasi, ufungaji na ugavi wa vifaa vya umeme wa majengo, viwanda na miundombinu"
          : "Commercial, industrial and infrastructure electrical contracting, installation and equipment supply",
        provider: { "@id": SITE_URL + "/#business" },
        areaServed: { "@type": "Country", name: "Tanzania" },
        url: languageUrl(path, lang),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: sw ? "Mwanzo" : "Home", item: languageUrl("/", lang) },
          {
            name: sw ? "Huduma" : "Services",
            item: languageUrl("/services", lang),
          },
          {
            name: sw ? "Uhandisi wa umeme" : "Electrical engineering",
            item: languageUrl(path, lang),
          },
        ].map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })),
      },
    ],
  };
  const faqs = sw
    ? [
        [
          "Nahitaji kuandaa nini kabla ya nukuu?",
          "Tuma eneo, matumizi ya jengo au mitambo, umeme uliopo au unaopangwa, orodha ya vifaa, muda wa mradi na BOQ/michoro ikiwa ipo. Tutafafanua taarifa zinazohitaji tathmini ya eneo.",
        ],
        [
          "Naweza kuomba vifaa pekee?",
          "Ndiyo. Taja vipimo, idadi, modeli inapohitajika na masharti ya kukabidhi. Tutathibitisha bei ya sasa, upatikanaji na uoanifu katika nukuu yako.",
        ],
        [
          "Mnapokea maombi ya miradi mikubwa ya miundombinu?",
          "Ndiyo. Tuma eneo, sehemu ya kuunganishia, mahitaji ya mzigo, michoro au BOQ na muda wa mradi. Tutapanga mahitaji ya uhandisi, vifaa na utekelezaji kulingana na mradi wako.",
        ],
        [
          "Mnaweza kupanga kazi kwenye jengo linalotumika?",
          "Tathmini huangalia ufikiaji, mizigo muhimu na muda wa kuzima mfumo. Mpango na ruhusa za kazi hukubaliwa pamoja na msimamizi wa eneo kabla ya utekelezaji.",
        ],
      ]
    : [
        [
          "What should I prepare for a technical quotation?",
          "Share the location, facility or process, existing/proposed supply, equipment loads, timeframe and available BOQ/drawings. We identify the points needing a site assessment before finalizing scope.",
        ],
        [
          "Can I request equipment supply only?",
          "Yes. Include specifications, quantities, model references where relevant and acceptance requirements. We confirm current prices, availability and compatibility in your quotation.",
        ],
        [
          "Can I enquire about a large infrastructure project?",
          "Yes. Share the location, supply connection, load requirements, drawings or BOQ and timeframe. We define the engineering, equipment and delivery requirements around your project.",
        ],
        [
          "Can work be planned around an occupied facility?",
          "Assessment considers access, essential loads and shutdown windows. The work plan and permits are agreed with the facility’s responsible team before execution.",
        ],
      ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="ee-main">
        <ExperienceMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section className="ee-hero">
          <div className="ee-hero-copy">
            <nav
              className="ee-breadcrumb"
              aria-label={sw ? "Njia ya ukurasa" : "Breadcrumb"}
            >
              <a href={`/?lang=${lang}`}>BM</a>
              <span>/</span>
              <a href={`/services?lang=${lang}`}>
                {sw ? "Huduma" : "Services"}
              </a>
              <span>/ {sw ? "Umeme" : "Electrical"}</span>
            </nav>
            <p className="ee-eyebrow">
              {sw
                ? "UHANDISI WA UMEME · UKANDARASI"
                : "ELECTRICAL ENGINEERING · CONTRACTING"}
            </p>
            <h1>
              {sw ? (
                <>
                  Miundombinu ya umeme.<em>Kwa majengo na viwanda.</em>
                </>
              ) : (
                <>
                  Powering buildings.<em>Supporting industry.</em>
                </>
              )}
            </h1>
            <p>
              {sw
                ? "Usambazaji wa umeme, paneli na mifumo ya mitambo. Anza na mahitaji halisi ya eneo lako—tutafafanua vifaa, kazi na mpango unaofaa."
                : "Power distribution, panels and plant electrical systems. Start with what your facility needs—we’ll help define the equipment, work and delivery plan."}
            </p>
            <div className="ee-hero-actions">
              <a
                className="ee-button"
                href={survey(
                  sw
                    ? "Tathmini ya kiufundi ya umeme"
                    : "Electrical technical assessment",
                )}
              >
                {sw
                  ? "Omba tathmini ya kiufundi"
                  : "Request technical assessment"}{" "}
                ↗
              </a>
              <a href="#ee-boq">
                {sw ? "Una michoro au BOQ?" : "Discuss drawings / BOQ"} ↘
              </a>
            </div>
            <p className="ee-registration">
              CRB Class V <span>·</span>{" "}
              {sw
                ? "Tathmini na nukuu za kiufundi"
                : "Technical assessment & quotations"}
            </p>
          </div>
          <div className="ee-hero-image">
            <Image
              src="/images/electrical-contracting/industrial-hero.webp"
              alt={
                sw
                  ? "Timu ya kiufundi ikipanga kazi katika chumba cha usambazaji wa umeme"
                  : "Technical planning in an industrial distribution room"
              }
              fill
              sizes="(max-width:760px) 100vw, 58vw"
              priority
            />
            <span>
              {sw
                ? "Panga. Linda. Endeleza shughuli."
                : "Plan. Protect. Keep operations moving."}
            </span>
          </div>
        </section>
        <nav
          className="ee-intents ee-wrap"
          aria-label={
            sw ? "Anza na hitaji lako" : "Start with your requirement"
          }
        >
          {[
            [
              "commercial",
              "01",
              sw ? "Mradi mpya au upanuzi" : "A new project or expansion",
            ],
            [
              "reliability",
              "02",
              sw ? "Tatizo au matengenezo" : "A fault or maintenance need",
            ],
            ["boq", "03", sw ? "Vifaa, BOQ au RFQ" : "Equipment, BOQ or RFQ"],
          ].map(([id, n, title]) => (
            <a key={id} href={`#${id === "boq" ? "ee-boq" : id}`}>
              <small>{n}</small>
              <strong>{title}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <nav
          className="ee-index ee-wrap"
          aria-label={sw ? "Sehemu za huduma" : "Explore the electrical scope"}
        >
          {chapters.map((c) => (
            <a href={`#${c.id}`} key={c.id}>
              {c.letter} <span>{c.title[l]}</span>
            </a>
          ))}
        </nav>
        <div className="ee-equipment-shortcut ee-wrap">
          <a href="#equipment">
            {sw
              ? "Angalia vifaa na omba nukuu"
              : "Explore equipment & request a quotation"}{" "}
            ↓
          </a>
        </div>
        <section
          className="ee-diagram ee-wrap"
          data-bm-belt
          aria-labelledby="ee-flow-title"
        >
          <div>
            <p className="ee-eyebrow">
              {sw ? "FIKIRIA MFUMO MZIMA" : "SEE THE WHOLE SYSTEM"}
            </p>
            <h2 id="ee-flow-title">
              {sw
                ? "Kutoka kwenye chanzo, hadi kwenye shughuli."
                : "From incoming power to everyday operations."}
            </h2>
          </div>
          <figure>
            <div className="ee-flow-rail">
              {[
                sw ? "Umeme unaoingia" : "Incoming supply",
                sw ? "Isolation na ulinzi" : "Isolation & protection",
                sw ? "Bodi kuu ya usambazaji" : "Main distribution board",
              ].map((x, i) => (
                <div className="ee-flow-node" key={x}>
                  <small>0{i + 1}</small>
                  <strong>{x}</strong>
                  {i < 2 && (
                    <svg viewBox="0 0 100 20" aria-hidden="true">
                      <path d="M0 10H96" />
                      <path className="ee-current" d="M0 10H96" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="ee-loads">
              {[
                sw
                  ? "Saketi za taa na soketi"
                  : "Protected lighting & socket circuits",
                sw
                  ? "Feeder ya MCC / VFD / mota"
                  : "Protected MCC / VFD / motor feeder",
                sw
                  ? "Usambazaji wa mizigo muhimu"
                  : "Protected essential-load distribution",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="ee-earth">
              PE /{" "}
              {sw
                ? "Earthing na bonding vimepangwa tofauti na njia za mzigo."
                : "Protective earthing & bonding are separate from the normal load-current path."}
            </p>
            <figcaption>
              {sw
                ? "Muhtasari wa dhana; usanifu wa eneo huamua mpango halisi na ulinzi. Si mchoro wa kufungia au mwongozo wa switching."
                : "Conceptual overview. Site design determines the actual arrangement and protection; this is not a wiring or switching instruction."}
            </figcaption>
          </figure>
        </section>
        <section
          id="commercial"
          className="ee-editorial ee-wrap"
          aria-labelledby="ee-commercial"
        >
          {copy(chapters[0])}
          {image(
            "/assets/electrical-1440.webp",
            sw
              ? "Mpangilio wa paneli na njia za nyaya za jengo"
              : "Building electrical distribution and cable containment",
          )}
        </section>
        <section
          id="panels"
          className="ee-panel-section"
          aria-labelledby="ee-panels"
        >
          <div className="ee-wrap ee-editorial">
            {image(
              "/images/electrical-contracting/industrial-hero.webp",
              sw
                ? "Safu ya paneli za usambazaji zilizofungwa"
                : "Closed distribution switchboard lineup",
            )}
            {copy(chapters[1])}
          </div>
        </section>
        <section
          id="industrial"
          className="ee-editorial ee-wrap"
          aria-labelledby="ee-industrial"
        >
          {copy(chapters[2])}
          {image(
            "/images/electrical-contracting/pumping-station.webp",
            sw
              ? "Pampu na mota zenye njia za nyaya zilizopangwa"
              : "Pumps and motor assemblies with organized electrical containment",
          )}
        </section>
        <section
          id="infrastructure"
          className="ee-infrastructure"
          aria-labelledby="ee-infrastructure"
        >
          <div className="ee-infra-image">
            <Image
              src="/images/electrical-contracting/substation.webp"
              alt={
                sw
                  ? "Mandhari ya transfoma na switchgear ndani ya uzio"
                  : "A fenced transformer and switchgear infrastructure setting"
              }
              fill
              sizes="100vw"
            />
          </div>
          <div className="ee-wrap">{copy(chapters[3])}</div>
        </section>
        <section
          id="reliability"
          className="ee-reliability ee-wrap"
          aria-labelledby="ee-reliability"
        >
          {copy(chapters[4])}
          <aside>
            <p className="ee-eyebrow">
              {sw ? "VIPIMO VYENYE LENGO" : "A PURPOSEFUL TEST PLAN"}
            </p>
            {[
              sw ? "Hali ya ufungaji" : "Installation condition",
              sw ? "Hitilafu na ulinzi" : "Faults & protection",
              sw ? "Ubora wa umeme" : "Power quality",
              sw ? "Ripoti na matengenezo" : "Reporting & maintenance",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
              </div>
            ))}
          </aside>
        </section>
        <div className="ee-special-wrap">
          <div className="ee-wrap ee-special-grid">
            <section id="specialized" aria-labelledby="ee-specialized">
              {copy(chapters[5])}
            </section>
            <section id="interfaces" aria-labelledby="ee-interfaces">
              {copy(chapters[6])}
            </section>
          </div>
        </div>
        <EquipmentGuide lang={lang} enquiryUrl={quote} />
        <section
          className="ee-delivery ee-wrap"
          aria-labelledby="ee-delivery-title"
        >
          <p className="ee-eyebrow">
            {sw
              ? "KUTOKA KWENYE OMBI HADI MAKABIDHIANO"
              : "FROM BRIEF TO HANDOVER"}
          </p>
          <h2 id="ee-delivery-title">
            {sw
              ? "Wigo wazi. Hatua zinazoeleweka."
              : "A clear scope. A considered delivery."}
          </h2>
          <ol>
            {(sw
              ? [
                  ["Fafanua", "Matumizi, eneo, mizigo na nyaraka zilizopo."],
                  [
                    "Tathmini",
                    "Hali ya eneo, ufikiaji, mizigo na mahitaji ya vipimo.",
                  ],
                  [
                    "Kubali mpango",
                    "Vipimo vya vifaa, wigo, ruhusa, muda na majukumu.",
                  ],
                  [
                    "Kagua na kabidhi",
                    "Majaribio yaliyokubaliwa, nyaraka na mpango wa huduma.",
                  ],
                ]
              : [
                  [
                    "Define",
                    "Use, location, loads and available documentation.",
                  ],
                  [
                    "Assess",
                    "Site conditions, access, loads and testing requirements.",
                  ],
                  [
                    "Agree",
                    "Specifications, scope, permits, timing and responsibilities.",
                  ],
                  [
                    "Check & hand over",
                    "Agreed testing, records and support arrangements.",
                  ],
                ]
            ).map(([t, d], i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <p className="ee-scope-note">
            {sw
              ? "Nyaraka za sifa za kiufundi na usajili wa kampuni zinapatikana kwa tathmini ya mradi na ununuzi kwa kuombwa."
              : "Technical qualifications and company registration documents are available for project and procurement evaluation upon request."}
          </p>
        </section>
        <section id="ee-boq" className="ee-boq">
          <div className="ee-wrap">
            <div>
              <p className="ee-eyebrow">
                BOQ / RFQ / {sw ? "MICHORO" : "DRAWINGS"}
              </p>
              <h2>
                {sw
                  ? "Tugeuze mahitaji yako kuwa wigo wa nukuu."
                  : "Turn your requirement into a quotable scope."}
              </h2>
              <p>
                {sw
                  ? "Eneo, aina ya jengo au kiwanda, umeme na mizigo, wigo wa kazi na muda. BOQ au michoro ikiwa ipo, tuombe njia ya kuituma kwa usalama."
                  : "Location, facility type, supply and loads, work scope and timeframe. If you have a BOQ or drawings, ask us how to share them securely."}
              </p>
              <div className="ee-hero-actions">
                <a
                  className="ee-button"
                  href={quote(
                    sw
                      ? "Mapitio ya BOQ na RFQ ya umeme"
                      : "Electrical BOQ and RFQ review",
                  )}
                >
                  {sw ? "Anza ombi la kiufundi" : "Start a technical brief"} ↗
                </a>
                <a
                  href={survey(
                    sw
                      ? "Tathmini ya umeme ya jengo au kiwanda"
                      : "Commercial or industrial electrical assessment",
                  )}
                >
                  {sw ? "Panga tathmini ya eneo" : "Arrange a site assessment"}{" "}
                  ↗
                </a>
              </div>
            </div>
            <aside>
              <p>{sw ? "ANDAA TAARIFA HIZI" : "HAVE THESE READY"}</p>
              <ul>
                {(sw
                  ? [
                      "Eneo na matumizi ya jengo/kiwanda",
                      "Umeme uliopo/unaopangwa; voltage ikiwa unajua",
                      "Orodha ya mizigo, wigo na muda",
                      "BOQ, michoro na masharti ya ununuzi",
                    ]
                  : [
                      "Location and facility/process type",
                      "Existing/proposed supply; voltage if known",
                      "Load list, scope and timeframe",
                      "BOQ, drawings and procurement requirements",
                    ]
                ).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <a
                className="ee-qualification-link"
                href={quote(
                  sw
                    ? "Nyaraka za sifa za kampuni kwa mradi au zabuni"
                    : "Company qualifications for a project or tender",
                )}
              >
                {sw
                  ? "Omba nyaraka za kampuni"
                  : "Request company qualifications"}{" "}
                ↗
              </a>
              <a className="ee-project-call" href="tel:+255760111880">
                {sw ? "Simu ya miradi" : "Project enquiries"}: +255 760 111 880
                ↗
              </a>
            </aside>
          </div>
        </section>
        <section className="ee-faq ee-wrap" aria-labelledby="ee-faq-title">
          <h2 id="ee-faq-title">
            {sw ? "Maswali kabla ya kuanza." : "Before the project starts."}
          </h2>
          <div>
            {faqs.map(([q, a]) => (
              <details className="ee-details" key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <nav
          className="ee-related ee-wrap"
          aria-label={
            sw
              ? "Huduma na mwongozo unaohusiana"
              : "Related services & planning guide"
          }
        >
          {[
            ["generators", "Generators & ATS", "Jenereta na ATS"],
            ["solar-panel-systems", "Solar PV", "Sola PV"],
            ["power-backup", "UPS & backup", "UPS na umeme wa akiba"],
            ["fire-alarm-systems", "Fire alarms", "Tahadhari ya moto"],
            ["networking", "ICT & networking", "ICT na mitandao"],
            [
              "institutional-procurement",
              "Institutional procurement",
              "Ununuzi wa taasisi",
            ],
          ].map(([slug, en, ks]) => (
            <a key={slug} href={`/services/${slug}?lang=${lang}`}>
              {sw ? ks : en} ↗
            </a>
          ))}
          <a href={`/blog/preparing-an-electrical-project-brief?lang=${lang}`}>
            {sw
              ? "Mwongozo: andaa ombi la umeme"
              : "Guide: prepare an electrical brief"}{" "}
            ↗
          </a>
        </nav>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
