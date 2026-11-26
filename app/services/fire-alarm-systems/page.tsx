import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import {
  firePath,
  fireMetadata,
  fireLinks,
  fireSources,
  fireScenarios,
  fireFaqs,
} from "@/data/fire-safety";
import { fireProducts, fireCataloguePath } from "@/lib/catalogue/fire-safety";
import { SystemCircuit } from "./SystemCircuit";
import { FireHeroImage } from "./FireHeroImage";
import "@/components/premium/access-control/access.css";
import "./fire-safety.css";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const [q, r] = await Promise.all([
    searchParams,
    getServiceRecord("fire-alarm-systems"),
  ]);
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en";
  const m = pageMetadata(firePath, lang, fireMetadata[lang]);
  return {
    ...m,
    openGraph: {
      ...m.openGraph,
      images: ["/images/fire-safety/protected-building-v2.webp"],
    },
  };
}
export default async function Page({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("fire-alarm-systems"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw";
  const t = (en: string, ki: string) => (sw ? ki : en);
  const links = fireLinks(
    lang,
    t("Complete fire safety solution", "Mfumo kamili wa usalama wa moto"),
  );
  const catalogue = `${fireCataloguePath}?lang=${lang}`;
  const action = (scope: string, label?: string) => (
    <a className="fs-link" href={fireLinks(lang, scope).quote}>
      {label || t("Discuss this requirement", "Jadili hitaji hili")}{" "}
      <span aria-hidden="true">↗</span>
    </a>
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: fireMetadata[lang][0],
    serviceType: t(
      "Fire detection, alarms and fire-safety equipment",
      "Mifumo ya kugundua na kutoa tahadhari ya moto na vifaa vya usalama",
    ),
    url: languageUrl(firePath, lang),
    provider: {
      "@type": "Organization",
      name: "BM Engineering Contractors Limited",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Tanzania" },
  };
  const stages = [
    [
      "01",
      t("Detect", "Tambua"),
      t(
        "The right detector for smoke, heat and the room’s conditions.",
        "Kitambuzi kinachofaa moshi, joto na mazingira ya chumba.",
      ),
    ],
    [
      "02",
      t("Identify", "Baini eneo"),
      t(
        "A compatible panel identifies the zone or addressed device.",
        "Paneli inayooana huonyesha kanda au kifaa chenye anwani.",
      ),
    ],
    [
      "03",
      t("Alert", "Toa tahadhari"),
      t(
        "Designed sounders and visual alarms notify the intended areas.",
        "Ving’ora na viashiria vilivyopangwa hutoa tahadhari kwenye maeneo husika.",
      ),
    ],
    [
      "04",
      t("Respond", "Chukua hatua"),
      t(
        "Staff follow the agreed response and evacuation plan.",
        "Wafanyakazi hufuata mpango wa dharura na kuondoka salama.",
      ),
    ],
  ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="fs-main ac-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section className="fs-hero" aria-labelledby="fs-title">
          <FireHeroImage
            alt={t(
              "An occupied commercial entrance with a fire alarm panel, manual call point, sounder and ceiling smoke detector",
              "Lango la jengo la biashara lenye watu, paneli ya tahadhari ya moto, kitufe cha alarm, king’ora na kitambuzi cha moshi darini",
            )}
          />
          <div className="fs-hero-shade" />
          <div className="fs-wrap fs-hero-copy">
            <Breadcrumbs id="fire-alarm-systems" lang={lang} />
            <p className="fs-eyebrow">
              {t(
                "FIRE DETECTION · ALARMS · FIRE SAFETY",
                "UTAMBUZI · TAHADHARI · USALAMA WA MOTO",
              )}
            </p>
            <h1 id="fs-title">
              {t("Protection begins", "Ulinzi huanza")}
              <em>{t("before the flames.", "kabla ya moto.")}</em>
            </h1>
            <p className="fs-hero-intro">
              {t(
                "Thoughtfully planned fire alarms and essential firefighting equipment. For the places people depend on.",
                "Mifumo ya tahadhari ya moto na vifaa vya kuzimia moto vilivyopangwa kwa makini. Kwa maeneo ambayo watu wanayategemea.",
              )}
            </p>
            <div className="fs-actions">
              <a className="fs-button" href={links.survey}>
                {t(
                  "Request a fire safety assessment",
                  "Omba tathmini ya usalama",
                )}{" "}
                ↗
              </a>
              <a className="fs-link" href={links.quote}>
                {t("Request quotation", "Omba makadirio")} ↗
              </a>
            </div>
          </div>
          <div className="fs-hero-caption">
            <span>01 — {t("The Safety Pulse", "Mwanga wa ulinzi")}</span>
            <span>
              {t(
                "Detector → Panel → Alarm → Response",
                "Kitambuzi → Paneli → King’ora → Hatua",
              )}
            </span>
          </div>
        </section>
        <nav
          className="fs-anchor-nav"
          aria-label={t("Explore fire safety", "Gundua usalama wa moto")}
        >
          {[
            ["places", t("Your building", "Jengo lako")],
            ["systems", t("Alarm systems", "Mifumo ya alarm")],
            ["extinguishers", t("Fire extinguishers", "Vizima moto")],
            ["equipment", t("Equipment", "Vifaa")],
            ["maintenance", t("Maintenance", "Matengenezo")],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
        <section
          className="fs-wrap fs-section fs-intro"
          aria-labelledby="fs-complete"
        >
          <div>
            <p className="fs-eyebrow">
              {t("A COMPLETE VIEW OF SAFETY", "USALAMA KWA MTAZAMO MPANA")}
            </p>
            <h2 id="fs-complete">
              {t("Detect early.", "Tambua mapema.")}
              <em>{t("Be ready to respond.", "Jiandae kuchukua hatua.")}</em>
            </h2>
          </div>
          <div className="fs-intro-copy">
            <p>
              {t(
                "An alarm detects and warns. An extinguisher tackles a suitable early-stage fire. Clear exits and a practiced plan help people leave safely. They have different jobs—and should be planned together.",
                "Alarm hutambua na kutoa tahadhari. Kizima moto husaidia kudhibiti moto wa hatua ya awali unaofaa aina yake. Njia wazi za kutokea na mpango uliofanyiwa mazoezi husaidia watu kutoka salama. Kila kimoja kina kazi yake—vipangwe pamoja.",
              )}
            </p>
            <a className="fs-link" href="#equipment">
              {t(
                "Explore fire safety equipment",
                "Gundua vifaa vya usalama wa moto",
              )}{" "}
              ↗
            </a>
          </div>
          <div className="fs-pillars">
            {[
              [
                t("Detection & alarm", "Utambuzi na tahadhari"),
                t(
                  "Panels, smoke/heat detectors, call points and sounders.",
                  "Paneli, vitambuzi vya moshi/joto, vitufe na ving’ora.",
                ),
              ],
              [
                t("First-response equipment", "Vifaa vya hatua za awali"),
                t(
                  "Suitable extinguishers, brackets, cabinets, blankets and hose-reel assessment.",
                  "Vizima moto vinavyofaa, mabano, kabati, blanketi na tathmini ya hose reel.",
                ),
              ],
              [
                t("Escape & readiness", "Njia za kutoka na utayari"),
                t(
                  "Emergency lighting, exit signage, testing and maintenance planning.",
                  "Taa za dharura, alama za kutoka, majaribio na mpango wa matengenezo.",
                ),
              ],
            ].map(([a, b], i) => (
              <article key={a}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="places"
          className="fs-school fs-section"
          aria-labelledby="fs-school-title"
        >
          <div className="fs-wrap fs-editorial">
            <div className="fs-school-photo">
              <Image
                src="/images/fire-safety/boarding-assessment.webp"
                alt={t(
                  "Adult school staff reviewing a dormitory floor plan beside clear escape space",
                  "Wahudumu wa shule wakipitia ramani ya bweni lenye njia wazi ya kutoka",
                )}
                width={1672}
                height={941}
                sizes="(max-width:760px) 600px, (max-width:1100px) 980px, 65vw"
              />
              <span>
                {t(
                  "SCHOOLS · DORMITORIES · STUDENT HOSTELS",
                  "SHULE · MABWENI · HOSTELI ZA WANAFUNZI",
                )}
              </span>
            </div>
            <div>
              <p className="fs-eyebrow">
                {t("WHEN PEOPLE SLEEP ON SITE", "WATU WANAPOLALA ENEONI")}
              </p>
              <h2 id="fs-school-title">
                {t("A safer night.", "Usalama wa usiku.")}
                <em>{t("A better prepared school.", "Shule iliyojiandaa.")}</em>
              </h2>
              <p>
                {t(
                  "Boarding schools need more than a row of extinguishers. Connect detection, audible warnings, clear exits and staff readiness—across dormitories and the wider campus.",
                  "Shule za bweni zinahitaji zaidi ya vizima moto vilivyopangwa ukutani. Panga utambuzi, tahadhari inayosikika, njia wazi za kutoka na utayari wa wafanyakazi—mabwenini na katika kampasi nzima.",
                )}
              </p>
              <details>
                <summary>
                  {t(
                    "What a school assessment covers",
                    "Tathmini ya shule inahusu nini",
                  )}
                </summary>
                <p>
                  {t(
                    "Sleeping accommodation, classrooms, laboratories, kitchens, libraries, administration and electrical rooms. Review occupancy, compartmentation, escape routes, night staffing, alarm audibility and accessibility. Detector selection must account for steam, dust and cooking; drills and responsibilities belong in the response plan.",
                    "Maeneo ya kulala, madarasa, maabara, majiko, maktaba, ofisi na vyumba vya umeme. Kagua matumizi ya jengo, utenganishaji wa maeneo, njia za kutokea, wahudumu wa usiku, usikikaji wa alarm na ufikivu. Vitambuzi vichaguliwe kwa kuzingatia mvuke, vumbi na upishi; mazoezi na majukumu yawe kwenye mpango wa dharura.",
                  )}
                </p>
              </details>
              {action(
                t(
                  "Boarding school / hostel fire safety",
                  "Usalama wa moto shuleni / bwenini",
                ),
                t("Plan a school assessment", "Panga tathmini ya shule"),
              )}
            </div>
          </div>
        </section>
        <section
          className="fs-wrap fs-section"
          aria-labelledby="fs-places-title"
        >
          <div className="fs-section-heading">
            <div>
              <p className="fs-eyebrow">
                {t("START WITH THE PLACE", "ANZA NA MATUMIZI YA ENEO")}
              </p>
              <h2 id="fs-places-title">
                {t("Different buildings.", "Majengo tofauti.")}
                <em>{t("Thoughtful protection.", "Ulinzi unaofaa.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "From Moshi and Arusha to projects across Tanzania, the building’s real use shapes the system.",
                "Kutoka Moshi na Arusha hadi miradi katika maeneo mengine Tanzania, matumizi halisi ya jengo huongoza uchaguzi wa mfumo.",
              )}
            </p>
          </div>
          <div className="fs-scenarios">
            {fireScenarios.map((s, i) => (
              <article key={s.id}>
                <a
                  className="fs-scenario-photo"
                  href={fireLinks(lang, s[lang][2]).survey}
                >
                  <Image
                    src={s.image}
                    alt={s[lang][0]}
                    width={1440}
                    height={810}
                    sizes="(max-width:600px) 86vw, (max-width:1000px) 44vw, 29vw"
                  />
                  <span>0{i + 1}</span>
                </a>
                <h3>{s[lang][0]}</h3>
                <p>{s[lang][1]}</p>
                {action(s[lang][2], s[lang][2])}
              </article>
            ))}
          </div>
        </section>
        <section
          id="systems"
          className="fs-dark fs-section"
          aria-labelledby="fs-system-title"
        >
          <div className="fs-wrap">
            <div className="fs-section-heading">
              <div>
                <p className="fs-eyebrow">
                  {t(
                    "CHOOSE THE SYSTEM, NOT JUST THE PANEL",
                    "CHAGUA MFUMO, SI PANELI PEKEE",
                  )}
                </p>
                <h2 id="fs-system-title">
                  {t("Know the zone.", "Fahamu kanda.")}
                  <em>
                    {t("Or identify the device.", "Au tambua kifaa husika.")}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "Conventional and addressable systems solve different building needs. Both require compatible equipment, supervised wiring and a tested response plan.",
                  "Mifumo ya conventional na addressable hutimiza mahitaji tofauti. Yote inahitaji vifaa vinavyooana, nyaya zinazofuatiliwa na mpango wa dharura uliojaribiwa.",
                )}
              </p>
            </div>
            <div className="fs-system-pair">
              {[false, true].map((addressable) => (
                <article key={String(addressable)}>
                  <p className="fs-eyebrow">
                    {addressable ? "02 / ADDRESSABLE" : "01 / CONVENTIONAL"}
                  </p>
                  <SystemCircuit addressable={addressable} sw={sw} />
                  <h3>
                    {addressable
                      ? t(
                          "A device with an identity.",
                          "Kifaa chenye utambulisho.",
                        )
                      : t(
                          "A clear view of each zone.",
                          "Taarifa wazi za kila kanda.",
                        )}
                  </h3>
                  <p>
                    {addressable
                      ? t(
                          "Individual device addresses can help staff locate events and technicians diagnose faults. Suitable for designs needing more detailed identification and cause-and-effect control.",
                          "Anwani za vifaa husaidia kubaini eneo la tukio na kufuatilia hitilafu. Hufaa pale muundo unapohitaji utambuzi wa kina na udhibiti wa hatua zinazofuata tukio.",
                        )
                      : t(
                          "The panel normally identifies an alarm zone, rather than the individual detector. Plan sensible zones, separate sounder circuits and the required end-of-line supervision.",
                          "Paneli kwa kawaida huonyesha kanda yenye alarm, si kitambuzi kimoja. Panga kanda zinazoeleweka, nyaya za ving’ora na ufuatiliaji wa mwisho wa laini unaohitajika.",
                        )}
                  </p>
                  <details>
                    <summary>
                      {t("Engineering considerations", "Mambo ya kiufundi")}
                    </summary>
                    <p>
                      {addressable
                        ? t(
                            "Confirm the exact protocol, permitted loop topology, device and current limits, isolators, interface modules and additional sounder power. ASENWARE AW-FP300 is a manufacturer reference for one loop/up to 324 addresses—not a universal capacity for every panel. Final loading follows the exact manual and design.",
                            "Hakiki protocol, mpangilio wa loop unaoruhusiwa, idadi na mkondo wa vifaa, isolator, moduli na umeme wa ving’ora. ASENWARE AW-FP300 ni rejea ya loop moja yenye hadi anwani 324—si uwezo wa kila paneli. Uwezo wa mwisho ufuate mwongozo na usanifu husika.",
                          )
                        : t(
                            "Check the panel’s exact zone count, approved detector loading, circuit resistance, end-of-line values and separate notification outputs. A zone circuit is not an addressable loop. The Hikvision HF-C104(8) brochure family is a reference; exact regional model and revision must be confirmed.",
                            "Hakiki idadi halisi ya kanda, mzigo unaoruhusiwa wa vitambuzi, ukinzani wa nyaya, thamani za mwisho wa laini na njia za ving’ora. Laini ya kanda si loop ya addressable. Familia ya Hikvision HF-C104(8) ni rejea; modeli na toleo la eneo vihakikiwe.",
                          )}
                    </p>
                  </details>
                </article>
              ))}
            </div>
            <details className="fs-wide-detail">
              <summary>
                {t(
                  "What belongs in every engineered design?",
                  "Kila usanifu unahitaji nini?",
                )}
              </summary>
              <p>
                {t(
                  "Battery standby/alarm calculations, power-supply and charger capacity, alarm/fault/supervisory indications, the specified fire-rated cable and supports where required, zone charts, device labels and documented testing. Confirm cause-and-effect for each approved interface. CCTV analytics, standalone and Wi-Fi alarms do not automatically satisfy a required building fire-alarm design.",
                  "Hesabu za betri katika hali ya kawaida na alarm, uwezo wa power supply na chaja, viashiria vya alarm/hitilafu/ufuatiliaji, nyaya na viungio vinavyostahimili moto inapohitajika, ramani za kanda, lebo na rekodi za majaribio. Hakiki hatua za kila muunganisho ulioidhinishwa. Kamera, alarm zinazojitegemea na za Wi-Fi si mbadala wa moja kwa moja wa usanifu unaohitajika.",
                )}
              </p>
            </details>
            <div className="fs-actions">
              <a className="fs-button" href={links.survey}>
                {t("Find the right design", "Panga mfumo unaofaa")} ↗
              </a>
              <a className="fs-link" href={catalogue}>
                {t("Compare equipment", "Linganisha vifaa")} ↗
              </a>
            </div>
          </div>
        </section>
        <section
          id="extinguishers"
          className="fs-section fs-extinguishers"
          aria-labelledby="fs-ext-title"
        >
          <div className="fs-wrap">
            <div className="fs-section-heading">
              <div>
                <p className="fs-eyebrow">
                  {t(
                    "THE RIGHT AGENT. THE RIGHT PLACE.",
                    "AINA SAHIHI. MAHALI PANAPOFAA.",
                  )}
                </p>
                <h2 id="fs-ext-title">
                  {t("Fire extinguishers.", "Vizima moto.")}
                  <em>
                    {t(
                      "Chosen for the actual risk.",
                      "Kwa hatari halisi ya eneo.",
                    )}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "Supply, mounting and replacement quotations. Inspection and servicing are scoped with appropriately authorized personnel—not an automatic promise of statutory approval.",
                  "Omba ugavi, ufungaji na ubadilishaji. Ukaguzi na matengenezo hupangwa kwa watu wenye ruhusa husika—si ahadi ya kupata kibali cha kisheria.",
                )}
              </p>
            </div>
            <div className="fs-ext-pair">
              {[false, true].map((co2) => (
                <article key={String(co2)}>
                  <div className="fs-ext-photo">
                    <Image
                      src={`/images/fire-safety/${co2 ? "co2" : "abc-powder"}.webp`}
                      alt={
                        co2
                          ? "NAFFCO portable CO₂ extinguisher range"
                          : "NAFFCO portable ABC dry powder extinguisher range"
                      }
                      width={960}
                      height={800}
                      sizes="(max-width:760px) 85vw, 42vw"
                    />
                  </div>
                  <div className="fs-ext-copy">
                    <p className="fs-eyebrow">
                      {co2
                        ? "CARBON DIOXIDE / CO₂"
                        : "ABC / DRY CHEMICAL POWDER"}
                    </p>
                    <h3>
                      {co2
                        ? t(
                            "CO₂. A cleaner discharge.",
                            "CO₂. Bila mabaki ya poda.",
                          )
                        : t(
                            "ABC powder. Versatile protection.",
                            "Poda ya ABC. Matumizi mbalimbali.",
                          )}
                    </h3>
                    <p>
                      {co2
                        ? t(
                            "A residue-free option for suitable electrical-equipment and flammable-liquid risks. It is not an all-purpose replacement for powder: confined-space oxygen displacement and reignition need assessment.",
                            "Chaguo lisiloacha mabaki kwa hatari zinazofaa za vifaa vya umeme na vimiminika vinavyowaka. Si mbadala wa poda kwa kila matumizi: zingatia kupungua kwa oksijeni kwenye nafasi finyu na uwezekano wa kuwaka tena.",
                          )
                        : t(
                            "For suitable solid-material, flammable-liquid and gas risks, according to the unit’s marked rating. Powder residue and reduced visibility matter—especially near sensitive electronics and occupied escape routes.",
                            "Kwa hatari zinazofaa za vitu vigumu, vimiminika na gesi zinazowaka, kulingana na alama za kifaa. Mabaki ya poda na kupungua kwa uonekano vizingatiwe, hasa karibu na elektroniki na njia za kutokea.",
                          )}
                    </p>
                    <div className="fs-capacities">
                      {(co2 ? ["5 kg"] : ["6 kg", "9 kg"]).map((size) => (
                        <a
                          key={size}
                          href={
                            fireLinks(
                              lang,
                              t(
                                "Extinguisher equipment / mounting quotation",
                                "Makadirio ya vizima moto / ufungaji",
                              ),
                              `${co2 ? "CO₂" : "ABC DCP"} ${size}`,
                            ).quote
                          }
                        >
                          {size} <span>↗</span>
                        </a>
                      ))}
                    </div>
                    <small>
                      {t(
                        "Capacity options for quotation · exact model/rating confirmed",
                        "Chaguo za makadirio · modeli na uwezo vihakiwe",
                      )}
                    </small>
                  </div>
                </article>
              ))}
            </div>
            <details className="fs-wide-detail">
              <summary>
                {t(
                  "6 kg, 9 kg or 5 kg: capacity alone does not establish compliance",
                  "Kilo 6, 9 au 5: uzito pekee hauthibitishi kutimiza masharti",
                )}
              </summary>
              <p>{fireFaqs[1][lang][1]}</p>
              <p>
                {t(
                  "Photographs show NAFFCO manufacturer ranges, not BM stock or a guaranteed size-specific supplied unit. Confirm model, agent, marked fire rating, approvals and accessories before ordering.",
                  "Picha zinaonyesha familia za NAFFCO, si stock ya BM wala kifaa cha ukubwa fulani kilichoahidiwa. Hakiki modeli, kiwakala, uwezo ulioandikwa, vibali na vifaa vya ziada kabla ya kuagiza.",
                )}
              </p>
            </details>
            <div className="fs-related-strip">
              <strong>{t("Complete the provision", "Kamilisha mpango")}</strong>
              <p>
                {t(
                  "Wall brackets · stands · cabinets · safety signs · fire blankets · water/foam and wet-chemical options · hose reels following site assessment.",
                  "Mabano ya ukutani · stendi · kabati · alama za usalama · blanketi za moto · aina za maji/foam na wet chemical · hose reel baada ya tathmini.",
                )}
              </p>
              {action(
                t(
                  "Extinguishers, mounting and signs",
                  "Vizima moto, mabano na alama",
                ),
                t("Request Current Price", "Omba bei ya sasa"),
              )}
            </div>
          </div>
        </section>
        <section
          className="fs-flow-section fs-section"
          aria-labelledby="fs-flow-title"
        >
          <div className="fs-wrap">
            <p className="fs-eyebrow">
              {t("A SIGNAL IS ONLY THE BEGINNING", "ISHARA NI MWANZO TU")}
            </p>
            <h2 id="fs-flow-title">
              {t("From detection", "Kutoka utambuzi")}
              <em>
                {t("to a considered response.", "hadi hatua zilizopangwa.")}
              </em>
            </h2>
            <ol className="fs-response">
              {stages.map(([n, a, b]) => (
                <li key={n}>
                  <span>{n}</span>
                  <h3>{a}</h3>
                  <p>{b}</p>
                </li>
              ))}
            </ol>
            <details>
              <summary>
                {t(
                  "Interfaces and evacuation planning",
                  "Miunganisho na mpango wa kutoka salama",
                )}
              </summary>
              <p>
                {t(
                  "HVAC shutdown, door release, evacuation audio, sprinkler-flow monitoring and external alarm monitoring are separate engineered interfaces, where approved. They require compatible modules and tested cause-and-effect. This diagram does not promise universal integration, automatic suppression or an automatic Fire and Rescue dispatch.",
                  "Kusimamisha HVAC, kuachia milango, sauti za uokoaji, kufuatilia mtiririko wa sprinkler na ufuatiliaji wa nje ni miunganisho tofauti ya kiufundi pale inapoidhinishwa. Inahitaji moduli zinazooana na majaribio ya hatua zinazofuata tukio. Mchoro hauahidi uoanifu wa kila mfumo, kuzima moto kiotomatiki wala kuitwa kwa Jeshi la Zimamoto moja kwa moja.",
                )}
              </p>
            </details>
          </div>
        </section>
        <section
          id="equipment"
          className="fs-wrap fs-section"
          aria-labelledby="fs-equipment-title"
        >
          <div className="fs-section-heading">
            <div>
              <p className="fs-eyebrow">
                {t(
                  "VERIFIED MANUFACTURER REFERENCES",
                  "REJEA ZILIZOHAKIKIWA ZA WATENGENEZAJI",
                )}
              </p>
              <h2 id="fs-equipment-title">
                {t("Equipment with", "Vifaa vyenye")}
                <em>{t("a clear purpose.", "kazi iliyo wazi.")}</em>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  "Hikvision conventional and ASENWARE addressable references. Match the full system before choosing a device. Current prices, sourcing and revisions are confirmed in your quotation.",
                  "Rejea za Hikvision conventional na ASENWARE addressable. Linganisha mfumo mzima kabla ya kuchagua kifaa. Bei ya sasa, upatikanaji na matoleo huthibitishwa kwenye makadirio.",
                )}
              </p>
              <a className="fs-link" href={catalogue}>
                {t("Explore all six references", "Angalia rejea zote sita")} ↗
              </a>
            </div>
          </div>
          <div className="fs-products">
            {fireProducts
              .filter((x) =>
                [
                  "hikvision-hf-c104",
                  "asenware-aw-fp300",
                  "asenware-aw-d301",
                ].includes(x.slug),
              )
              .map((item) => (
                <ReferenceCard
                  key={item.slug}
                  p={item}
                  lang={lang}
                  namespace={fireCataloguePath}
                />
              ))}
          </div>
          <div className="fs-equipment-foot">
            <p>
              {t(
                "Also explore heat detectors, manual call points, sounder/beacons and quotation-led families for emergency lighting, batteries and compatible interfaces.",
                "Pia angalia vitambuzi vya joto, vitufe vya alarm, ving’ora/taa na familia za taa za dharura, betri na moduli zinazooana.",
              )}
            </p>
            <a className="fs-button" href={catalogue}>
              {t(
                "Open the fire safety catalogue",
                "Fungua katalogi ya usalama wa moto",
              )}{" "}
              ↗
            </a>
          </div>
        </section>
        <section
          id="maintenance"
          className="fs-maintenance fs-section"
          aria-labelledby="fs-maint-title"
        >
          <div className="fs-wrap fs-editorial">
            <div className="fs-maint-photo">
              <Image
                src="/images/fire-safety/maintenance.webp"
                alt={t(
                  "A technician reviewing a fire panel and system records",
                  "Fundi akipitia paneli ya moto na rekodi za mfumo",
                )}
                width={1086}
                height={1448}
                sizes="(max-width:760px) 90vw, 40vw"
              />
            </div>
            <div>
              <p className="fs-eyebrow">
                {t("ALREADY HAVE A SYSTEM?", "TAYARI UNA MFUMO?")}
              </p>
              <h2 id="fs-maint-title">
                {t("Faults deserve answers.", "Hitilafu zichunguzwe.")}
                <em>
                  {t("Maintenance needs a plan.", "Matengenezo yapangwe.")}
                </em>
              </h2>
              <p>
                {t(
                  "An inspection records condition. Preventive maintenance keeps equipment serviceable. Corrective repair addresses a specific fault. We scope the right work from your system and records.",
                  "Ukaguzi hubaini hali ya vifaa. Matengenezo ya kinga husaidia mfumo kuendelea kufanya kazi. Marekebisho hushughulikia hitilafu maalumu. Tunapanga kazi kulingana na mfumo na rekodi zako.",
                )}
              </p>
              <details>
                <summary>
                  {t(
                    "Alarm testing and fault diagnosis",
                    "Majaribio ya alarm na uchunguzi wa hitilafu",
                  )}
                </summary>
                <p>
                  {t(
                    "Detector testing/cleaning, call-point operation, sounder and visual-alarm checks, open/short/earth faults, battery and charger tests, zone/device verification, false-alarm diagnosis and cause-and-effect checks. Agree controlled testing with site staff and any monitoring provider before activation; document faults and restoration.",
                    "Upimaji/usafishaji wa vitambuzi, vitufe, ving’ora na taa; hitilafu za nyaya na earth; betri na chaja; uhakiki wa kanda/anwani; alarm zisizo za moto na hatua za mfumo. Kubaliana na wahudumu na mtoa ufuatiliaji kabla ya kuanzisha majaribio; andika hitilafu na kurejeshwa kwa ulinzi.",
                  )}
                </p>
              </details>
              <details>
                <summary>
                  {t(
                    "Extinguishers, records and specialist servicing",
                    "Vizima moto, rekodi na huduma maalumu",
                  )}
                </summary>
                <p>
                  {t(
                    "Review accessibility, damage, seals, appropriate indicators, service tags and replacement needs. Keep inspection and maintenance records. Regulated servicing, recharge, cylinder pressure testing and specialist suppression commissioning require verified competence and authorization; these are separately scoped or coordinated with authorized specialists.",
                    "Kagua ufikivu, uharibifu, mihuri, viashiria vinavyohusika, lebo za huduma na hitaji la kubadilisha. Hifadhi rekodi. Huduma zinazodhibitiwa, ujazaji, upimaji wa shinikizo na majaribio ya mifumo maalumu zinahitaji uwezo na ruhusa zilizohakikiwa; hupangwa tofauti au kuratibiwa na wataalamu walioidhinishwa.",
                  )}
                </p>
              </details>
              {action(
                t(
                  "Existing fire alarm faults / maintenance assessment",
                  "Hitilafu za mfumo / tathmini ya matengenezo",
                ),
                t(
                  "Request a maintenance assessment",
                  "Omba tathmini ya matengenezo",
                ),
              )}
            </div>
          </div>
          <ol className="fs-wrap fs-delivery">
            {[
              t("Assess the site & fire risks", "Tathmini eneo na hatari"),
              t("Design & select equipment", "Sanifu na chagua vifaa"),
              t("Install & configure", "Funga na sanidi"),
              t("Test & document", "Jaribu na andika rekodi"),
              t("Maintain & plan expansion", "Tunza na panga upanuzi"),
            ].map((x, i) => (
              <li key={x}>
                <span>0{i + 1}</span>
                {x}
              </li>
            ))}
          </ol>
        </section>
        <section
          id="training"
          className="fs-training fs-section"
          aria-labelledby="fs-training-title"
        >
          <div className="fs-wrap fs-training-layout">
            <div className="fs-training-copy">
              <p className="fs-eyebrow">
                {t(
                  "PEOPLE MAKE THE PLAN WORK",
                  "WATU HUUFANYA MPANGO UFANYE KAZI",
                )}
              </p>
              <h2 id="fs-training-title">
                {t(
                  "Fire Safety Training & Readiness",
                  "Mafunzo na Utayari wa Usalama wa Moto",
                )}
              </h2>
              <p className="fs-training-lead">
                {t(
                  "Be prepared. Respond safely. Protect lives and property.",
                  "Jiandae. Chukua hatua salama. Linda maisha na mali.",
                )}
              </p>
              <ul className="fs-training-topics">
                {[
                  [
                    t("Know your extinguisher", "Fahamu kizima moto chako"),
                    t(
                      "Basic awareness, safe handling and the limits of first-response equipment.",
                      "Uelewa wa msingi, matumizi salama na mipaka ya vifaa vya hatua za awali.",
                    ),
                  ],
                  [
                    t("Choose for the risk", "Chagua kulingana na hatari"),
                    t(
                      "Understand powder, CO₂ and other agents—and where each is appropriate.",
                      "Fahamu poda, CO₂ na aina nyingine, pamoja na matumizi yanayofaa kwa kila aina.",
                    ),
                  ],
                  [
                    t("Be ready to evacuate", "Jiandae kutoka salama"),
                    t(
                      "Evacuation awareness for schools, boarding facilities, hotels, offices and businesses.",
                      "Uelewa wa kuondoka salama kwa shule, mabweni, hoteli, ofisi na biashara.",
                    ),
                  ],
                  [
                    t("Keep readiness visible", "Dumisha utayari"),
                    t(
                      "Equipment inspection awareness, clear responsibilities and emergency preparedness.",
                      "Uelewa wa ukaguzi wa vifaa, majukumu yaliyo wazi na maandalizi ya dharura.",
                    ),
                  ],
                ].map(([title, text], i) => (
                  <li key={title}>
                    <span aria-hidden="true">0{i + 1}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="fs-training-scope">
                {t(
                  "Session scope and facilitator qualifications are confirmed before booking. Any formal certification requires separate verification.",
                  "Maudhui ya kikao na sifa za mwezeshaji huthibitishwa kabla ya kupanga mafunzo. Utoaji wa cheti rasmi unahitaji uhakiki tofauti.",
                )}
              </p>
              <a
                className="fs-link"
                href={
                  fireLinks(
                    lang,
                    t(
                      "Fire safety awareness and emergency readiness session",
                      "Mafunzo ya uelewa wa usalama wa moto na utayari wa dharura",
                    ),
                  ).quote
                }
              >
                {t("Discuss a readiness session", "Jadili mafunzo ya utayari")}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="fs-training-photo">
              <Image
                src="/images/fire-safety/readiness-demonstration.webp"
                alt={t(
                  "A controlled outdoor extinguisher demonstration with adult observers behind a clear boundary",
                  "Onyesho linalosimamiwa la kizima moto nje, watu wazima wakitazama nyuma ya mpaka wa usalama",
                )}
                width={1536}
                height={1024}
                sizes="(max-width:760px) 90vw, (max-width:1100px) 850px, 57vw"
              />
            </div>
          </div>
        </section>
        <section
          className="fs-wrap fs-section fs-legal"
          aria-labelledby="fs-legal-title"
        >
          <div>
            <p className="fs-eyebrow">
              {t(
                "TANZANIA · RESPONSIBLE PLANNING",
                "TANZANIA · MIPANGO YENYE UWAJIBIKAJI",
              )}
            </p>
            <h2 id="fs-legal-title">
              {t("Plan for the building.", "Panga kwa jengo husika.")}
              <em>{t("Confirm the requirements.", "Hakiki masharti.")}</em>
            </h2>
            <p>
              {t(
                "Occupancy, escape arrangements, risk and the competent authority’s directions matter. A quotation is not a compliance certificate.",
                "Matumizi ya jengo, njia za kutokea, hatari na maelekezo ya mamlaka husika vinahusika. Makadirio si cheti cha kutimiza masharti.",
              )}
            </p>
          </div>
          <div>
            <details>
              <summary>
                {t(
                  "Detection, escape and fire-safety responsibilities",
                  "Utambuzi, njia za kutokea na wajibu wa usalama",
                )}
              </summary>
              <p>
                {t(
                  "Mainland Tanzania’s Fire and Rescue Force Act Cap. 427, GN 533/2015 and workplace duties under OSHA Cap. 297 inform assessment. Alarm requirements depend on occupancy and the applicable building provisions. Review clear exits, emergency lighting/signs, drills, staff responsibilities, design approval and commissioning records. Applicable larger/higher-risk premises may require a qualified fire protection manager. Confirm current authority requirements; Zanzibar has its own applicable framework.",
                  "Sheria ya Jeshi la Zimamoto na Uokoaji Sura 427, GN 533/2015 na wajibu wa maeneo ya kazi chini ya OSHA Sura 297 husaidia tathmini Tanzania Bara. Mahitaji ya alarm hutegemea matumizi na masharti ya jengo. Pitia njia wazi, taa/alama za dharura, mazoezi, majukumu, idhini ya usanifu na rekodi za majaribio. Majengo makubwa au yenye hatari husika yanaweza kuhitaji msimamizi wa usalama wa moto mwenye sifa. Hakiki masharti ya sasa; Zanzibar ina mfumo wake wa sheria.",
                )}
              </p>
              <a href={fireSources.act} target="_blank" rel="noreferrer">
                {t("Read the Act", "Soma sheria")} ↗
              </a>
            </details>
            <details>
              <summary>
                {t(
                  "Extinguisher quantities, sizes and maintenance",
                  "Idadi, ukubwa na matengenezo ya vizima moto",
                )}
              </summary>
              <p>
                {t(
                  "Regulation 244(5) includes one extinguisher per 200 m² for listed occupancies including instruction, hotels, offices and dormitories; 100 m² for specified higher-risk groups and 400 m² for other listed groups. It also specifies agent/capacity provisions. These are references within the regulation, not a universal area-only design formula. Assess the actual occupancy, fire rating, hazard, placement and authority direction.",
                  "Kanuni 244(5) inajumuisha kizima moto kimoja kwa m² 200 kwa makundi yaliyotajwa kama shule, hoteli, ofisi na mabweni; m² 100 kwa makundi maalumu yenye hatari zaidi na m² 400 kwa makundi mengine. Pia ina masharti ya aina na uwezo. Hizi ni rejea ndani ya kanuni, si hesabu ya eneo pekee kwa kila jengo. Tathmini matumizi halisi, uwezo wa kuzima, hatari, mahali na maelekezo ya mamlaka.",
                )}
              </p>
              <p>{fireFaqs[4][lang][1]}</p>
              <a
                href={fireSources.regulations}
                target="_blank"
                rel="noreferrer"
              >
                GN 533 / 2015 · Regulation 244 ↗
              </a>
            </details>
            <details>
              <summary>
                {t(
                  "Inspection, certificates and authorized work",
                  "Ukaguzi, vyeti na kazi zenye ruhusa",
                )}
              </summary>
              <p>{fireFaqs[5][lang][1]}</p>
              <p>
                {t(
                  "The 2024 safety-inspection/certificate amendment must be read with the underlying rules. BM fire-dealer registration and specialist service authorizations must be verified for the contracted scope before regulated work is committed.",
                  "Marekebisho ya 2024 ya ukaguzi/vyeti yasomwe pamoja na kanuni za msingi. Usajili wa BM wa biashara ya vifaa vya moto na ruhusa za huduma maalumu vihakikiwe kwa kazi inayokubaliwa kabla ya kuahidi kazi zinazodhibitiwa.",
                )}
              </p>
              <a href={fireSources.amendment} target="_blank" rel="noreferrer">
                {t(
                  "Official 2024 amendment record",
                  "Rekodi rasmi ya marekebisho ya 2024",
                )}{" "}
                ↗
              </a>
            </details>
          </div>
        </section>
        <section className="fs-guides fs-section">
          <div className="fs-wrap fs-guides-inner">
            <div>
              <p className="fs-eyebrow">
                {t(
                  "A LITTLE CLARITY BEFORE YOU BUY",
                  "FAHAMU KABLA YA KUAGIZA",
                )}
              </p>
              <h2>{t("Useful answers.", "Majibu yenye msaada.")}</h2>
              <a
                className="fs-link"
                href={`/blog/fire-safety-for-schools-and-businesses?lang=${lang}`}
              >
                {t(
                  "The school & business fire-safety checklist",
                  "Mwongozo wa usalama wa shule na biashara",
                )}{" "}
                ↗
              </a>
              <p>
                {t(
                  "Conventional or addressable? Powder or CO₂? What should be ready for an assessment?",
                  "Conventional au addressable? Poda au CO₂? Uandae nini kabla ya tathmini?",
                )}
              </p>
            </div>
            <div className="fs-faq">
              {fireFaqs.map((f) => (
                <details key={f.en[0]}>
                  <summary>{f[lang][0]}</summary>
                  <p>{f[lang][1]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="fs-final fs-section">
          <div className="fs-wrap">
            <p className="fs-eyebrow">
              {t("LET’S PLAN THE RIGHT PROTECTION", "TUPANGE ULINZI UNAOKUFAA")}
            </p>
            <h2>
              {t("Tell us about the building.", "Tuambie kuhusu jengo lako.")}
            </h2>
            <p>
              {t(
                "A new system, an existing fault or equipment to replace. Share the location, building use and scope—we’ll help define the next step.",
                "Mfumo mpya, hitilafu au vifaa vya kubadilisha. Tueleze eneo, matumizi ya jengo na hitaji—tukusaidie kupanga hatua inayofuata.",
              )}
            </p>
            <div className="fs-actions">
              <a className="fs-button" href={links.survey}>
                {t("Request site assessment", "Omba tathmini ya eneo")} ↗
              </a>
              <a className="fs-link" href={links.whatsapp}>
                WhatsApp ↗
              </a>
              <a className="fs-link" href={links.call}>
                {t("Call BM", "Piga simu BM")} ↗
              </a>
            </div>
            <nav
              className="fs-related-nav"
              aria-label={t(
                "Related engineering services",
                "Huduma zinazohusiana",
              )}
            >
              {[
                [
                  "electrical-contracting",
                  t("Electrical engineering", "Uhandisi wa umeme"),
                ],
                ["access-control", t("Access control", "Udhibiti wa milango")],
                ["cctv", t("CCTV installation", "Ufungaji wa CCTV")],
                ["power-backup", t("Backup power", "Umeme wa akiba")],
              ].map(([slug, title]) => (
                <a key={slug} href={`/services/${slug}?lang=${lang}`}>
                  {title} ↗
                </a>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
