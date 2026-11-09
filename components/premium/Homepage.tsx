import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";
import { ExperienceMotion } from "./ExperienceMotion";
import { TrustBelt } from "./TrustBelt";
import { ManufacturerBelts } from "./ManufacturerBelts";
import "./experience.css";

const requirements = [
  {
    asset: "cctv",
    slug: "cctv",
    title: [
      "See what happens on site",
      "Fuatilia kinachoendelea kwenye eneo lako",
    ],
    detail: [
      "Camera coverage, recording and remote viewing, planned around the people and places you need to protect.",
      "Panga maeneo ya kamera, hifadhi ya video na ufuatiliaji wa mbali kulingana na matumizi ya eneo lako.",
    ],
  },
  {
    asset: "gate",
    slug: "electric-fence",
    title: ["Secure the perimeter and entrances", "Linda mipaka na milango"],
    detail: [
      "Combine electric fencing, gate automation and controlled access as the site requires.",
      "Chagua uzio wa umeme, geti la kiotomatiki na udhibiti wa kuingia kulingana na eneo lako.",
    ],
  },
  {
    asset: "electrical",
    slug: "electrical-contracting",
    title: ["Plan electrical work", "Panga kazi za umeme"],
    detail: [
      "Discuss installation, distribution, technical materials and maintenance.",
      "Jadili ufungaji, usambazaji wa umeme, vifaa na matengenezo.",
    ],
  },
  {
    asset: "solar",
    slug: "solar-panel-systems",
    title: [
      "Keep essential equipment running",
      "Dumisha huduma muhimu umeme ukikatika",
    ],
    detail: [
      "Compare solar, batteries, UPS and generators around your load and the time you need backup.",
      "Linganisha sola, betri, UPS na jenereta kulingana na mzigo na muda unaohitaji umeme wa akiba.",
    ],
  },
  {
    asset: "network",
    slug: "networking",
    title: ["Connect offices and teams", "Unganisha ofisi na timu"],
    detail: [
      "Plan structured cabling, reliable networks and business telephone systems.",
      "Panga nyaya za mtandao na mifumo ya simu za ofisi.",
    ],
  },
  {
    asset: "engineering",
    slug: "institutional-procurement",
    title: [
      "Source equipment for a project",
      "Pata vifaa vya mradi au taasisi",
    ],
    detail: [
      "Bring a model list, specification or BOQ for a scoped quotation.",
      "Tuletee orodha ya modeli, vipimo au BOQ ili tuandae nukuu ya bei.",
    ],
  },
] as const;

const equipment = [
  {
    title: ["Building security", "Ulinzi wa majengo"],
    image: "/images/hikvision/ds-2cd2347g2h-liu.webp",
    path: "/catalogue/hikvision",
    brand: "Hikvision",
  },
  {
    title: ["Gate automation", "Mageti ya kiotomatiki"],
    image: "/assets/gate-automation/products/d6.webp",
    path: "/catalogue/centurion",
    brand: "CENTURION",
  },
  {
    title: ["Doors & attendance", "Milango na mahudhurio"],
    image: "/images/access-control/mb360.webp",
    path: "/catalogue/zkteco",
    brand: "ZKTeco",
  },
] as const;

const steps = [
  [
    "Tell us what you need",
    "Share your priorities, site and any drawings or specifications.",
    "Tueleze unachohitaji",
    "Tuma mahitaji, eneo na michoro au vipimo ulivyonavyo.",
  ],
  [
    "Review the site and scope",
    "Agree what to assess and which systems fit your requirements.",
    "Pitia eneo na wigo wa kazi",
    "Tunakubaliana kuhusu tathmini na mifumo inayofaa.",
  ],
  [
    "Review your quotation",
    "See the proposed equipment, scope and next steps before deciding.",
    "Pitia nukuu ya bei",
    "Angalia vifaa vilivyopendekezwa, kazi na hatua zinazofuata.",
  ],
] as const;

