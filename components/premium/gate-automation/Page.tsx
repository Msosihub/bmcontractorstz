import Image from "next/image";
import { approvedRecordMedia } from "@/lib/approved-record-media";
import type { Service } from "@prisma/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "./Catalogue";
import { gateLinks } from "./links";
import { GatePlanner } from "./Planner";
import type { CatalogueProduct } from "@/lib/catalogue/types";
import type { Language } from "@/lib/i18n/config";
import "./gate.css";
export function GateAutomationPage({
  lang,
  record,
  products,
}: {
  lang: Language;
  record: Service | null;
  products: CatalogueProduct[];
}) {
  const sw = lang === "sw",
    l = gateLinks(
      lang,
      sw ? "Ufungaji wa mota ya geti" : "Gate motor installation",
    );
  const approvedHero = record ? approvedRecordMedia("service", record) : null;
  const steps = sw
    ? [
        [
          "Tunaanza na geti",
          "Tunakagua mwendo wa geti, reli au bawaba, nguzo, nafasi ya mota na matumizi ya kila siku.",
        ],
        [
          "Tunachagua mfumo",
          "Modeli, vifaa vya usalama, umeme na njia za kufungua vinaandikwa wazi kwenye nukuu.",
        ],
        [
          "Tunafunga kwa umakini",
          "Mota na rack hukaa imara; nyaya na umeme hupangwa kwa usalama na umaliziaji nadhifu.",
        ],
        [
          "Unakabidhiwa mfumo",
          "Tunajaribu ufunguaji, vifaa vya usalama na manual release, kisha tunakuelekeza matumizi na matengenezo.",
        ],
      ]
    : [
        [
          "Assess the gate",
          "We check gate travel, tracks or hinges, pillars, motor space and daily use.",
        ],
        [
          "Specify the system",
          "The quotation identifies the model, safety devices, power requirements and access options.",
        ],
        [
          "Install neatly",
          "Secure mounting, aligned drive components and protected cable routes make a lasting difference.",
        ],
        [
          "Test & hand over",
          "We test operation, safety devices and manual release, then explain everyday use and maintenance.",
        ],
      ];
  const faqs = sw
    ? [
        [
          "Geti langu la kawaida linaweza kuwekewa mota?",
          "Mara nyingi inawezekana ikiwa geti linasogea vizuri na nguzo, reli au bawaba ziko imara. Tunakagua na kubaini marekebisho yanayohitajika kabla ya kuchagua mota.",
        ],
        [
          "Mota gani inafaa geti zito?",
          "Uzito ni kipengele kimoja tu. Urefu wa geti, msuguano, upepo, nafasi ya kufunga na marudio ya kufunguka vinaathiri uchaguzi. D10 TURBO si mbadala wa D10 kwa kila geti.",
        ],
        [
          "Umeme ukikatika nitaweza kutoka?",
          "Mfumo wa betri unaolingana unaweza kuendelea kufanya kazi kwa muda unaotegemea hali ya betri na matumizi. Tunafundisha manual release. Kwa SDO5, battery backup ni chaguo la ziada linalohitaji kuainishwa.",
        ],
        [
          "Lazima niwe na intaneti ili kufungua geti?",
          "Hapana, rimoti na njia za karibu zinazooana zinaweza kufanya kazi bila intaneti. Kufungua ukiwa mbali kupitia programu kunahitaji intaneti na Wi-Fi inayofika kwenye mfumo unaoiunga mkono. Bluetooth si intaneti.",
        ],
        [
          "Mnaweza kutengeneza D5 SMART au VANTAGE ya zamani?",
          "Tunaweza kuanza na utambuzi wa tatizo la mfumo uliopo. Upatikanaji wa vipuri, toleo la controller na ulinganifu vitathibitishwa kabla ya kukupa nukuu; si lazima kubadilisha mfumo mzima.",
        ],
        [
          "Bei inajumuisha nini?",
          "Tenganisha bei ya mota pekee na nukuu ya ufungaji. Ufungaji unaweza kuhitaji rack, msingi, nyaya, umeme, beams, rimoti na marekebisho ya geti. Tunatoa vipengele hivyo kwenye nukuu badala ya bei isiyoeleweka.",
        ],
      ]
    : [
        [
          "Can you automate my existing manual gate?",
          "Often, if the gate moves freely and its pillars, track or hinges are sound. We assess it first and identify mechanical work before selecting a motor.",
        ],
        [
          "Which motor suits a heavy gate?",
          "Weight is only one factor. Gate length, friction, wind, mounting space and daily cycles matter too. A D10 TURBO is not interchangeable with a D10 for every gate.",
        ],
        [
          "What happens during a power cut?",
          "A suitable battery system can keep operating for a period determined by battery health and usage. Manual-release training is part of handover. SDO5 battery backup is an optional accessory that must be specified.",
        ],
        [
          "Do I need Internet to open the gate?",
          "No: compatible remotes and local access options can work without Internet. App control from elsewhere requires working Internet and Wi-Fi reaching a supported operator. Bluetooth is not Internet connectivity.",
        ],
        [
          "Can you repair an older D5 SMART or VANTAGE?",
          "We can begin with diagnosis of the installed system. Spare parts, controller revision and compatibility must be confirmed before quotation; replacement of the entire system is not always necessary.",
        ],
        [
          "What does the quotation include?",
          "Motor-only pricing and installed-system pricing are different. A complete installation may need rack, a base, cables, power, beams, remotes and gate repairs. We itemize these requirements rather than advertise an incomplete headline price.",
        ],
      ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ga-main">
        <section className="ga-hero">
          <div className="ga-hero-copy">
            <p className="eyebrow">
              <a href={`/services?lang=${lang}`}>
                {sw ? "USALAMA NA AUTOMATION" : "SECURITY & AUTOMATION"}
              </a>{" "}
              / CENTURION
            </p>
            <p className="ga-identity">
              {sw
                ? "Ufungaji, vifaa na matengenezo ya mota za geti"
                : "Gate motor installation, equipment & repairs"}
            </p>
            <h1>
              {sw ? "Karibu nyumbani." : "A better arrival."}
              <br />
              <em>{sw ? "Bila usumbufu." : "Every day."}</em>
            </h1>
            <p className="lead">
              {sw
                ? "Fungua kwa urahisi. Ingia kwa utulivu. Mifumo ya CENTURION kwa geti za nyumba, biashara na taasisi—ikiwa imechaguliwa na kufungwa kulingana na eneo lako."
                : "Open with ease. Arrive with confidence. CENTURION automation for homes, businesses and institutions—selected and installed around your entrance."}
            </p>
            <div className="ga-actions">
              <a className="button dark" href="#gate-solutions">
                {sw ? "Chagua aina ya geti" : "Find your gate solution"} ↘
              </a>
              <a className="ga-textlink" href={l.whatsapp}>
                WhatsApp ↗
              </a>
            </div>
            <p className="ga-note">
              {sw
                ? "Moshi · Arusha · Mahitaji ya miradi kote Tanzania"
                : "Moshi · Arusha · Project enquiries across Tanzania"}
            </p>
          </div>
          <figure className="ga-hero-image">
            <Image
              src={
                approvedHero?.imageUrl ||
                "/assets/gate-automation/arrival-1440.webp"
              }
              fill
              preload
              sizes="(max-width:760px) 100vw, 55vw"
              alt={
                approvedHero
                  ? sw
                    ? approvedHero.altSw
                    : approvedHero.altEn
                  : sw
                    ? "Watu wawili wakiwa pembeni ya lango la nyumba lenye geti linaloteleza"
                    : "A couple beside an open sliding entrance at a contemporary home"
              }
            />
          </figure>
        </section>
        <nav
          className="ga-jump"
          aria-label={sw ? "Sehemu za ukurasa" : "Page sections"}
        >
          {[
            ["gate-solutions", sw ? "Aina ya geti" : "Your entrance"],
            ["smart-plus", "SMΔRT+"],
            ["gate-equipment", sw ? "Vifaa na modeli" : "Equipment & models"],
            ["gate-support", sw ? "Matengenezo" : "Repairs & care"],
          ].map(([id, title]) => (
            <a href={"#" + id} key={id}>
              {title} ↗
            </a>
          ))}
        </nav>
        <GatePlanner lang={lang} />
        <section className="ga-section ga-smart" id="smart-plus">
          <div>
            <p className="eyebrow">
              {sw
                ? "KIZAZI KIPYA CHA CENTURION"
                : "THE NEW CENTURION GENERATION"}
            </p>
            <h2>
              SMΔRT+.
              <br />
              <em>{sw ? "Zaidi ya rimoti." : "Beyond the remote."}</em>
            </h2>
            <p className="lead">
              {sw
                ? "Mawasiliano ya karibu kwa Bluetooth. Udhibiti wa mbali kwa Wi-Fi na intaneti. Chagua uwezo unaokufaa, si jina la modeli pekee."
                : "Bluetooth nearby. Wi-Fi and Internet when you are away. Choose the capabilities you need, not just a model name."}
            </p>
            <a
              className="button light"
              href={`/catalogue/centurion?lang=${lang}`}
            >
              {sw ? "Chunguza SMΔRT+" : "Explore SMΔRT+"} ↗
            </a>
          </div>
          <div className="ga-smart-points">
            {(sw
              ? [
                  [
                    "01",
                    "Kutumia kila siku",
                    "MyCentsys Remote kwa udhibiti wa mbali kwenye modeli zinazooana. Wi-Fi ya 2.4GHz inapaswa kufika getini na intaneti iwe inafanya kazi.",
                  ],
                  [
                    "02",
                    "Kuweka na kukagua",
                    "MyCentsys Pro kwa usanidi na uchunguzi wa fundi. Huduma ya mbali inahitaji uunganishaji sahihi na ruhusa ya mteja.",
                  ],
                  [
                    "03",
                    "Usalama na umeme",
                    "Beams, mipangilio ya controller na betri huchaguliwa pamoja. Betri ya geti haihakikishi kuwa router yako pia itaendelea kufanya kazi.",
                  ],
                ]
              : [
                  [
                    "01",
                    "Everyday access",
                    "MyCentsys Remote enables remote control on compatible models. A working Internet connection and 2.4GHz Wi-Fi coverage at the gate are needed.",
                  ],
                  [
                    "02",
                    "Setup & diagnostics",
                    "MyCentsys Pro supports installer configuration and diagnostics. Remote support requires the correct connection and customer authorization.",
                  ],
                  [
                    "03",
                    "Safety & backup",
                    "Beams, controller settings and battery provision are specified together. Gate battery backup does not keep your Internet router online.",
                  ],
                ]
            ).map(([n, title, body]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
            <p className="ga-note">
              {sw
                ? "SMΔRT+ na SMΔRT ya zamani si toleo moja. Tunathibitisha modeli, programu na huduma zinazopatikana Tanzania kabla ya kuahidi kipengele."
                : "SMΔRT+ and earlier SMΔRT are different generations. We confirm the exact model, app compatibility and Tanzania service availability before promising a feature."}
            </p>
            <details className="ga-generation-compare">
              <summary>
                {sw
                  ? "SMΔRT au SMΔRT+ — tofauti muhimu"
                  : "SMΔRT or SMΔRT+ — the useful differences"}
                <span aria-hidden="true">+</span>
              </summary>
              <div
                className="ga-comparison-scroll"
                tabIndex={0}
                role="region"
                aria-label={
                  sw
                    ? "Ulinganisho wa vizazi vya mfumo"
                    : "System generation comparison"
                }
              >
                <table>
                  <thead>
                    <tr>
                      <th>{sw ? "Kipengele" : "Capability"}</th>
                      <th>{sw ? "SMΔRT ya awali" : "Earlier SMΔRT"}</th>
                      <th>SMΔRT+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        {sw ? "Mawasiliano ya karibu" : "Local connection"}
                      </th>
                      <td>
                        {sw
                          ? "Bluetooth kwenye modeli zinazoiunga mkono; hakiki controller na programu."
                          : "Bluetooth on supported models; check controller and app compatibility."}
                      </td>
                      <td>
                        {sw
                          ? "Bluetooth LE kwenye modeli za + zilizoorodheshwa."
                          : "Bluetooth LE on the documented + models."}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {sw ? "Udhibiti kupitia intaneti" : "Internet control"}
                      </th>
                      <td>
                        {sw
                          ? "Usidhani Wi-Fi imejengewa ndani; kifaa cha ziada kinachooana kinaweza kuhitajika."
                          : "Do not assume built-in Wi-Fi; a compatible accessory may be needed."}
                      </td>
                      <td>
                        {sw
                          ? "Wi-Fi ya 2.4GHz iliyojengewa ndani kwenye modeli zilizothibitishwa; intaneti na programu inayooana vinahitajika."
                          : "Built-in 2.4GHz Wi-Fi on verified models; working Internet and a compatible app required."}
                      </td>
                    </tr>
                    <tr>
                      <th>{sw ? "Mfumo uliopo" : "Your existing system"}</th>
                      <td>
                        {sw
                          ? "Kagua hali na vipuri kabla ya kuamua kubadilisha."
                          : "Check condition and spare parts before replacing."}
                      </td>
                      <td>
                        {sw
                          ? "Chagua kulingana na geti, matumizi na vifaa vya usalama."
                          : "Select around the gate, duty and safety requirements."}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </section>
        <section className="ga-section" id="gate-equipment">
          <div className="ga-section-heading">
            <div>
              <p className="eyebrow">
                CENTURION / {sw ? "MWONGOZO WA VIFAA" : "EQUIPMENT GUIDE"}
              </p>
              <h2>{sw ? "Chagua kwa kuelewa." : "Know your options."}</h2>
            </div>
            <a
              className="ga-textlink"
              href={`/catalogue/centurion?lang=${lang}`}
            >
              {sw
                ? "Katalogi yote na ulinganisho"
                : "Full catalogue & comparison"}{" "}
              ↗
            </a>
          </div>
          <p className="ga-section-intro">
            {sw
              ? "Geti la nyumbani, geti la biashara au mlango wa gereji—kila moja lina mahitaji yake. Vipimo vya mtengenezaji vinaongoza; tathmini ya eneo inakamilisha uchaguzi."
              : "A home gate, a busy entrance and a garage door need different solutions. Manufacturer ratings guide selection; a site assessment completes it."}
          </p>
          <div className="ga-grid">
            {products
              .filter((p) =>
                [
                  "d5-evo-smart-plus",
                  "d6-smart-plus",
                  "vantage-smart-plus",
                ].includes(p.slug),
              )
              .map((p) => (
                <ProductCard key={p.slug} p={p} lang={lang} />
              ))}
          </div>
          <div className="ga-range-links">
            {[
              ["sliding", sw ? "D3+ hadi D20+" : "D3+ to D20+"],
              [
                "garage",
                sw ? "SDO5+, RDO na shutter" : "SDO5+, RDO & shutters",
              ],
              ["barrier", "SECTOR II"],
              [
                "accessories",
                sw ? "Rimoti, beams na zaidi" : "Remotes, beams & more",
              ],
            ].map(([category, title]) => (
              <a
                key={category}
                href={`/catalogue/centurion?lang=${lang}&category=${category}`}
              >
                {title} ↗
              </a>
            ))}
          </div>
          <p className="ga-note">
            {sw
              ? "Thibitisha modeli, vifaa vilivyojumuishwa na upatikanaji kwenye nukuu yako. Bei ya vifaa pekee hutofautiana na nukuu ya mfumo uliofungwa."
              : "Confirm the exact model, included accessories and current availability in your quotation. Equipment-only and installed-system prices are separate."}
          </p>
        </section>
        <section className="ga-install">
          <figure>
            <Image
              src="/assets/gate-automation/consultation-1440.webp"
              fill
              sizes="(max-width:760px) 100vw, 45vw"
              alt={
                sw
                  ? "Mazungumzo ya kupanga mahitaji ya lango kwenye nyumba"
                  : "A homeowner and technical adviser discussing an entrance plan"
              }
            />
          </figure>
          <div className="ga-section">
            <p className="eyebrow">
              {sw ? "UFUNGAJI UNAOFIKIRIWA VIZURI" : "THOUGHTFUL INSTALLATION"}
            </p>
            <h2>
              {sw ? "Nzuri kuiona." : "Cleanly installed."}
              <br />
              <em>{sw ? "Rahisi kuitumia." : "Easy to live with."}</em>
            </h2>
            <ol className="ga-steps">
              {steps.map(([title, body], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a className="button dark" href={l.survey}>
              {sw ? "Panga ukaguzi wa eneo" : "Arrange a site assessment"} ↗
            </a>
          </div>
        </section>
        <section className="ga-section ga-support" id="gate-support">
          <div>
            <p className="eyebrow">
              {sw ? "TAYARI UNA MOTA?" : "ALREADY AUTOMATED?"}
            </p>
            <h2>
              {sw ? "Rekebisha. Tunza." : "Repair. Maintain."}
              <br />
              <em>{sw ? "Boresha inapofaa." : "Upgrade when it counts."}</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              {sw
                ? "Geti linakwama, betri inashindwa au rimoti haifanyi kazi? Anza na uchunguzi sahihi kabla ya kubadilisha kila kitu."
                : "A sticking gate, failing battery or unreliable remote? Start with diagnosis before replacing everything."}
            </p>
            <p>
              {sw
                ? "Tunapokea mahitaji ya D5 SMART, VANTAGE SMART, VECTOR2, VERT-X, R5, SECTOR na SDO/RDO za zamani. Vipuri na ulinganifu vinahitaji uthibitisho wa modeli na toleo. SMΔRT+ ndiyo mwelekeo mpya wa familia zilizotajwa na mtengenezaji."
                : "Enquire about existing D5 SMART, VANTAGE SMART, VECTOR2, VERT-X, R5, SECTOR and earlier SDO/RDO systems. Parts and compatibility require model and revision checks. SMΔRT+ is the newer generation for the families identified by CENTURION."}
            </p>
            <div className="ga-actions">
              <a
                className="button light"
                href={
                  gateLinks(
                    lang,
                    sw
                      ? "Matengenezo ya mota ya geti iliyopo"
                      : "Existing gate motor repair & maintenance",
                  ).quote
                }
              >
                {sw ? "Omba uchunguzi" : "Request diagnosis"} ↗
              </a>
              <a
                className="ga-textlink"
                href={
                  gateLinks(
                    lang,
                    sw
                      ? "Kubadilisha mota ya geti"
                      : "Gate motor replacement or upgrade",
                  ).quote
                }
              >
                {sw ? "Ulizia kuboresha" : "Discuss an upgrade"} ↗
              </a>
            </div>
          </div>
        </section>
        <section className="ga-section ga-faq">
          <div>
            <p className="eyebrow">
              {sw ? "MASWALI YA WATEJA" : "BEFORE YOU DECIDE"}
            </p>
            <h2>{sw ? "Majibu yanayosaidia." : "Useful answers."}</h2>
            <a className="ga-textlink" href={l.whatsapp}>
              {sw ? "Uliza BM" : "Ask BM"} ↗
            </a>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        {record && (sw ? record.contentSw : record.contentEn) ? (
          <section className="ga-section">
            <details>
              <summary>
                {sw
                  ? "Maelezo ya ziada ya huduma"
                  : "Additional service information"}
              </summary>
              <p>{sw ? record.contentSw : record.contentEn}</p>
            </details>
          </section>
        ) : null}
        <section className="ga-section ga-final">
          <p className="eyebrow">
            {sw ? "ANZA NA ENEO LAKO" : "START WITH YOUR ENTRANCE"}
          </p>
          <h2>{sw ? "Tuambie geti lako." : "Tell us about your gate."}</h2>
          <p className="lead">
            {sw
              ? "Tuma eneo, aina ya geti, upana na picha ikiwezekana. Tutakusaidia kupanga hatua inayofuata—kifaa, ufungaji au matengenezo."
              : "Share your location, gate type, width and a photo if available. We’ll help plan the next step—equipment, installation or repair."}
          </p>
          <div className="ga-actions">
            <a className="button dark" href={l.quote}>
              {sw ? "Omba nukuu" : "Request a quotation"} ↗
            </a>
            <a className="ga-textlink" href={l.survey}>
              {sw ? "Ukaguzi wa eneo" : "Site survey"} ↗
            </a>
            <a className="ga-textlink" href={l.call}>
              {sw ? "Piga simu" : "Call"} +255 760 111 880
            </a>
          </div>
        </section>
        <nav
          className="ga-section ga-related"
          aria-label={sw ? "Huduma zinazohusiana" : "Related services"}
        >
          {[
            ["cctv", sw ? "Kamera za ulinzi" : "CCTV installation"],
            ["electric-fence", sw ? "Uzio wa umeme" : "Electric fencing"],
            ["video-intercom", "Video intercom"],
            [
              "institutional-procurement",
              sw ? "Ununuzi wa taasisi" : "Institutional procurement",
            ],
          ].map(([slug, title]) => (
            <a key={slug} href={`/services/${slug}?lang=${lang}`}>
              {title} ↗
            </a>
          ))}
        </nav>
      </main>
      <Footer lang={lang} imageNotice={false} />
      <div className="ga-mobile-actions">
        <a href={l.whatsapp}>WhatsApp ↗</a>
        <a href={l.survey}>{sw ? "Ukaguzi wa eneo" : "Site assessment"} ↗</a>
      </div>
    </>
  );
}
