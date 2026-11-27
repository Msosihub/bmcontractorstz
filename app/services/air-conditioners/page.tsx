import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getServiceRecord } from "@/lib/services";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import { isLanguage } from "@/lib/i18n/config";
import {
  climateLinks,
  climateProducts,
  climateCategories,
} from "@/lib/catalogue/air-conditioning";
import {
  climateApproaches,
  climatePlaces,
  climateServices,
  climateTechnologies,
  climateFAQs,
} from "@/data/climate";
import { MultiRoom } from "./MultiRoom";
import { ClimateHeroImage } from "./HeroImage";
import { HeroAirflow } from "./HeroAirflow";
import "./climate.css";
type Props = { searchParams: Promise<{ lang?: string }> };
const path = "/services/air-conditioners";
const meta = {
  en: [
    "Air Conditioning Installation & HVAC Tanzania | BM Contractors",
    "AC supply, installation, repair and maintenance in Moshi, Arusha and Tanzania. Gree, Hisense and LG references, multi-split and commercial HVAC assessment.",
  ],
  sw: [
    "Ufungaji na Matengenezo ya Viyoyozi Tanzania | BM Contractors",
    "Ufungaji, usambazaji na matengenezo ya AC Moshi, Arusha na Tanzania. Rejea za Gree, Hisense na LG, multi-split na tathmini ya HVAC za majengo.",
  ],
} satisfies Record<string, [string, string]>;
export async function generateMetadata({ searchParams }: Props) {
  const [q, r] = await Promise.all([
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en",
    m = pageMetadata(path, lang, meta[lang]);
  return {
    ...m,
    openGraph: {
      ...m.openGraph,
      images: ["/images/air-conditioning/hero.webp"],
    },
  };
}
export default async function Page({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    links = climateLinks(
      lang,
      t(
        "AC supply, installation and maintenance",
        "Usambazaji, ufungaji na matengenezo ya viyoyozi",
      ),
    ),
    intent = (en: string, ki: string) => climateLinks(lang, t(en, ki));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: meta[lang][0],
    description: meta[lang][1],
    serviceType:
      "Air conditioning supply, installation, assessment and maintenance",
    provider: {
      "@type": "Organization",
      name: "BM Engineering Contractors Limited",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Tanzania" },
    url: languageUrl(path, lang),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="hv-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <header className="hv-hero">
          <ClimateHeroImage
            alt={t(
              "Comfort-focused hotel suite with a discreetly installed wall-mounted air conditioner",
              "Chumba cha hoteli chenye kiyoyozi cha ukutani kilichounganishwa kwa ustadi",
            )}
          />
          <div className="hv-hero-shade" />
          <HeroAirflow />
          <div className="hv-wrap hv-hero-copy">
            <p className="hv-kicker">
              {t(
                "AIR CONDITIONING · HVAC · TECHNICAL CARE",
                "VIYOYOZI · HVAC · HUDUMA ZA KIUFUNDI",
              )}
            </p>
            <h1>
              {t("Comfort, engineered", "Hali nzuri, iliyopangwa")}
              <em>{t("for every space.", "kwa kila nafasi.")}</em>
            </h1>
            <p className="hv-hero-title">
              {t(
                "Professional Air Conditioning & Climate Control Solutions",
                "Suluhisho za Kitaalamu za Viyoyozi na Hali ya Ndani",
              )}
            </p>
            <p className="hv-hero-lead">
              {t(
                "From one room to a whole building. Supply, installation and maintenance shaped around your space—and the people in it.",
                "Kutoka chumba kimoja hadi jengo zima. Usambazaji, ufungaji na matengenezo kulingana na eneo lako—na watu wanaolitumia.",
              )}
            </p>
            <div className="hv-actions">
              <a className="hv-button hv-button-light" href={links.quote}>
                {t("Request an AC quotation", "Omba makadirio ya AC")} ↗
              </a>
              <a className="hv-link hv-hero-link" href="#solutions">
                {t("Explore AC solutions", "Tazama suluhisho za AC")} ↓
              </a>
            </div>
            <span className="hv-hero-note">
              {t(
                "Rooms. Buildings. Long-term care.",
                "Vyumba. Majengo. Huduma endelevu.",
              )}
            </span>
          </div>
        </header>
        <nav
          className="hv-jump"
          aria-label={t(
            "Air conditioning page sections",
            "Sehemu za ukurasa wa viyoyozi",
          )}
        >
          {[
            ["solutions", t("Your space", "Eneo lako")],
            ["multiroom", t("Multi-room AC", "AC ya vyumba vingi")],
            ["equipment", t("Equipment", "Vifaa")],
            ["maintenance", t("Servicing & repairs", "Matengenezo")],
            ["technologies", t("Advanced climate", "Teknolojia mpya")],
          ].map(([id, label]) => (
            <a href={"#" + id} key={id}>
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <section className="hv-wrap hv-section" id="solutions">
          <Breadcrumbs id="air-conditioners" lang={lang} />
          <div className="hv-section-head">
            <div>
              <p className="hv-kicker">
                {t(
                  "START WITH THE SPACE. NOT JUST THE BOX.",
                  "ANZA NA ENEO. SI KIFAA PEKEE.",
                )}
              </p>
              <h2>
                {t("The right comfort.", "Hali inayofaa.")}
                <em>{t("The right system.", "Mfumo unaofaa.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "A bedroom, a busy reception and an entire hotel have different demands. We help you compare the equipment and the installation as one considered solution.",
                "Chumba cha kulala, mapokezi yenye shughuli na hoteli nzima vina mahitaji tofauti. Linganisha vifaa na ufungaji kama suluhisho moja lililopangwa.",
              )}
            </p>
          </div>
          <div className="hv-approaches">
            {climateApproaches.map((a, i) => (
              <article key={a.id}>
                <span className="hv-number">0{i + 1}</span>
                <p className="hv-kicker">{a[lang][1]}</p>
                <h3>{a[lang][0]}</h3>
                <p>{a[lang][2]}</p>
                <a
                  className="hv-link"
                  href={
                    a.id === "multi"
                      ? "#multiroom"
                      : intent(a.en[1], a.sw[1]).survey
                  }
                >
                  {t("Find the right fit", "Pata chaguo linalofaa")} ↗
                </a>
              </article>
            ))}
          </div>
        </section>
        <section id="multiroom" className="hv-multi-section">
          <div className="hv-wrap">
            <div className="hv-section-head">
              <div>
                <p className="hv-kicker">
                  GREE FREE MATCH /{" "}
                  {t("MULTI-ROOM THINKING", "MPANGO WA VYUMBA VINGI")}
                </p>
                <h2>
                  {t("One outdoor unit.", "Kifaa kimoja nje.")}
                  <em>{t("Multiple rooms.", "Vyumba vingi ndani.")}</em>
                </h2>
              </div>
              <div>
                <p>
                  {t(
                    "Keep more of your exterior clear. A compatible multi-split system can serve several indoor spaces, with room controls and equipment combinations selected for the project.",
                    "Punguza msongamano wa vifaa nje ya jengo. Multi-split inayofaa inaweza kuhudumia vyumba kadhaa, kwa vidhibiti na vifaa vilivyochaguliwa kwa mradi.",
                  )}
                </p>
                <a
                  className="hv-link"
                  href={
                    intent(
                      "Multi-room AC assessment",
                      "Tathmini ya AC ya vyumba vingi",
                    ).survey
                  }
                >
                  {t("Plan my rooms together", "Panga vyumba vyangu pamoja")} ↗
                </a>
              </div>
            </div>
            <MultiRoom sw={sw} />
            <div className="hv-multi-bottom">
              <p>
                {t(
                  "Less outdoor clutter. Flexible indoor placement. Room-by-room control where supported.",
                  "Vifaa vichache nje. Nafasi mbalimbali za vifaa ndani. Udhibiti wa kila chumba pale mfumo unaporuhusu.",
                )}
              </p>
              <details>
                <summary>
                  {t(
                    "Free Match, Super Free Match or VRF?",
                    "Free Match, Super Free Match au VRF?",
                  )}
                </summary>
                <p>
                  {t(
                    "Gree documents Free Match and Super Free Match multi-split families; GMV belongs to its VRF range. They are not interchangeable labels. We verify the exact outdoor model, matching indoor units, simultaneous load, pipe lengths, voltage and control requirements. No particular unit is promised to serve four rooms simply because this illustration shows four.",
                    "Gree ina familia za Free Match na Super Free Match za multi-split; GMV ni familia ya VRF. Si majina yanayobadilishana. Hakiki modeli ya nje, vifaa vya ndani, matumizi ya pamoja, urefu wa mabomba, voltage na vidhibiti. Mfano wa vyumba vinne si ahadi kwamba kila kifaa kitavihudumia.",
                  )}
                </p>
                <a
                  href="https://global.gree.com/upload/files/2022/4/2022_Europe_Residential_Air_Conditioner_Catal.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(
                    "Gree manufacturer family reference",
                    "Rejea ya familia kutoka Gree",
                  )}{" "}
                  ↗
                </a>
              </details>
            </div>
          </div>
        </section>
        <section className="hv-commercial" id="places">
          <div className="hv-wrap hv-editorial">
            <div className="hv-editorial-photo">
              <Image
                src="/images/air-conditioning/commercial.webp"
                width={1672}
                height={941}
                sizes="(max-width:760px) 89vw, 48vw"
                alt={t(
                  "Modern meeting space with a ceiling cassette and a separate ventilation grille",
                  "Chumba cha mikutano chenye cassette ya darini na grili tofauti ya uingizaji hewa",
                )}
              />
              <span>
                {t(
                  "Comfort belongs in the plan.",
                  "Hali nzuri ianze kwenye mpango.",
                )}
              </span>
            </div>
            <div>
              <p className="hv-kicker">
                {t("BUILT AROUND HOW YOU USE IT", "KULINGANA NA MATUMIZI YAKO")}
              </p>
              <h2>
                {t("A better place", "Eneo bora")}
                <em>
                  {t(
                    "to live. To work. To stay.",
                    "la kuishi. Kufanya kazi. Kukaa.",
                  )}
                </em>
              </h2>
              <div className="hv-place-list">
                {climatePlaces.map((p) => (
                  <details key={p.id}>
                    <summary>{p[lang][0]}</summary>
                    <p>{p[lang][1]}</p>
                    <a
                      className="hv-link"
                      href={climateLinks(lang, p[lang][0]).survey}
                    >
                      {t("Assess this space", "Tathmini eneo hili")} ↗
                    </a>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="equipment" className="hv-wrap hv-section">
          <div className="hv-section-head">
            <div>
              <p className="hv-kicker">
                {t("GREE · HISENSE · LG", "GREE · HISENSE · LG")}
              </p>
              <h2>
                {t("Choose the format.", "Chagua aina.")}
                <em>{t("Then specify the system.", "Kisha ainisha mfumo.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "Wall-mounted, cassette, concealed or building-wide. Explore genuine manufacturer families; current regional models, prices and availability are confirmed in your quotation.",
                "Ya ukutani, cassette, iliyofichwa au ya jengo zima. Tazama familia halisi za watengenezaji; modeli, bei na upatikanaji huthibitishwa kwenye makadirio.",
              )}
            </p>
          </div>
          <div className="hv-category-links">
            {Object.entries(climateCategories).map(([id, name]) => (
              <a
                key={id}
                href={
                  ["fixed-speed", "floor-standing", "accessories"].includes(id)
                    ? climateLinks(lang, name[lang]).quote
                    : `/catalogue/air-conditioning?lang=${lang}&category=${id}`
                }
              >
                {name[lang]} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="hv-caption">
            {t(
              "Inverter describes capacity control, not a separate indoor-unit shape. Non-inverter, floor-standing and installation-material options remain model-specific enquiries, not invented stocked products.",
              "Inverter inaeleza udhibiti wa uwezo, si umbo tofauti la kifaa cha ndani. Non-inverter, AC za kusimama na vifaa vya ufungaji huuliziwa kwa modeli; si bidhaa za stock zilizobuniwa.",
            )}
          </p>
          <div className="hv-product-preview">
            {["gree-pular", "hisense-freematch", "lg-multi-v-s"].map((slug) => {
              const p = climateProducts.find((x) => x.slug === slug)!;
              return (
                <article key={p.slug}>
                  <a
                    className="hv-device"
                    href={`/catalogue/air-conditioning/${p.slug}?lang=${lang}`}
                  >
                    <Image
                      src={p.images[0].src}
                      width={800}
                      height={700}
                      sizes="(max-width:760px) 89vw, 28vw"
                      alt={p.images[0].alt}
                    />
                  </a>
                  <p className="hv-kicker">
                    {p.brand} / {climateCategories[p.category][lang]}
                  </p>
                  <h3>
                    <a
                      href={`/catalogue/air-conditioning/${p.slug}?lang=${lang}`}
                    >
                      {p.name}
                    </a>
                  </h3>
                  <p>{p.summary[lang]}</p>
                  <a
                    className="hv-link"
                    href={
                      climateLinks(
                        lang,
                        t(
                          "Equipment only / current price",
                          "Vifaa pekee / bei ya sasa",
                        ),
                        p.brand + " " + p.name,
                      ).quote
                    }
                  >
                    {t("Request Current Price", "Omba bei ya sasa")} ↗
                  </a>
                </article>
              );
            })}
          </div>
          <div className="hv-actions">
            <a
              className="hv-button"
              href={`/catalogue/air-conditioning?lang=${lang}`}
            >
              {t(
                "Explore the AC equipment guide",
                "Tazama mwongozo wa vifaa vya AC",
              )}{" "}
              ↗
            </a>
            <a className="hv-link" href={links.quote}>
              {t(
                "Quote the complete installation",
                "Omba makadirio ya ufungaji kamili",
              )}{" "}
              ↗
            </a>
          </div>
        </section>
        <section id="maintenance" className="hv-care">
          <div className="hv-wrap hv-editorial">
            <div className="hv-editorial-photo">
              <Image
                src="/images/air-conditioning/maintenance.webp"
                width={1672}
                height={941}
                sizes="(max-width:760px) 89vw, 48vw"
                alt={t(
                  "Technician inspecting an isolated wall-mounted AC filter from a stable stepladder",
                  "Fundi akikagua filter ya AC iliyotengwa na umeme kwa kutumia ngazi imara",
                )}
              />
            </div>
            <div>
              <p className="hv-kicker">
                {t(
                  "ALREADY HAVE AC? BUILDING SOMETHING NEW?",
                  "UNA AC TAYARI? UNAJENGA?",
                )}
              </p>
              <h2>
                {t("Install it well.", "Funga kwa ustadi.")}
                <em>{t("Keep it working.", "Iendelee kufanya kazi.")}</em>
              </h2>
              {climateServices.map((s, i) => (
                <details key={i}>
                  <summary>{s[lang][0]}</summary>
                  <p>{s[lang][1]}</p>
                  <a
                    className="hv-link"
                    href={climateLinks(lang, s[lang][2]).quote}
                  >
                    {s[lang][2]} ↗
                  </a>
                </details>
              ))}
              <p className="hv-caption">
                {t(
                  "Specialist refrigerant, electrical and commercial commissioning work is scoped around the required competency, environmental and safety requirements.",
                  "Kazi maalumu za refrigerant, umeme na commissioning zipangwe kulingana na ujuzi, masharti ya mazingira na usalama yanayohitajika.",
                )}
              </p>
            </div>
          </div>
        </section>
        <section id="technologies" className="hv-wrap hv-section">
          <div className="hv-section-head">
            <div>
              <p className="hv-kicker">
                {t(
                  "ADVANCED CLIMATE TECHNOLOGIES",
                  "TEKNOLOJIA ZA HALI YA NDANI",
                )}
              </p>
              <h2>
                {t("Think beyond", "Fikiria zaidi ya")}
                <em>{t("a single room.", "chumba kimoja.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "Explore what could suit your next building. These are manufacturer-verified technology directions for project assessment—not claims of BM stock, universal compatibility or established specialist delivery.",
                "Tazama kinachoweza kufaa jengo lako lijalo. Hizi ni teknolojia za watengenezaji kwa tathmini ya mradi—si madai ya stock ya BM, uoanifu wa kila kifaa au huduma maalumu iliyothibitishwa.",
              )}
            </p>
          </div>
          <div className="hv-tech-list">
            {climateTechnologies.map((x, i) => (
              <details key={x.id}>
                <summary>
                  <span>0{i + 1}</span>
                  {x[lang][0]}
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{x[lang][1]}</p>
                <div className="hv-actions">
                  <a
                    className="hv-link"
                    href={
                      intent(
                        "Feasibility assessment: " + x.en[0],
                        "Tathmini ya uwezekano: " + x.sw[0],
                      ).survey
                    }
                  >
                    {t("Discuss feasibility", "Jadili uwezekano")} ↗
                  </a>
                  <a
                    className="hv-source"
                    href={x.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("Manufacturer reference", "Rejea ya mtengenezaji")} ↗
                  </a>
                </div>
              </details>
            ))}
          </div>
          <div className="hv-related">
            <a href={`/services/solar-panel-systems?lang=${lang}`}>
              {t("Solar Engineering", "Uhandisi wa Sola")} ↗
            </a>
            <a href={`/services/power-backup?lang=${lang}`}>
              {t("Power continuity", "Umeme wa akiba")} ↗
            </a>
            <a href={`/services/electrical-contracting?lang=${lang}`}>
              {t("Electrical integration", "Uunganishaji wa umeme")} ↗
            </a>
            <a href={`/services/institutional-procurement?lang=${lang}`}>
              {t("Institutional procurement", "Manunuzi ya taasisi")} ↗
            </a>
          </div>
        </section>
        <section className="hv-guide">
          <div className="hv-wrap hv-guide-layout">
            <article>
              <p className="hv-kicker">
                {t("A SHORT BM GUIDE", "MWONGOZO MFUPI WA BM")}
              </p>
              <h2>
                {t("Four rooms.", "Vyumba vinne.")}
                <em>{t("One outdoor unit?", "Kifaa kimoja nje?")}</em>
              </h2>
              <p>
                {t(
                  "What to check before choosing multi-split, and when a different design makes more sense.",
                  "Mambo ya kuhakiki kabla ya kuchagua multi-split, na wakati wa kufikiria mfumo tofauti.",
                )}
              </p>
              <a
                className="hv-button"
                href={`/blog/multi-split-ac-for-tanzanian-buildings?lang=${lang}`}
              >
                {t("Read the practical guide", "Soma mwongozo wa vitendo")} ↗
              </a>
            </article>
            <div className="hv-faqs">
              {climateFAQs.map((x, i) => (
                <details key={i}>
                  <summary>{x[lang][0]}</summary>
                  <p>{x[lang][1]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="hv-quote" id="quotation">
          <div className="hv-wrap hv-section-head">
            <div>
              <p className="hv-kicker">
                {t(
                  "LET’S MAKE YOUR SPACE COMFORTABLE",
                  "TUFANYE ENEO LAKO LIWE NA HALI NZURI",
                )}
              </p>
              <h2>
                {t("Tell us about", "Tuambie kuhusu")}
                <em>
                  {t("your rooms. Your building.", "vyumba vyako. Jengo lako.")}
                </em>
              </h2>
              <p>
                {t(
                  "Start with the location, number of rooms and how you use them. We’ll help define equipment, installation or ongoing care.",
                  "Anza na eneo, idadi ya vyumba na matumizi yake. Tutaainisha vifaa, ufungaji au huduma za kuendelea.",
                )}
              </p>
            </div>
            <div>
              <div className="hv-actions">
                <a className="hv-button hv-button-light" href={links.quote}>
                  {t("Request an AC quotation", "Omba makadirio ya AC")} ↗
                </a>
                <a className="hv-link" href={links.survey}>
                  {t("Request a site survey", "Omba ukaguzi wa eneo")} ↗
                </a>
              </div>
              <div className="hv-actions">
                <a className="hv-link" href={links.whatsapp}>
                  WhatsApp ↗
                </a>
                <a className="hv-link" href={links.call}>
                  {t("Call national sales", "Piga simu mauzo")} ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
