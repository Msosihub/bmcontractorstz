import Image from "next/image";
import {
  Camera,
  Shield,
  DoorOpen,
  Fingerprint,
  Zap,
  Sun,
  Network,
  Phone,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";
import { ExperienceMotion } from "./ExperienceMotion";
import { HeroLight } from "./HeroLight";
import { ManufacturerBelts } from "./ManufacturerBelts";
import "./experience.css";

const chapters = [
  {
    id: "cctv",
    title: ["CCTV & surveillance", "Kamera za CCTV"],
    slug: "cctv",
    icon: Camera,
  },
  {
    id: "fencing",
    title: ["Electric fencing", "Uzio wa umeme"],
    slug: "electric-fence",
    icon: Shield,
  },
  {
    id: "gates",
    title: ["Automated gates", "Mageti ya kiotomatiki"],
    slug: "gate-motors",
    icon: DoorOpen,
  },
  {
    id: "access",
    title: ["Access & attendance", "Milango na mahudhurio"],
    slug: "access-control",
    icon: Fingerprint,
  },
  {
    id: "electrical",
    title: ["Electrical engineering", "Uhandisi wa umeme"],
    slug: "electrical-contracting",
    icon: Zap,
  },
  {
    id: "power",
    title: ["Solar & backup power", "Sola na umeme wa akiba"],
    slug: "solar-panel-systems",
    icon: Sun,
  },
  {
    id: "connectivity",
    title: ["ICT & networking", "Mitandao ya kompyuta"],
    slug: "networking",
    icon: Network,
  },
  {
    id: "telephones",
    title: ["Office & hotel phones", "Simu za ofisi na hoteli"],
    slug: "telephone-systems",
    icon: Phone,
  },
] as const;

function Signal({ kind }: { kind: "fence" | "gate" | "network" }) {
  return (
    <svg
      className={`bm-signal bm-signal-${kind}`}
      viewBox="0 0 240 64"
      fill="none"
      aria-hidden="true"
    >
      <path className="bm-signal-base" d="M12 32H228" />
      <path className="bm-signal-flow" d="M12 32H228" />
      {[24, 120, 216].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="32" r="7" />
          <circle
            className="bm-signal-pulse"
            style={{ animationDelay: `${i * 0.6}s` }}
            cx={x}
            cy="32"
            r="11"
          />
        </g>
      ))}
    </svg>
  );
}

