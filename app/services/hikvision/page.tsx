import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { solutionLinks } from "@/components/catalogue/links";
import { BuildingDiagram } from "@/components/premium/hikvision/BuildingDiagram";
import { solutions } from "@/components/premium/hikvision/content";
import { isLanguage } from "@/lib/i18n/config";
import { hikvisionProducts } from "@/lib/catalogue/hikvision";
import { pageMetadata } from "@/lib/seo";
import "./hikvision.css";

const path = "/services/hikvision";
const presentation = {
  video: {
    model: "ds-2cd2347g2h-liu",
    scene: "/images/hikvision/courtyard.webp",
    caption: {
      en: "Arrival areas · gates · loading bays",
      sw: "Maeneo ya kuwasili · mageti · sehemu za mizigo",
    },
  },
  access: {
    model: "ds-k1t341cmfw",
    caption: {
      en: "Staff doors · shifts · restricted rooms",
      sw: "Milango ya wafanyakazi · zamu · vyumba maalumu",
    },
  },
  intercom: {
    model: "ds-kis603-p-c",
    scene: "/images/hikvision/reception.webp",
    caption: {
      en: "Homes · apartment entries · reception",
      sw: "Nyumba · majengo ya makazi · mapokezi",
    },
  },
  intrusion: {
    model: "ds-pwa96-m-we",
    caption: {
      en: "Shops · offices · stockrooms",
      sw: "Maduka · ofisi · stoo",
    },
  },
  building: {
    model: "hikcentral-professional",
    caption: {
      en: "Hotels · campuses · commercial buildings",
      sw: "Hoteli · kampasi · majengo ya biashara",
    },
  },
} satisfies Record<
  string,
  { model: string; scene?: string; caption: { en: string; sw: string } }
>;
type Props = { searchParams: Promise<{ lang?: string }> };
const copy = {
  en: [
    "Hikvision Building Security Tanzania | BM Contractors",
    "Plan Hikvision access, attendance, video intercom, CCTV and AX PRO alarms for a complete building. Explore model references or request installation.",
  ],
  sw: [
    "Hikvision Tanzania | Ulinzi wa Majengo | BM Contractors",
    "Panga udhibiti wa milango, mahudhurio, intercom, CCTV na kengele za AX PRO. Angalia modeli au omba nukuu ya ufungaji.",
  ],
} satisfies Record<string, [string, string]>;

export async function generateMetadata({ searchParams }: Props) {
  const { lang } = await searchParams;
  const language = isLanguage(lang) ? lang : "en";
  return pageMetadata(path, language, copy[language]);
}

