import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ExperienceMotion } from "@/components/premium/ExperienceMotion";
import technical from "@/data/specialist-technical-content.json";
import { paApplications, paEquipment } from "@/data/pa-sound";
import { getServiceRecord } from "@/lib/services";
import { languageUrl, SITE_URL } from "@/lib/seo";
import type { Language } from "@/lib/i18n/config";
import "./pa-sound.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const [params, record] = await Promise.all([
    searchParams,
    getServiceRecord("pa-sound-systems"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang: Language = params.lang === "sw" ? "sw" : "en",
    sw = lang === "sw";
  const quote = (subject: string) =>
    `/contact?lang=${lang}&subject=${encodeURIComponent(subject)}`;
  const survey = `/request-site-survey?lang=${lang}&service=${encodeURIComponent("PA, paging and sound system installation")}`;
  const title = sw
    ? "Mifumo ya PA, matangazo na sauti."
    : "Public address, paging & sound systems.";
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": languageUrl("/services/pa-sound-systems", lang) + "#service",
        name: title,
        serviceType: "Public address and sound system supply and installation",
        provider: { "@id": SITE_URL + "/#business" },
        areaServed: { "@type": "Country", name: "Tanzania" },
        url: languageUrl("/services/pa-sound-systems", lang),
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
            name: sw ? "Huduma" : "Services",
            item: languageUrl("/services", lang),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: languageUrl("/services/pa-sound-systems", lang),
          },
        ],
      },
    ],
  };
  const tech = technical["pa-sound-systems"][lang];
  const faqs = sw
    ? [
        [
          "Naweza kununua vifaa pekee?",
          "Ndiyo. Tuma modeli, idadi na mfumo uliopo. Tutathibitisha uoanifu unaohitajika, bei ya sasa na upatikanaji kwenye nukuu.",
        ],
        [
          "Spika mpya zitatumika na amplifaya yangu?",
          "Tunahakiki matokeo ya amplifaya, aina ya spika na jumla ya mizigo. Spika ya 100 V haiunganishwi kwa kubahatisha kwenye matokeo ya 4/8 Ω; modeli na njia sahihi ya kuunganisha vithibitishwe kwanza.",
        ],
        [
          "Nitajua vipi idadi ya spika ninazohitaji?",
          "Vipimo vya eneo, urefu wa dari, kelele za mazingira, mwangwi na aina ya matumizi huongoza mpango. Idadi ya W pekee haitoshi kuamua mfumo.",
        ],
        [
          "Ufungaji unajumuisha nini?",
          "Wigo hukubaliwa kwenye nukuu. Kwa mfumo kamili unaweza kuhusisha njia za nyaya, ufungaji, usanidi wa maeneo ya matangazo, majaribio ya kusikika, mafunzo ya matumizi na makabidhiano. Mahitaji ya tahadhari za dharura yapangiwe na kuthibitishwa tofauti.",
        ],
      ]
    : [
        [
          "Can I buy equipment without installation?",
          "Yes. Send model references, quantities and any existing system details. Compatibility requirements, current prices and availability are confirmed in your quotation.",
        ],
        [
          "Will new speakers work with my existing amplifier?",
          "We check the amplifier outputs, speaker type and total load. A 100 V speaker should not be connected by guesswork to a 4/8 Ω output; confirm the exact models and connection design first.",
        ],
        [
          "How many speakers will the building need?",
          "Coverage depends on dimensions, ceiling height, background noise, acoustics and intended use. Amplifier wattage alone does not determine a suitable system.",
        ],
        [
          "What does installation include?",
          "The quotation defines the scope. A complete system can include cable routes, mounting, zone configuration, intelligibility checks, user instruction and handover. Emergency-announcement requirements need separate assessment and design confirmation.",
        ],
      ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="pa-main">
        <ExperienceMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
          }}
        />
        <section className="pa-hero pa-wrap">
          <div>
            <p className="pa-label">
              {sw
                ? "HUDUMA ZA SAUTI / BM CONTRACTORS"
                : "SOUND SOLUTIONS / BM CONTRACTORS"}
            </p>
            <h1>{title}</h1>
            <p>
              {sw
                ? "Sauti inayoeleweka kwa shule, mikutano, hoteli, maeneo ya ibada na matangazo ya biashara. Vifaa vya Ahuja na mfumo unaopangwa kwa eneo lako."
                : "Clear speech for schools, meetings, hotels, places of worship and commercial announcements. Ahuja equipment, with the system planned around your space."}
            </p>
            <div className="pa-actions">
              <a className="pa-button" href={survey}>
                {sw ? "Panga tathmini ya eneo" : "Plan a site assessment"} ↗
              </a>
              <a href={quote("Ahuja PA equipment-only supply")}>
                {sw ? "Omba bei ya vifaa" : "Request equipment prices"} ↗
              </a>
            </div>
          </div>
          <div className="pa-hero-equipment">
            <Image
              src="/images/pa-sound/ssa-250m.webp"
              alt="AHUJA SSA-250M PA mixer amplifier"
              width={750}
              height={400}
              loading="eager"
              sizes="(max-width:760px) 90vw, 45vw"
            />
            <span>AHUJA / SSA-250M</span>
            <p>
              {sw
                ? "Vifaa sahihi. Sauti inayofaa eneo."
                : "The right equipment. Sound that fits the space."}
            </p>
          </div>
        </section>
        <section className="pa-applications pa-wrap">
          <div>
            <p className="pa-label">
              {sw ? "ANZA NA MATUMIZI" : "START WITH THE SPACE"}
            </p>
            <h2>
              {sw ? "Ujumbe ufike vizuri." : "Make every announcement count."}
            </h2>
          </div>
          <ul>
            {paApplications.map((a) => (
              <li key={a.en}>
                <h3>{a[lang]}</h3>
                <p>{sw ? a.detailSw : a.detailEn}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="pa-flow-section" data-bm-belt>
          <div className="pa-wrap pa-flow-inner">
            <div>
              <p className="pa-label">
                {sw ? "MPANGO WA MFUMO" : "A COORDINATED SYSTEM"}
              </p>
              <h2>
                {sw
                  ? "Kila kifaa kina nafasi yake."
                  : "Each part has a purpose."}
              </h2>
              <p>{tech.intro}</p>
            </div>
            <div
              className="pa-flow"
              role="img"
              aria-label={
                sw
                  ? "Mpangilio wa sauti kutoka kipaza sauti, kupitia amplifaya, hadi spika zinazooana"
                  : "Conceptual signal flow from microphone through amplifier to matched speakers"
              }
            >
              <div>
                <span>01</span>
                {sw ? "Kipaza sauti" : "Microphone"}
              </div>
              <svg viewBox="0 0 90 24" aria-hidden="true">
                <path d="M0 12H90" />
                <path className="pa-flow-signal" d="M0 12H90" />
              </svg>
              <div>
                <span>02</span>
                {sw ? "Amplifaya" : "Amplifier"}
              </div>
              <svg viewBox="0 0 90 24" aria-hidden="true">
                <path d="M0 12H90" />
                <path className="pa-flow-signal" d="M0 12H90" />
              </svg>
              <div>
                <span>03</span>
                {sw ? "Spika" : "Speakers"}
              </div>
            </div>
          </div>
        </section>
        <section className="pa-equipment pa-wrap">
          <div className="pa-section-heading">
            <div>
              <p className="pa-label">
                {sw ? "VIFAA VYA AHUJA" : "AHUJA EQUIPMENT REFERENCES"}
              </p>
              <h2>
                {sw
                  ? "Vifaa kwa matumizi yako."
                  : "Choose around the application."}
              </h2>
            </div>
            <p>
              {sw
                ? "Mifano ya vifaa vya mtengenezaji. Modeli, bei na upatikanaji huthibitishwa tunapoandaa nukuu yako."
                : "Manufacturer equipment examples. Exact models, prices and availability are confirmed when we prepare your quotation."}
            </p>
          </div>
          <div className="pa-product-grid">
            {paEquipment.map((item) => (
              <article key={item.model}>
                <div className="pa-product-image">
                  <Image
                    src={`/images/pa-sound/${item.image}.webp`}
                    alt={`AHUJA ${item.model}`}
                    fill
                    sizes="(max-width:600px) 44vw, 28vw"
                  />
                </div>
                <div className="pa-product-copy">
                  <p className="pa-label">{item[lang].type}</p>
                  <h3>{item.model}</h3>
                  <details>
                    <summary>
                      {sw ? "Maelezo ya kiufundi" : "Technical details"} +
                    </summary>
                    <p>{item[lang].detail}</p>
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sw
                        ? "Taarifa za mtengenezaji"
                        : "Manufacturer reference"}{" "}
                      ↗
                    </a>
                  </details>
                  <a
                    className="pa-price-link"
                    href={quote("Equipment enquiry — AHUJA " + item.model)}
                  >
                    {sw ? "Omba bei ya sasa" : "Request current price"} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pa-delivery pa-wrap">
          <div>
            <p className="pa-label">
              {sw
                ? "VIFAA AU UFUNGAJI KAMILI"
                : "EQUIPMENT OR A COMPLETE INSTALLATION"}
            </p>
            <h2>
              {sw
                ? "Mpango wazi. Makabidhiano yanayoeleweka."
                : "A clear scope. A useful handover."}
            </h2>
          </div>
          <ol>
            {tech.comparison.map((item) => (
              <li key={item.option}>
                <strong>{item.option}</strong>
                <p>{item.consideration}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="pa-faq pa-wrap">
          <h2>{sw ? "Maswali kabla ya kuamua." : "Before you decide."}</h2>
          {[...faqs, [tech.faq.question, tech.faq.answer]].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
          <a
            className="pa-guide"
            href={`/blog/planning-a-pa-system-tanzania?lang=${lang}`}
          >
            {sw
              ? "Mwongozo mfupi wa kupanga mfumo wa sauti"
              : "Read our short guide to planning a PA system"}{" "}
            ↗
          </a>
        </section>
        <section className="pa-contact">
          <div className="pa-wrap">
            <p className="pa-label">
              {sw ? "TUAMBIE KUHUSU ENEO LAKO" : "TELL US ABOUT YOUR SPACE"}
            </p>
            <h2>
              {sw ? "Tupange sauti inayokufaa." : "Let’s plan the right sound."}
            </h2>
            <p>
              {sw
                ? "Tuma aina ya jengo, eneo, idadi ya vyumba au maeneo na vifaa vilivyopo."
                : "Share the building type, location, rooms or paging zones and any existing equipment."}
            </p>
            <div className="pa-actions">
              <a className="pa-button" href={survey}>
                {sw ? "Omba tathmini ya eneo" : "Request a site assessment"} ↗
              </a>
              <a href={quote("PA and sound complete installation quotation")}>
                {sw
                  ? "Omba nukuu ya mfumo kamili"
                  : "Request a complete-system quotation"}{" "}
                ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