export default function Homepage({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    l = sw ? 1 : 0;
  const local = (path: string) => path + "?lang=" + lang;
  const quote = local("/contact");
  const survey = local("/request-site-survey");
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="bm-experience">
        <ExperienceMotion />
        <section className="bm-hero" aria-labelledby="bm-hero-title">
          <Image
            src="/assets/hero-1440.webp"
            alt=""
            fill
            preload
            sizes="100vw"
          />
          <div className="bm-wrap bm-hero-inner">
            <p className="bm-label">
              {sw
                ? "USALAMA · UMEME · MAWASILIANO"
                : "SECURITY · ELECTRICAL · CONNECTIVITY"}
            </p>
            <h1 id="bm-hero-title">
              {sw ? "Linda eneo lako." : "Protect your premises."}
              <br />
              <em>
                {sw ? "Endeleza shughuli zako." : "Keep your site running."}
              </em>
            </h1>
            <p>
              {sw
                ? "CCTV, uzio wa umeme, mageti ya kiotomatiki na mifumo ya umeme kwa makazi, biashara na taasisi Tanzania."
                : "CCTV, electric fencing, gate automation and electrical systems for homes, businesses and institutions in Tanzania."}
            </p>
            <div className="bm-actions">
              <a className="bm-action bm-solid" href="#services">
                {sw ? "Chagua unachohitaji" : "Find your solution"}{" "}
                <span aria-hidden="true">↓</span>
              </a>
              <a className="bm-action bm-outline" href={quote}>
                {sw ? "Omba nukuu ya bei" : "Request a quotation"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p className="bm-hero-location">MOSHI · ARUSHA · TANZANIA</p>
        </section>
        <section id="services" className="bm-wrap bm-section" data-bm-reveal>
          <div className="bm-section-heading">
            <p className="bm-label">
              {sw
                ? "01 / CHAGUA MAHITAJI YAKO"
                : "01 / CHOOSE YOUR REQUIREMENT"}
            </p>
            <h2>
              {sw ? "Unahitaji kufanya nini?" : "What do you need to do?"}
            </h2>
          </div>
          <div className="bm-requirements">
            {requirements.map(({ asset, slug, title, detail }, i) => (
              <details name="bm-home-requirements" key={slug} open={i === 0}>
                <summary>
                  <span className="bm-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>{title[l]}</span>
                  <span className="bm-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="bm-requirement-panel">
                  <Image
                    src={`/assets/${asset}-640.webp`}
                    alt=""
                    width={640}
                    height={426}
                    sizes="(max-width: 680px) 94vw, 32vw"
                  />
                  <div>
                    <p>{detail[l]}</p>
                    <div className="bm-links">
                      <a href={local("/services/" + slug)}>
                        {sw ? "Fahamu huduma" : "Explore the service"} ↗
                      </a>
                      {i === 1 && (
                        <a href={local("/services/gate-motors")}>
                          {sw ? "Mageti ya kiotomatiki" : "Gate automation"} ↗
                        </a>
                      )}
                      {i === 3 && (
                        <a href={local("/services/generators")}>
                          {sw ? "Jenereta" : "Generators"} ↗
                        </a>
                      )}
                      {i === 4 && (
                        <a href={local("/services/telephone-systems")}>
                          {sw ? "Simu za ofisi" : "Business telephony"} ↗
                        </a>
                      )}
                      <a
                        href={
                          survey + "&service=" + encodeURIComponent(title[l])
                        }
                      >
                        {sw ? "Panga tathmini ya eneo" : "Plan a site survey"} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <a className="bm-text-link" href={local("/services")}>
            {sw ? "Huduma zote za BM" : "View all BM services"} ↗
          </a>
        </section>
        <section className="bm-applications" data-bm-reveal>
          <div className="bm-application-image">
            <Image
              src="/images/hikvision/reception.webp"
              alt={
                sw
                  ? "Picha ya mfano ya mapokezi ya jengo"
                  : "Illustrative reception at a contemporary building"
              }
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
            />
          </div>
          <div className="bm-application-copy">
            <p className="bm-label">
              {sw
                ? "02 / MIFUMO KWA ENEO LAKO"
                : "02 / SOLUTIONS FOR YOUR SITE"}
            </p>
            <h2>
              {sw
                ? "Kutoka getini hadi mapokezi."
                : "From the gate to reception."}
            </h2>
            <p>
              {sw
                ? "Panga CCTV, udhibiti wa milango na intercom kulingana na jinsi wageni na wafanyakazi wanavyotumia jengo."
                : "Plan CCTV, access control and intercom around how visitors and staff use the building."}
            </p>
            <a
              className="bm-action bm-outline"
              href={local("/services/hikvision")}
            >
              {sw ? "Ulinzi wa majengo" : "Explore building security"} ↗
            </a>
          </div>
        </section>
        <section id="equipment" className="bm-wrap bm-section" data-bm-reveal>
          <div className="bm-section-heading">
            <p className="bm-label">
              {sw ? "03 / VIFAA NA MATUMIZI" : "03 / EQUIPMENT & APPLICATIONS"}
            </p>
            <h2>
              {sw
                ? "Angalia vifaa kwa matumizi yako."
                : "See the equipment behind the solution."}
            </h2>
          </div>
          <div className="bm-equipment-grid">
            {equipment.map((item) => (
              <a
                className="bm-equipment-card"
                key={item.brand}
                href={local(item.path)}
              >
                <div className="bm-equipment-image">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width:680px) 84vw, 30vw"
                  />
                </div>
                <div>
                  <p className="bm-label">{item.brand}</p>
                  <h3>
                    {item.title[l]} <span aria-hidden="true">↗</span>
                  </h3>
                </div>
              </a>
            ))}
          </div>
          <a className="bm-text-link" href={local("/products")}>
            {sw ? "Fungua orodha ya vifaa" : "Browse all equipment"} ↗
          </a>
        </section>
        <ManufacturerBelts lang={lang} />
        <TrustBelt kind="sectors" lang={lang} />
        <section id="approach" className="bm-wrap bm-section" data-bm-reveal>
          <div className="bm-section-heading">
            <p className="bm-label">
              {sw ? "04 / JINSI TUNAVYOFANYA KAZI" : "04 / HOW IT WORKS"}
            </p>
            <h2>
              {sw
                ? "Hatua tatu kuelekea nukuu."
                : "Three steps to a quotation."}
            </h2>
          </div>
          <ol className="bm-process">
            {steps.map(([en, detail, swTitle, swDetail], i) => (
              <li key={en}>
                <span className="bm-index">0{i + 1}</span>
                <h3>{sw ? swTitle : en}</h3>
                <p>{sw ? swDetail : detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="contact" className="bm-contact" data-bm-reveal>
          <div className="bm-wrap">
            <p className="bm-label">
              {sw ? "TUZUNGUMZIE MRADI WAKO" : "LET’S DISCUSS YOUR PROJECT"}
            </p>
            <h2>
              {sw
                ? "Tuanzie kwenye mahitaji yako."
                : "Tell us what your site needs."}
            </h2>
            <div className="bm-actions">
              <a className="bm-action bm-solid" href={quote}>
                {sw ? "Omba nukuu ya bei" : "Request a quotation"} ↗
              </a>
              <a className="bm-action bm-outline" href={survey}>
                {sw ? "Panga tathmini ya eneo" : "Plan a site survey"} ↗
              </a>
              <a className="bm-text-link" href={`tel:${siteConfig.sales.raw}`}>
                {siteConfig.sales.label}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