export default async function Page({ searchParams }: Props) {
  const { lang: requested } = await searchParams;
  const lang = isLanguage(requested) ? requested : "en";
  const sw = lang === "sw";
  const links = solutionLinks(
    lang,
    sw
      ? "Hikvision — tathmini ya ulinzi wa jengo"
      : "Hikvision — building security assessment",
  );
  const equipment = solutionLinks(
    lang,
    sw
      ? "Hikvision — bei ya vifaa pekee"
      : "Hikvision — equipment-only current price",
  );
  const installed = solutionLinks(
    lang,
    sw
      ? "Hikvision — mfumo kamili na ufungaji"
      : "Hikvision — complete installed system",
  );

  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main hv-main">
        <section className="hv-hero" aria-labelledby="hv-title">
          <Image
            src="/images/hikvision/building.webp"
            fill
            preload
            sizes="100vw"
            alt=""
          />
          <div className="hv-wrap hv-hero-copy">
            <p className="hv-kicker">
              HIKVISION / {sw ? "ULINZI WA MAJENGO" : "BUILDING SECURITY"}
            </p>
            <h1 id="hv-title">
              {sw ? "Ulinzi unaoendana" : "Security designed"}
              <br />
              <em>{sw ? "na jengo lako." : "around the building."}</em>
            </h1>
            <p>
              {sw
                ? "Kutoka getini hadi mapokezi na milango ya wafanyakazi. BM Contractors hupanga vifaa vya Hikvision kulingana na matumizi ya jengo lako."
                : "From the gate to reception and staff-only doors. BM Contractors plans Hikvision systems around the way people use your premises."}
            </p>
            <div className="hv-actions">
              <a className="hv-button hv-primary" href={links.survey}>
                {sw ? "Panga tathmini ya eneo" : "Plan a site survey"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="hv-button hv-outline"
                href={`/catalogue/hikvision?lang=${lang}`}
              >
                {sw ? "Angalia vifaa" : "Explore equipment"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <nav
          className="hv-jump"
          aria-label={sw ? "Aina za suluhisho" : "Solution families"}
        >
          <div className="hv-wrap">
            {solutions.map((solution, index) => (
              <a key={solution.id} href={`#${solution.id}`}>
                <span aria-hidden="true">0{index + 1}</span>
                {solution.title[lang]}
              </a>
            ))}
          </div>
        </nav>
        <section className="hv-system">
          <div className="hv-wrap">
            <div className="hv-system-copy">
              <p className="hv-kicker">
                {sw ? "NDANI YA JENGO" : "INSIDE THE BUILDING"}
              </p>
              <h2>
                {sw
                  ? "Kila mfumo una kazi yake."
                  : "See what each system does."}
              </h2>
              <p>
                {sw
                  ? "Fuata njia nne za taarifa, kuanzia kwenye kifaa hadi kwenye kinachopokea taarifa. Usimamizi wa pamoja hupangwa baada ya kuthibitisha ulinganifu."
                  : "Follow four signal paths from device to destination. Shared management is planned separately after compatibility checks."}
              </p>
            </div>
            <BuildingDiagram lang={lang} />
          </div>
        </section>
        <section className="hv-wrap hv-solutions" aria-labelledby="hv-families">
          <p className="hv-kicker">
            {sw ? "CHAGUA KIPAUMBELE" : "CHOOSE YOUR PRIORITY"}
          </p>
          <h2 id="hv-families">
            {sw
              ? "Anza na matumizi ya eneo lako."
              : "Start with the way your site works."}
          </h2>
          {solutions.map((solution, index) => {
            const view = presentation[solution.id];
            const model = hikvisionProducts.find(
              (item) => item.slug === view.model,
            )!;
            const scene = "scene" in view ? view.scene : undefined;
            const photo = model.images[0];
            const enquiry = solutionLinks(
              lang,
              `Hikvision — ${solution.title[lang]}`,
            );
            return (
              <article
                id={solution.id}
                className="hv-solution"
                key={solution.id}
              >
                <div className="hv-solution-media">
                  {scene ? (
                    <Image
                      src={scene}
                      fill
                      alt=""
                      sizes="(max-width:760px) 100vw, 48vw"
                    />
                  ) : photo ? (
                    <Image
                      src={photo.src}
                      width={400}
                      height={260}
                      alt={photo.alt}
                      sizes="(max-width:760px) 68vw, 28vw"
                    />
                  ) : (
                    <p className="hv-software-art">
                      <strong>HikCentral</strong>
                      <span>Professional</span>
                    </p>
                  )}
                </div>
                <div className="hv-solution-copy">
                  <p className="hv-kicker">
                    0{index + 1} / {view.caption[lang]}
                  </p>
                  <h3>{solution.title[lang]}</h3>
                  <p>{solution.intro[lang]}</p>
                  <details className="hv-disclosure">
                    <summary>
                      {sw
                        ? "Vifaa na mambo ya kuhakiki"
                        : "Equipment & compatibility"}
                    </summary>
                    <p>{solution.equipment[lang]}</p>
                  </details>
                  <div className="hv-solution-links">
                    <a href={`/catalogue/hikvision/${model.slug}?lang=${lang}`}>
                      {model.name} ↗
                    </a>
                    <a
                      href={`/catalogue/hikvision?lang=${lang}&category=${solution.category}`}
                    >
                      {sw ? "Vifaa vya kundi hili" : "Browse this category"} ↗
                    </a>
                    {solution.id === "video" && (
                      <a href={`/services/cctv?lang=${lang}`}>
                        {sw
                          ? "Huduma ya ufungaji wa CCTV"
                          : "CCTV installation service"}{" "}
                        ↗
                      </a>
                    )}
                  </div>
                  <a className="hv-button hv-primary" href={enquiry.quote}>
                    {sw ? "Jadili mahitaji yako" : "Discuss your requirements"}{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>
        <section className="hv-close">
          <div className="hv-wrap">
            <div>
              <p className="hv-kicker">
                {sw ? "VIFAA NA UFUNGAJI" : "EQUIPMENT & INSTALLATION"}
              </p>
              <h2>
                {sw
                  ? "Tuambie unachotaka kulinda."
                  : "Tell us what you need to protect."}
              </h2>
              <p>
                {sw
                  ? "Tuma mchoro wa jengo, idadi ya milango au orodha ya vifaa ulivyonavyo. Kwa ufungaji, tunapanga eneo, nyaya na umeme, tunaweka na kusanidi vifaa, kisha tunajaribu mfumo na kuwaonyesha wahusika jinsi ya kuutumia."
                  : "Share your floor plan, door count or existing model list. For installation, we assess the site, plan cable routes and power, fit and configure the equipment, then test the agreed workflows and show your team how to use them."}
              </p>
              <a href={`/blog/plan-building-security-tanzania?lang=${lang}`}>
                {sw
                  ? "Mwongozo wa BM wa kupanga ulinzi wa jengo"
                  : "BM guide to planning building security"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hv-actions">
              <a className="hv-button hv-primary" href={installed.quote}>
                {sw ? "Omba nukuu ya ufungaji" : "Request an installed quote"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="hv-button hv-outline" href={equipment.quote}>
                {sw ? "Omba bei ya sasa ya vifaa" : "Request Current Price"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="hv-contact" href={links.whatsapp}>
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a className="hv-contact" href={links.call}>
                {sw ? "Piga simu" : "Call BM"} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
