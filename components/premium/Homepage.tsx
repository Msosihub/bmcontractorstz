"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Lang = "en" | "sw";
const assets = [
  "cctv",
  "gate",
  "electrical",
  "solar",
  "generator",
  "network",
  "telephone",
  "engineering",
];
const copy = {
  en: {
    preview: "PRIVATE DESIGN REVIEW",
    concept: "AI-generated concept imagery · No completed projects depicted",
    nav: ["Expertise", "Equipment", "Our approach", "Contact"],
    quote: "Discuss your project",
    menu: "Menu",
    close: "Close",
    eyebrow: "SECURITY SYSTEMS · ELECTRICAL CONTRACTING",
    title: (
      <>
        Protection.
        <br />
        Power.
        <br />
        <em>Peace of mind.</em>
      </>
    ),
    intro:
      "CCTV installation, electric fencing, gate automation and electrical contracting. Thoughtfully planned for your site.",
    heroCta: "Explore our services",
    heroNote: "For homes, businesses, hotels and institutions in Tanzania.",
    scroll: "A considered approach. From the first conversation.",
    serviceLabel: "01 / OUR EXPERTISE",
    serviceTitle: (
      <>
        Security and electrical.
        <br />
        <em>Planned around you.</em>
      </>
    ),
    serviceIntro:
      "From a secure entrance to dependable power and connected workplaces. Start with what your site needs.",
    services: [
      "CCTV installation & surveillance",
      "Electric fencing & gate automation",
      "Electrical contracting",
      "Solar & battery backup",
      "Standby generators",
      "ICT & structured networking",
      "Business telephones & IP-PBX",
      "Institutional procurement",
    ],
    descriptions: [
      "Thoughtful camera coverage, recording and remote access, planned around the way your property is used.",
      "Perimeter protection and controlled entry, with electric fencing and gate automation considered together.",
      "Electrical installation, distribution, materials and maintenance, with the scope defined around your project.",
      "Solar, hybrid inverter, UPS and battery enquiries brought together around your power requirements.",
      "Generator supply, changeover and integration enquiries, with technical and servicing scope confirmed for each site.",
      "Structured cabling, network cabinets and office connectivity, designed for organized, maintainable infrastructure.",
      "Office extensions, IP phones and business communication requirements, considered alongside your network.",
      "A clear route from your specifications or BOQ to equipment sourcing and a project-specific quotation.",
    ],
    discuss: "Discuss this requirement",
    imageLabel: "AI-generated illustration",
    technical:
      "Technical scope and delivery arrangements are confirmed during quotation.",
    engineeringLabel: "02 / ENGINEERING WITH PURPOSE",
    engineeringTitle: (
      <>
        The details matter.
        <br />
        <em>So does the whole.</em>
      </>
    ),
    engineeringCopy:
      "Good systems belong to the building. We begin with your requirements, consider how the systems work together, and define a practical scope for supply, installation and support.",
    engineeringItems: [
      "Electrical systems & materials",
      "Power generation & backup",
      "Technical equipment procurement",
    ],
    powerLabel: "POWER, CONSIDERED",
    powerTitle: (
      <>
        Keep your operations
        <br />
        <em>moving.</em>
      </>
    ),
    powerCopy:
      "Generators, solar, UPS and battery backup. Discuss the load, the site and the level of continuity your operation needs.",
    powerCta: "Plan your power requirements",
    equipmentLabel: "03 / THE EQUIPMENT COLLECTION",
    equipmentTitle: (
      <>
        Technical equipment.
        <br />
        <em>A more considered selection.</em>
      </>
    ),
    equipmentCopy:
      "Explore the equipment families behind your project. Specific models, specifications, availability and prices are confirmed with our team.",
    categories: [
      "Security & access",
      "Power & backup",
      "Networks & communications",
    ],
    retail: "Retail enquiries",
    wholesale: "Trade & wholesale enquiries",
    categoryCta: "Discuss equipment",
    approachLabel: "04 / WORKING TOGETHER",
    approachTitle: (
      <>
        Clarity from
        <br />
        <em>the beginning.</em>
      </>
    ),
    steps: [
      [
        "Your requirements",
        "Tell us about your property, priorities and specifications.",
      ],
      [
        "Site & technical review",
        "Agree what needs to be assessed and define a suitable scope.",
      ],
      [
        "A considered quotation",
        "Review equipment, delivery arrangements and the proposed next step.",
      ],
    ],
    contactLabel: "LET’S DISCUSS YOUR NEXT PROJECT",
    contactTitle: (
      <>
        A better environment
        <br />
        <em>starts with a conversation.</em>
      </>
    ),
    contactCopy:
      "Bring us a requirement, a drawing or a question. We will help define the next step.",
    telephone: "Telephone",
    email: "Email",
    footer: "Security. Engineering. Technology.",
    footerNote:
      "All photographs on this review page are AI-generated illustrations. They do not represent completed BM projects, clients, employees or specific product models.",
    rights: "BM Engineering Contractors Limited",
    language: "Language",
    modalTitle: "Tell us about your requirements",
    modalNote:
      "Design preview: this form prepares an enquiry on screen. It does not send messages or save customer data.",
    name: "Your name or organization",
    contact: "Phone or email",
    requirement: "Project requirements",
    submit: "Preview enquiry",
    prepared: "Your preview enquiry is prepared. No message was sent.",
    back: "Continue exploring",
    equipmentTag: "EQUIPMENT CATEGORY",
    noProjects:
      "Genuine project photography and verified case studies will be added separately.",
  },
  sw: {
    preview: "MAPITIO YA MUUNDO",
    concept: "Picha zimezalishwa kwa AI · Si miradi iliyotekelezwa",
    nav: ["Huduma", "Vifaa", "Namna tunavyofanya kazi", "Mawasiliano"],
    quote: "Tuzungumzie mradi wako",
    menu: "Menyu",
    close: "Funga",
    eyebrow: "MIFUMO YA USALAMA · KAZI ZA UMEME",
    title: (
      <>
        Usalama.
        <br />
        Umeme.
        <br />
        <em>Kwa uhakika.</em>
      </>
    ),
    intro:
      "Ufungaji wa CCTV, uzio wa umeme, milango ya kiotomatiki na kazi za umeme. Tunapanga kila mfumo kulingana na mahitaji yako.",
    heroCta: "Fahamu huduma zetu",
    heroNote: "Kwa makazi, biashara, hoteli na taasisi nchini Tanzania.",
    scroll: "Tunaanza kwa kukusikiliza. Kisha tunapanga hatua inayofaa.",
    serviceLabel: "01 / HUDUMA ZETU",
    serviceTitle: (
      <>
        Usalama na umeme.
        <br />
        <em>Kulingana na mahitaji yako.</em>
      </>
    ),
    serviceIntro:
      "Linda eneo lako, boresha mifumo ya umeme na unganisha mawasiliano ya ofisi. Tueleze unachohitaji ili tupange kazi inayofaa.",
    services: [
      "Ufungaji wa CCTV",
      "Uzio wa umeme na milango ya kiotomatiki",
      "Kazi za umeme",
      "Sola na mifumo ya betri",
      "Jenereta za umeme wa akiba",
      "TEHAMA na mitandao",
      "Mifumo ya simu za ofisi na IP-PBX",
      "Ugavi wa vifaa kwa taasisi",
    ],
    descriptions: [
      "Mpangilio wa kamera, uhifadhi wa video na ufuatiliaji wa mbali unaozingatia matumizi ya eneo lako.",
      "Ufungaji wa uzio wa umeme na mifumo ya kufungua na kufunga milango kiotomatiki, kulingana na mahitaji ya usalama wa eneo lako.",
      "Ufungaji wa mifumo ya umeme, usambazaji wa vifaa na matengenezo, kwa kazi zilizokubaliwa kulingana na mahitaji ya mradi wako.",
      "Sola, hybrid inverter, UPS na betri: tunazingatia vifaa unavyotumia na mahitaji yako ya umeme wa akiba.",
      "Ugavi wa jenereta na uunganishaji wa changeover. Kazi za ufungaji na matengenezo hukubaliwa baada ya kubaini mahitaji ya eneo lako.",
      "Ufungaji wa nyaya, makabati ya mtandao na mawasiliano ya ofisi, kwa miundombinu iliyopangwa na inayotunzwa kwa urahisi.",
      "Simu za ndani za ofisi, IP phones na IP-PBX kwa mawasiliano ya biashara, zikioanishwa na mtandao wako.",
      "Tuletee mahitaji ya kiufundi au BOQ yako. Tutakusaidia kutafuta vifaa vinavyofaa na kuandaa nukuu ya bei kulingana na mahitaji hayo.",
    ],
    discuss: "Jadili mahitaji haya",
    imageLabel: "Picha ya mfano iliyozalishwa kwa AI",
    technical:
      "Kazi zitakazofanyika na utaratibu wa utekelezaji huthibitishwa kwenye nukuu ya bei.",
    engineeringLabel: "02 / KAZI ZA UMEME NA MIFUMO",
    engineeringTitle: (
      <>
        Kila sehemu ni muhimu.
        <br />
        <em>Mifumo ifanye kazi pamoja.</em>
      </>
    ),
    engineeringCopy:
      "Tunaanza kwa kuelewa mahitaji ya jengo lako na jinsi mifumo yake inavyounganishwa. Kisha tunakubaliana kuhusu vifaa, ufungaji na huduma utakazohitaji.",
    engineeringItems: [
      "Mifumo na vifaa vya umeme",
      "Uzalishaji na akiba ya umeme",
      "Manunuzi ya vifaa vya kiufundi",
    ],
    powerLabel: "UMEME WA AKIBA KWA MAHITAJI YAKO",
    powerTitle: (
      <>
        Jiandae kwa
        <br />
        <em>umeme unapokatika.</em>
      </>
    ),
    powerCopy:
      "Jenereta, sola, UPS na betri za akiba. Tueleze vifaa unavyotumia na shughuli unazohitaji ziendelee umeme unapokatika.",
    powerCta: "Panga mahitaji yako ya umeme",
    equipmentLabel: "03 / MAKUNDI YA VIFAA",
    equipmentTitle: (
      <>
        Vifaa vinavyofaa.
        <br />
        <em>Kwa mahitaji ya kazi yako.</em>
      </>
    ),
    equipmentCopy:
      "Fahamu makundi ya vifaa vya mradi wako. Modeli, vipimo, upatikanaji na bei huthibitishwa na timu yetu.",
    categories: [
      "Usalama na udhibiti wa kuingia",
      "Nishati na umeme wa akiba",
      "Mitandao na mawasiliano",
    ],
    retail: "Ulizia ununuzi wa rejareja",
    wholesale: "Ulizia ununuzi wa jumla",
    categoryCta: "Jadili vifaa",
    approachLabel: "04 / KUFANYA KAZI PAMOJA",
    approachTitle: (
      <>
        Uwazi tangu
        <br />
        <em>mwanzo.</em>
      </>
    ),
    steps: [
      [
        "Mahitaji yako",
        "Tueleze kuhusu eneo lako, vipaumbele na maelezo ya kiufundi.",
      ],
      [
        "Tathmini ya eneo na kiufundi",
        "Tunakubaliana kuhusu tathmini inayohitajika na kazi zitakazofanyika.",
      ],
      [
        "Nukuu ya bei",
        "Pitia vifaa vilivyopendekezwa, gharama na utaratibu wa utekelezaji.",
      ],
    ],
    contactLabel: "TUZUNGUMZIE MRADI WAKO",
    contactTitle: (
      <>
        Tuanzie kwenye
        <br />
        <em>mahitaji yako.</em>
      </>
    ),
    contactCopy:
      "Una mahitaji, mchoro au swali? Wasiliana nasi tupange hatua inayofuata.",
    telephone: "Simu",
    email: "Barua pepe",
    footer: "Usalama. Uhandisi. Teknolojia.",
    footerNote:
      "Picha zote kwenye ukurasa huu wa mapitio zimezalishwa kwa AI. Hazionyeshi miradi ya BM iliyokamilika, wateja, wafanyakazi au modeli maalumu za bidhaa.",
    rights: "BM Engineering Contractors Limited",
    language: "Lugha",
    modalTitle: "Tueleze mahitaji yako",
    modalNote:
      "Muundo wa majaribio: fomu hii inaandaa ombi kwenye skrini pekee. Haitumi ujumbe wala kuhifadhi taarifa za mteja.",
    name: "Jina lako au la taasisi",
    contact: "Simu au barua pepe",
    requirement: "Mahitaji ya mradi",
    submit: "Angalia ombi la mfano",
    prepared: "Ombi lako la mfano limeandaliwa. Hakuna ujumbe uliotumwa.",
    back: "Endelea kutazama",
    equipmentTag: "KUNDI LA VIFAA",
    noProjects:
      "Picha halisi na maelezo ya miradi vitaongezwa baada ya kuthibitishwa.",
  },
};
const anchors = ["services", "equipment", "approach", "contact"];
const servicePaths = [
  "cctv",
  "electric-fence",
  "electrical-contracting",
  "solar-panel-systems",
  "generators",
  "networking",
  "telephone-systems",
  "institutional-procurement",
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Photo({
  asset,
  alt,
  className = "",
  priority = false,
  label,
}: {
  asset: string;
  alt: string;
  className?: string;
  priority?: boolean;
  label: string;
}) {
  return (
    <figure className={"photo " + className}>
      <Image
        src={"/assets/" + asset + "-1440.webp"}
        alt={alt}
        fill
        sizes={priority ? "100vw" : "(max-width: 760px) 100vw, 55vw"}
        preload={priority}
        style={{ objectFit: "cover" }}
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
export default function Homepage({ lang }: { lang: Lang }) {
  const router = useRouter();
  const t = copy[lang];
  const [active, setActive] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);
  const enquire = (value: string) => {
    router.push(
      "/request-site-survey?lang=" +
        lang +
        "&service=" +
        encodeURIComponent(value),
    );
  };
  return (
    <>
      <a className="skip" href="#main">
        {lang === "en" ? "Skip to content" : "Nenda kwenye maudhui"}
      </a>
      <div className="review-bar">
        <span>{t.preview}</span>
        <span>{t.concept}</span>
      </div>
      <header className="site-header">
        <a
          className="brand"
          href={"/?lang=" + lang}
          aria-label="BM Engineering Contractors homepage"
        >
          <Image
            src="/assets/official-logo.png"
            width={42}
            height={46}
            alt="BM Contractors official shield"
          />
          <span>
            BM CONTRACTORS<small>ENGINEERING · TANZANIA</small>
          </span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={lang === "en" ? "Main navigation" : "Menyu kuu"}
        >
          {t.nav.map((x, i) => (
            <a href={"#" + anchors[i]} key={x}>
              {x}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="languages" aria-label={t.language}>
            <a
              href="?lang=en"
              lang="en"
              aria-label="English"
              aria-current={lang === "en" ? "page" : undefined}
            >
              EN
            </a>
            <span>/</span>
            <a
              href="?lang=sw"
              lang="sw"
              aria-label="Kiswahili"
              aria-current={lang === "sw" ? "page" : undefined}
            >
              SW
            </a>
          </div>
          <button className="header-enquiry" onClick={() => enquire("")}>
            {t.quote}
            <Arrow />
          </button>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? t.close : t.menu}
            <span aria-hidden="true">{menu ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      {menu ? (
        <nav className="mobile-menu" id="mobile-menu" aria-label={t.menu}>
          {t.nav.map((x, i) => (
            <a href={"#" + anchors[i]} key={x} onClick={() => setMenu(false)}>
              {x}
              <Arrow />
            </a>
          ))}
          <button onClick={() => enquire("")}>
            {t.quote}
            <Arrow />
          </button>
        </nav>
      ) : null}
      <main id="main">
        <section className="hero" lang={lang}>
          <Photo
            asset="hero"
            alt={
              lang === "en"
                ? "AI-generated contemporary building with discreet CCTV and automated entrance"
                : "Jengo la mfano lililozalishwa kwa AI lenye CCTV na lango la kiotomatiki"
            }
            label={t.imageLabel}
            priority
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <button className="button ivory" onClick={() => enquire("")}>
                {t.quote}
                <Arrow />
              </button>
              <a className="hero-services" href="#services">
                {t.heroCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-note">{t.heroNote}</p>
          </div>
          <div className="hero-index">
            <span>BM / 01</span>
            <span>
              {lang === "en"
                ? "Security · Electrical · Connected systems"
                : "Usalama · Umeme · Mawasiliano"}
            </span>
          </div>
        </section>
        <div className="intro-line">
          <p>{t.scroll}</p>
          <a href="#services" aria-label={t.heroCta}>
            ↓
          </a>
        </div>
        <section className="section expertise" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.serviceLabel}</p>
              <h2>{t.serviceTitle}</h2>
            </div>
            <p className="section-intro">{t.serviceIntro}</p>
          </div>
          <div className="expertise-layout">
            <Photo
              asset={assets[active ?? 0]}
              alt={t.services[active ?? 0] + " — " + t.imageLabel}
              label={t.imageLabel}
              className="expertise-photo"
            />
            <div
              className="service-list"
              role="group"
              aria-label={
                lang === "en" ? "Explore our services" : "Fahamu huduma zetu"
              }
            >
              {t.services.map((name, i) => (
                <div
                  className={"service-item " + (active === i ? "active" : "")}
                  key={name}
                >
                  <button
                    id={"service-tab-" + i}
                    aria-expanded={active === i}
                    aria-controls={"service-panel-" + i}
                    onClick={() =>
                      setActive((previous) => (previous === i ? null : i))
                    }
                  >
                    <span className="index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{name}</span>
                    <span aria-hidden="true">{active === i ? "−" : "+"}</span>
                  </button>
                  {active === i ? (
                    <div
                      role="region"
                      id={"service-panel-" + i}
                      aria-labelledby={"service-tab-" + i}
                    >
                      <p>{t.descriptions[i]}</p>
                      <a
                        className="text-link"
                        href={"/services/" + servicePaths[i] + "?lang=" + lang}
                      >
                        {t.discuss}
                        <Arrow />
                      </a>
                      {i === 1 && (
                        <a
                          className="text-link"
                          href={"/services/gate-motors?lang=" + lang}
                        >
                          {lang === "sw"
                            ? "Milango ya kiotomatiki"
                            : "Gate automation"}
                          <Arrow />
                        </a>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <p className="scope-note">{t.technical}</p>
        </section>
        <section className="engineering">
          <div className="engineering-copy">
            <p className="eyebrow">{t.engineeringLabel}</p>
            <h2>{t.engineeringTitle}</h2>
            <p>{t.engineeringCopy}</p>
            <ul>
              {t.engineeringItems.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="button dark"
              onClick={() => enquire(t.services[7])}
            >
              {t.quote}
              <Arrow />
            </button>
          </div>
          <Photo
            asset="electrical"
            alt={t.services[2] + " — " + t.imageLabel}
            label={t.imageLabel}
            className="engineering-photo"
          />
        </section>
        <section className="power">
          <div className="power-images">
            <Photo
              asset="solar"
              alt={t.services[3] + " — " + t.imageLabel}
              label={t.imageLabel}
            />
            <Photo
              asset="generator"
              alt={t.services[4] + " — " + t.imageLabel}
              label={t.imageLabel}
            />
          </div>
          <div className="power-copy">
            <p className="eyebrow light">{t.powerLabel}</p>
            <h2>{t.powerTitle}</h2>
            <p>{t.powerCopy}</p>
            <button
              className="text-link light-link"
              onClick={() => enquire(t.services[4])}
            >
              {t.powerCta}
              <Arrow />
            </button>
          </div>
        </section>
        <section className="section equipment" id="equipment">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.equipmentLabel}</p>
              <h2>{t.equipmentTitle}</h2>
            </div>
            <p className="section-intro">{t.equipmentCopy}</p>
          </div>
          <div className="equipment-grid">
            {["cctv", "generator", "network"].map((asset, i) => (
              <article key={asset}>
                <Photo
                  asset={asset}
                  alt={t.categories[i] + " — " + t.imageLabel}
                  label={t.imageLabel}
                />
                <div className="equipment-caption">
                  <p className="eyebrow">{t.equipmentTag}</p>
                  <h3>{t.categories[i]}</h3>
                  <button
                    className="text-link"
                    onClick={() => router.push("/products?lang=" + lang)}
                  >
                    {t.categoryCta}
                    <Arrow />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="trade">
            <button onClick={() => enquire(t.retail)}>
              {t.retail}
              <Arrow />
            </button>
            <button onClick={() => enquire(t.wholesale)}>
              {t.wholesale}
              <Arrow />
            </button>
          </div>
        </section>
        <section className="approach section" id="approach">
          <div>
            <p className="eyebrow">{t.approachLabel}</p>
            <h2>{t.approachTitle}</h2>
          </div>
          <div className="steps">
            {t.steps.map(([title, desc], i) => (
              <article key={title}>
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="contact section" id="contact">
          <div>
            <p className="eyebrow light">{t.contactLabel}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactCopy}</p>
            <button className="button ivory" onClick={() => enquire("")}>
              {t.quote}
              <Arrow />
            </button>
          </div>
          <div className="contact-details">
            <div>
              <p>{t.telephone}</p>
              <a href="tel:+255745778821">+255 745 778 821</a>
            </div>
            <div>
              <p>{t.email}</p>
              <a href="mailto:sales@bmcontractorstz.com">
                sales@bmcontractorstz.com
              </a>
            </div>
            <span>TANZANIA</span>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="brand" href={"/?lang=" + lang}>
            <Image
              src="/assets/official-logo.png"
              width={38}
              height={42}
              alt="BM Contractors official shield"
            />
            <span>
              BM CONTRACTORS<small>{t.footer}</small>
            </span>
          </a>
          <p>{t.rights}</p>
          <a href="#main">{lang === "en" ? "Back to top" : "Rudi juu"} ↑</a>
        </div>
        <p className="disclosure">
          {t.footerNote} {t.noProjects}
        </p>
        <div className="footer-bottom">
          <span>© 2026 BM Engineering Contractors Limited</span>
          <span>
            {lang === "en"
              ? "Phase 1B private review · Not a production release"
              : "Mapitio ya Phase 1B · Haujachapishwa rasmi"}
          </span>
        </div>
      </footer>
      <div className="mobile-cta">
        <button onClick={() => enquire("")}>
          {t.quote}
          <Arrow />
        </button>
        <a href="#contact">
          {lang === "en" ? "Contact" : "Mawasiliano"}
          <Arrow />
        </a>
      </div>
    </>
  );
}