export default function Homepage({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    l = sw ? 1 : 0;
  const local = (path: string) => `${path}?lang=${lang}`;
  const survey = (service: string) =>
    `${local("/request-site-survey")}&service=${encodeURIComponent(service)}`;
  const quote = (service: string) =>
    `${local("/contact")}&subject=${encodeURIComponent(service)}`;
  const actions = (slug: string, service: string) => (
    <div className="bm-chapter-actions">
      <a className="bm-arrow-link" href={local(`/services/${slug}`)}>
        {sw ? "Fahamu huduma" : "Explore the solution"}
        <span aria-hidden="true">↗</span>
      </a>
      <a className="bm-quiet-link" href={survey(service)}>
        {sw ? "Panga tathmini" : "Plan a site survey"}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
  return (
    <div className="bm-home-shell">
      <Header lang={lang} />
      <main id="main" className="bm-experience">
        <ExperienceMotion />
        <section className="bm-hero" aria-labelledby="bm-hero-title">
          <picture>
            <source
              media="(max-width: 760px)"
              srcSet="/images/home/building-hero-mobile.webp"
            />
            <Image
              src="/images/home/building-hero.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
            />
          </picture>
          <HeroLight lang={lang} />
          <div className="bm-wrap bm-hero-inner">
            <p className="bm-label">
              <span className="bm-live-dot" />
              {sw
                ? "BM CONTRACTORS / UHANDISI KWA ENEO LAKO"
                : "BM CONTRACTORS / ENGINEERING YOUR EVERYDAY"}
            </p>
            <h1 id="bm-hero-title">
              <span>{sw ? "Maeneo salama." : "Safer spaces."}</span>
              <span>{sw ? "Umeme wa uhakika." : "Reliable power."}</span>
              <span>{sw ? "Mawasiliano bora." : "Smarter connections."}</span>
            </h1>
            <p className="bm-hero-description">
              {sw
                ? "Vifaa na ufungaji wa mifumo ya ulinzi, umeme na mawasiliano. Suluhisho zinazofaa makazi, biashara na taasisi Tanzania."
                : "Security, electrical engineering and connected technology. Equipment supply and complete installations for homes, businesses and institutions across Tanzania."}
            </p>
            <div className="bm-actions">
              <a className="bm-action bm-solid" href="#services">
                {sw ? "Angalia huduma" : "Explore our services"}
                <span aria-hidden="true">↓</span>
              </a>
              <a
                className="bm-action bm-glass"
                href={survey(sw ? "Tathmini ya mradi" : "Project assessment")}
              >
                {sw ? "Tuzungumzie eneo lako" : "Let’s talk about your site"}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="bm-hero-caption">
            <span>
              01 /{" "}
              {sw ? "ULINZI. UMEME. MAWASILIANO." : "SECURE. POWER. CONNECT."}
            </span>
            <span>MOSHI · ARUSHA · TANZANIA</span>
          </div>
          <div className="bm-hero-note" aria-hidden="true">
            <span className="bm-note-cross">+</span>
            <div>
              {sw
                ? "Majengo bora. Mifumo bora."
                : "Better buildings. Smarter systems."}
              <small>
                {sw
                  ? "Kutoka getini hadi sehemu za kazi."
                  : "From the entrance to the everyday."}
              </small>
            </div>
          </div>
        </section>
        <ManufacturerBelts lang={lang} />
        <nav
          className="bm-buying-paths bm-wrap"
          aria-label={sw ? "Chagua aina ya mahitaji" : "Choose how BM can help"}
        >
          <a href={local("/products")}>
            <span>01</span>
            <strong>{sw ? "Nunua vifaa" : "Buy equipment"}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={quote("Trade and reseller equipment supply")}>
            <span>02</span>
            <strong>
              {sw ? "Ugavi kwa wauzaji na mafundi" : "Trade & reseller supply"}
            </strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={quote("Complete system installation")}>
            <span>03</span>
            <strong>
              {sw ? "Mfumo pamoja na ufungaji" : "Complete installation"}
            </strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={survey("Site assessment")}>
            <span>04</span>
            <strong>{sw ? "Tathmini ya eneo" : "Request a site survey"}</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <section
          id="services"
          className="bm-service-intro bm-wrap"
          data-bm-reveal
        >
          <div>
            <p className="bm-label">
              {sw
                ? "MIFUMO INAYOFAA MAISHA NA KAZI ZAKO"
                : "ENGINEERED AROUND THE WAY YOU LIVE & WORK"}
            </p>
            <h2>
              {sw
                ? "Eneo moja. Mahitaji mengi."
                : "One place. Many possibilities."}
            </h2>
          </div>
          <p>
            {sw
              ? "Kutoka nyumbani hadi hotelini, ofisini au kiwandani. Anza na unachohitaji; tutakusaidia kupanga mfumo unaofaa."
              : "A home. A hotel. A busy office. Start with what matters to your site. We’ll help you find the right system."}
          </p>
          <nav
            className="bm-chapter-nav"
            aria-label={
              sw ? "Huduma kwenye ukurasa huu" : "Services on this page"
            }
          >
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <a key={chapter.id} href={`#${chapter.id}`}>
                  <span className="bm-service-tile-top" aria-hidden="true">
                    <Icon size={25} strokeWidth={1.35} />
                    <span>0{index + 1}</span>
                  </span>
                  <span className="bm-service-tile-title">
                    {chapter.title[l]}
                  </span>
                  <span className="bm-service-tile-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              );
            })}
          </nav>
        </section>
        <section
          id="cctv"
          className="bm-chapter bm-surveillance bm-wrap"
          aria-labelledby="bm-cctv-heading"
          data-bm-reveal
          data-bm-belt
        >
          <div className="bm-scene bm-cctv-scene">
            <Image
              src="/assets/cctv-applications/office-1440.webp"
              alt={
                sw
                  ? "Mandhari ya ofisi yenye mwanga wa asili"
                  : "An office environment with natural light"
              }
              fill
              sizes="(max-width:760px) 100vw, 56vw"
            />
            <div className="bm-viewfinder" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <span className="bm-viewfinder-scan" />
            </div>
            <div className="bm-scene-caption">
              <span className="bm-live-dot" />
              {sw
                ? "Panga uone kinachohitajika."
                : "A clearer view of what matters."}
            </div>
            <div className="bm-device bm-camera-device">
              <Image
                src="/images/hikvision/ds-2cd2347g2h-liu.webp"
                width={200}
                height={180}
                alt="Hikvision DS-2CD2347G2H-LIU"
                sizes="(max-width:760px) 96px, 160px"
              />
            </div>
          </div>
          <div className="bm-chapter-copy">
            <p className="bm-label">01 / {chapters[0].title[l]}</p>
            <h2 id="bm-cctv-heading">
              {sw
                ? "Ona vizuri. Fuatilia kwa urahisi."
                : "See clearly. Stay connected."}
            </h2>
            <p>
              {sw
                ? "CCTV iliyopangwa kwa milango, sehemu za kazi na mipaka yako. Video zilizohifadhiwa na ufuatiliaji kwenye simu, kulingana na mfumo wako."
                : "CCTV planned around your entrances, working spaces and boundaries. Clear recordings and phone viewing, configured for your site."}
            </p>
            <div className="bm-capabilities">
              <span>{sw ? "Makazi na biashara" : "Homes & businesses"}</span>
              <span>IP / PoE</span>
              <span>{sw ? "Ufuatiliaji wa mbali" : "Remote viewing"}</span>
            </div>
            {actions("cctv", "CCTV installation")}
            <a className="bm-small-link" href={local("/catalogue/hikvision")}>
              {sw
                ? "Angalia vifaa vya Hikvision"
                : "Explore Hikvision equipment"}{" "}
              ↗
            </a>
          </div>
        </section>
        <section
          id="fencing"
          className="bm-fencing"
          aria-labelledby="bm-fence-heading"
          data-bm-reveal
          data-bm-belt
        >
          <div className="bm-wrap bm-fencing-inner">
            <div className="bm-chapter-copy">
              <p className="bm-label">02 / {chapters[1].title[l]}</p>
              <h2 id="bm-fence-heading">
                {sw
                  ? "Ulinzi unaoanzia mipakani."
                  : "Protection starts at the perimeter."}
              </h2>
              <p>
                {sw
                  ? "Uzio wa umeme kwa makazi, biashara na mashamba. Tathmini ya eneo huongoza uchaguzi wa mashine, nyaya, earthing na mfumo wa tahadhari."
                  : "Electric fencing for homes, businesses and farms. Your perimeter shapes the energizer, wire layout, earthing and alarm requirements."}
              </p>
              <div className="bm-technical-note">
                <Signal kind="fence" />
                <span>
                  {sw
                    ? "Mashine · Nyaya · Tahadhari"
                    : "Energizer · Fence line · Alert"}
                </span>
              </div>
              {actions("electric-fence", "Electric fence assessment")}
            </div>
            <div className="bm-scene bm-fence-scene">
              <Image
                src="/assets/electric-fence-commercial/security-1440.webp"
                alt={
                  sw
                    ? "Uzio wa umeme juu ya ukuta wa jengo"
                    : "Electric fence lines along a property wall"
                }
                fill
                sizes="(max-width:760px) 100vw, 52vw"
              />
              <div className="bm-scene-caption">
                {sw
                  ? "Kila mpaka una mahitaji yake."
                  : "Every boundary deserves its own plan."}
              </div>
            </div>
          </div>
        </section>
        <section
          id="gates"
          className="bm-gates"
          aria-labelledby="bm-gate-heading"
          data-bm-reveal
          data-bm-belt
        >
          <Image
            src="/assets/gate-automation/arrival-1440.webp"
            alt={
              sw
                ? "Geti na njia ya kuingia kwenye makazi"
                : "A residential gate and arrival courtyard"
            }
            fill
            sizes="100vw"
          />
          <div className="bm-wrap">
            <div className="bm-gate-panel">
              <p className="bm-label">03 / {chapters[2].title[l]}</p>
              <h2 id="bm-gate-heading">
                {sw
                  ? "Karibu nyumbani. Ingia kwa urahisi."
                  : "A better welcome. Every day."}
              </h2>
              <p>
                {sw
                  ? "Mageti ya kusogea au kufunguka kwa mabawa. Tunachagua mota na vifaa vya usalama kulingana na geti lako na matumizi yake."
                  : "Sliding and swing gate automation. The right motor, controls and safety accessories for your gate and daily traffic."}
              </p>
              {actions("gate-motors", "Gate automation")}
              <a className="bm-small-link" href={local("/catalogue/centurion")}>
                CENTURION {sw ? "vifaa na modeli" : "models & accessories"} ↗
              </a>
            </div>
            <div className="bm-gate-marker" aria-hidden="true">
              <Signal kind="gate" />
              <span>
                {sw ? "Fungua. Ingia. Funga." : "Open. Arrive. Close."}
              </span>
            </div>
          </div>
        </section>
        <section
          id="access"
          className="bm-chapter bm-access bm-wrap"
          aria-labelledby="bm-access-heading"
          data-bm-reveal
          data-bm-belt
        >
          <div className="bm-scene bm-access-scene">
            <Image
              src="/images/access-control/workplace-1440.webp"
              alt={
                sw
                  ? "Watu wakitumia eneo la kisasa la kazi"
                  : "People in a contemporary workplace"
              }
              fill
              sizes="(max-width:760px) 100vw, 50vw"
            />
            <div className="bm-device bm-access-device">
              <Image
                src="/images/access-control/speedface-v5l.webp"
                width={150}
                height={210}
                sizes="(max-width:760px) 75px, 110px"
                alt="ZKTeco SpeedFace-V5L"
              />
            </div>
            <span className="bm-scene-caption">
              {sw
                ? "Watu sahihi. Sehemu sahihi."
                : "The right people. The right spaces."}
            </span>
          </div>
          <div className="bm-chapter-copy">
            <p className="bm-label">04 / {chapters[3].title[l]}</p>
            <h2 id="bm-access-heading">
              {sw
                ? "Milango inadhibitiwa. Mahudhurio yanaeleweka."
                : "Access, managed. Attendance, made useful."}
            </h2>
            <p>
              {sw
                ? "Udhibiti wa milango na mahudhurio kwa ofisi, shule na hoteli. Vifaa na programu huchaguliwa kulingana na watumiaji na taarifa unazohitaji."
                : "Door access and staff attendance for offices, schools and hotels. Devices and software selected around your people and the reports you need."}
            </p>
            {actions("access-control", "Access control and attendance")}
            <div className="bm-related-links">
              <a href={local("/services/access-control/time-attendance")}>
                {sw ? "Mahudhurio na BioTime" : "Attendance & BioTime"} ↗
              </a>
              <a href={local("/catalogue/zkteco")}>
                {sw ? "Vifaa vya ZKTeco" : "ZKTeco equipment"} ↗
              </a>
            </div>
          </div>
        </section>
        <section
          id="electrical"
          className="bm-electrical"
          aria-labelledby="bm-electrical-heading"
          data-bm-reveal
        >
          <div className="bm-wrap bm-chapter">
            <div className="bm-chapter-copy">
              <p className="bm-label">05 / {chapters[4].title[l]}</p>
              <h2 id="bm-electrical-heading">
                {sw
                  ? "Msingi wa kila kitu kinachoendelea."
                  : "Behind everything that runs."}
              </h2>
              <p>
                {sw
                  ? "Ufungaji wa umeme, bodi za usambazaji, taa, upimaji na matengenezo. Panga kazi za awali wakati wa ujenzi au boresha mfumo uliopo."
                  : "Electrical installations, distribution, lighting, testing and maintenance. Plan ahead for a new build or improve the systems you already use."}
              </p>
              {actions(
                "electrical-contracting",
                "Electrical engineering and contracting",
              )}
            </div>
            <div className="bm-scene">
              <Image
                src="/assets/electrical-1440.webp"
                alt={
                  sw
                    ? "Mandhari ya mifumo ya umeme ya jengo"
                    : "An architectural electrical systems concept"
                }
                fill
                sizes="(max-width:760px) 100vw, 50vw"
              />
              <span className="bm-scene-caption">
                {sw ? "Panga. Funga. Pima." : "Plan. Install. Test."}
              </span>
            </div>
          </div>
        </section>
        <section id="power" className="bm-service-story bm-power-story bm-wrap" aria-labelledby="bm-power-heading" data-bm-reveal>
          <div className="bm-scene"><Image src="/assets/solar-1440.webp" alt={sw ? "Paneli za sola na mfumo wa umeme wa akiba wa jengo" : "Solar panels and backup power in a building setting"} fill sizes="(max-width:760px) 100vw, 50vw" /></div>
          <div className="bm-chapter-copy">
            <p className="bm-label">06 / {chapters[5].title[l]}</p>
            <h2 id="bm-power-heading">{sw ? "Shughuli ziendelee." : "Keep the essentials running."}</h2>
            <p>{sw ? "Sola, betri na UPS kwa taa, vifaa na mifumo unayotegemea. Tathmini ya matumizi yako huamua ukubwa wa mfumo na muda wa umeme wa akiba." : "Solar, batteries and UPS for the lights, equipment and systems you rely on. Your energy use shapes the system size and backup time."}</p>
            <div className="bm-capabilities"><span>Solar PV</span><span>{sw ? "Betri na UPS" : "Batteries & UPS"}</span><span>{sw ? "Umeme wa akiba" : "Backup power"}</span></div>
            {actions("solar-panel-systems", "Solar and backup power")}
            <a className="bm-small-link" href={local("/services/generators")}>{sw ? "Jenereta na mifumo ya ATS" : "Generators & ATS systems"} ↗</a>
          </div>
        </section>
        <section id="connectivity" className="bm-service-story bm-network-story bm-wrap" aria-labelledby="bm-network-heading" data-bm-reveal data-bm-belt>
          <div className="bm-chapter-copy">
            <p className="bm-label">07 / {chapters[6].title[l]}</p>
            <h2 id="bm-network-heading">{sw ? "Mtandao bora. Kazi bila vikwazo." : "A better network. A smoother working day."}</h2>
            <p>{sw ? "Nyaya za mtandao, Wi-Fi na kabati za vifaa kwa ofisi, hoteli na taasisi. Tunapanga sehemu za kuunganishia na eneo la Wi-Fi kulingana na jengo lako." : "Structured cabling, Wi-Fi and equipment racks for offices, hotels and institutions. Connection points and wireless coverage planned around your building."}</p>
            <div className="bm-capabilities"><span>Wi-Fi</span><span>LAN</span><span>{sw ? "Kabati za vifaa" : "Network racks"}</span></div>
            {actions("networking", "ICT networking and Wi-Fi")}
          </div>
          <div className="bm-scene"><Image src="/images/home/network-practical.webp" alt={sw ? "Kabati za vifaa vya mtandao katika jengo la kisasa" : "Network equipment racks in a contemporary building"} fill sizes="(max-width:760px) 100vw, 50vw" /><span className="bm-network-nodes" aria-hidden="true"><Signal kind="network" /></span></div>
        </section>
        <section id="telephones" className="bm-service-story bm-phone-story bm-wrap" aria-labelledby="bm-phone-heading" data-bm-reveal>
          <div className="bm-scene"><Image src="/images/home/office-phones.webp" alt={sw ? "Mazingira ya ofisi yenye simu za mezani" : "An office setting with desk telephones"} fill sizes="(max-width:760px) 100vw, 50vw" /><div className="bm-device bm-phone-device"><Image src="/images/home/grandstream-grp2612.webp" alt="Grandstream GRP2612 IP desk phone" width={240} height={220} sizes="(max-width:760px) 110px, 170px" /></div></div>
          <div className="bm-chapter-copy">
            <p className="bm-label">08 / {chapters[7].title[l]}</p>
            <h2 id="bm-phone-heading">{sw ? "Kila simu. Iwafikie wanaohusika." : "Every call. Connected to the right people."}</h2>
            <p>{sw ? "Unganisha mapokezi, ofisi na vyumba vya hoteli kwa simu za ndani. Panga uelekezaji wa simu na IP-PBX kulingana na timu yako, kwa chaguo za Grandstream na Yeastar zinazofaa." : "Connect reception, offices and hotel rooms with internal extensions. Call routing and IP-PBX planned for your team, with suitable Grandstream and Yeastar options."}</p>
            <div className="bm-capabilities"><span>IP-PBX</span><span>{sw ? "Simu za ndani" : "Internal extensions"}</span><span>{sw ? "Ofisi na hoteli" : "Offices & hotels"}</span></div>
            {actions("telephone-systems", "Office and hotel telephone systems")}
          </div>
        </section>
        <section id="pa-sound" className="bm-service-story bm-pa-story bm-wrap" aria-labelledby="bm-pa-title" data-bm-reveal>
          <div className="bm-scene"><Image src="/images/home/church-pa.webp" alt={sw ? "Ukumbi wa ibada wenye spika nyembamba zilizofungwa ukutani" : "A worship hall with slim wall-mounted column speakers"} fill sizes="(max-width:760px) 100vw, 50vw" /><div className="bm-device bm-pa-device"><Image src="/images/pa-sound/ssa-250m.webp" alt="AHUJA SSA-250M PA mixer amplifier" width={320} height={140} sizes="(max-width:760px) 140px, 200px" /></div></div>
          <div className="bm-chapter-copy">
            <p className="bm-label">{sw ? "PA · MATANGAZO · MIFUMO YA SAUTI" : "PA · PAGING · SOUND SYSTEMS"}</p>
            <h2 id="bm-pa-title">{sw ? "Sauti safi. Kila neno lieleweke." : "Clear sound. Every word matters."}</h2>
            <p>{sw ? "Spika za ukutani kwa kanisa, matangazo kwa shule au sauti ya mikutano. Tunapanga maikrofoni, amplifaya na spika kulingana na ukubwa wa eneo na namna litakavyotumika." : "Wall-mounted speakers for a church, school announcements or sound for meetings. Microphones, amplifiers and speakers selected around the room and how you use it."}</p>
            <div className="bm-capabilities"><span>{sw ? "Shule" : "Schools"}</span><span>{sw ? "Maeneo ya ibada" : "Places of worship"}</span><span>{sw ? "Kumbi na mikutano" : "Halls & meetings"}</span></div>
            {actions("pa-sound-systems", "PA paging and sound system assessment")}
          </div>
        </section>
        <section
          className="bm-further bm-wrap"
          aria-label={sw ? "Huduma nyingine" : "More specialist services"}
        >
          <p className="bm-label">
            {sw ? "ZAIDI KWA JENGO LAKO" : "MORE FOR YOUR BUILDING"}
          </p>
          <div className="bm-building-grid">
            {[
              {slug:"fire-alarm-systems", en:"Fire & intrusion alarms", sw:"Mifumo ya tahadhari", detailEn:"Detection and alerts, planned for your premises.", detailSw:"Ugunduzi na tahadhari kulingana na eneo lako.", image:"/images/services/fire-alarm-systems.jpg"},
              {slug:"hikvision", en:"Intercom & building security", sw:"Intercom na ulinzi wa majengo", detailEn:"See who's at the entrance. Manage access.", detailSw:"Ona aliye mlangoni. Dhibiti anayeingia.", image:"/images/hikvision/courtyard.webp"},
              {slug:"air-conditioners", en:"Air conditioning", sw:"Viyoyozi", detailEn:"Comfort for the rooms you use every day.", detailSw:"Mazingira mazuri katika vyumba unavyotumia.", image:"/assets/hvac-640.webp"},
              {slug:"institutional-procurement", en:"Institutional procurement", sw:"Ugavi wa vifaa kwa taasisi", detailEn:"Technical materials, equipment and BOQ quotations.", detailSw:"Vifaa vya kiufundi na nukuu kulingana na BOQ.", image:"/assets/cctv-applications/institution-640.webp"},
            ].map(item=>(<a key={item.slug} href={local(`/services/${item.slug}`)}><div className="bm-building-image"><Image src={item.image} alt="" fill sizes="(max-width:600px) 45vw, 25vw" /></div><div className="bm-building-copy"><h3>{sw ? item.sw : item.en}<span aria-hidden="true">↗</span></h3><p>{sw ? item.detailSw : item.detailEn}</p></div></a>))}
          </div>
          <a className="bm-small-link" href={local("/services")}>
            {sw ? "Huduma zote" : "All services"} ↗
          </a>
        </section>
        <section className="bm-credentials bm-wrap" aria-labelledby="bm-credentials-title">
          <div><p className="bm-label">{sw ? "USAJILI NA SIFA ZA KAMPUNI" : "COMPANY CREDENTIALS"}</p><h2 id="bm-credentials-title">{sw ? "Msingi wa kazi zetu." : "The foundation behind our work."}</h2></div>
          <ul>{[
            ["BRELA", sw ? "Imesajiliwa" : "Registered"],
            ["CRB", sw ? "Ina leseni" : "Licensed"],
            ["TANESCO", sw ? "Imepitishwa katika uhakiki wa awali" : "Prequalified"],
            ["EWURA", sw ? "Imepitishwa katika uhakiki wa awali" : "Prequalified"],
          ].map(([name,status])=><li key={name}><strong>{name}</strong><span>{status}</span></li>)}</ul>
          <a className="bm-arrow-link" href={quote("Engineering and equipment enquiry")}>{sw ? "Zungumza na timu yetu" : "Talk to our team"}<span aria-hidden="true">↗</span></a>
        </section>
        <section id="contact" className="bm-contact" data-bm-reveal>
          <div className="bm-wrap bm-contact-inner">
            <div>
              <p className="bm-label">
                {sw
                  ? "TUANZIE KWENYE ENEO LAKO"
                  : "GOOD ENGINEERING STARTS WITH A CONVERSATION"}
              </p>
              <h2>
                {sw
                  ? "Una mpango? Tuufanyie kazi."
                  : "Your next project. Let’s make it work."}
              </h2>
              <div className="bm-actions">
                <a
                  className="bm-action bm-solid"
                  href={quote(sw ? "Mahitaji ya mradi" : "Project enquiry")}
                >
                  {sw ? "Omba nukuu ya bei" : "Request a quotation"}
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="bm-action bm-glass"
                  href={survey(sw ? "Tathmini ya eneo" : "Site assessment")}
                >
                  {sw ? "Panga tathmini ya eneo" : "Arrange a site assessment"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="bm-contact-aside">
              <ol>
                <li>
                  <span>01</span>
                  {sw ? "Tueleze unachohitaji" : "Tell us what you need"}
                </li>
                <li>
                  <span>02</span>
                  {sw
                    ? "Tupitie eneo na wigo wa kazi"
                    : "Review your site and scope"}
                </li>
                <li>
                  <span>03</span>
                  {sw ? "Pokea nukuu ya bei" : "Receive a tailored quotation"}
                </li>
              </ol>
              <a href={`tel:${siteConfig.sales.raw}`}>
                {siteConfig.sales.label}
                <span aria-hidden="true">↗</span>
              </a>
              <p>MOSHI · ARUSHA · TANZANIA</p>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </div>
  );
}
