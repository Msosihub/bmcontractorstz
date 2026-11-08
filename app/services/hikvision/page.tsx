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
const featuredSlugs = [
  "ds-k1t341cmfw",
  "ds-kis603-p-c",
  "ds-2cd2347g2h-liu",
  "ds-pwa96-m-we",
];
const featured = featuredSlugs.flatMap((slug) =>
  hikvisionProducts.filter((item) => item.slug === slug),
);
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
          {solutions.map((solution, index) => (
            <article id={solution.id} className="hv-solution" key={solution.id}>
              <span className="hv-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{solution.title[lang]}</h3>
                <p>{solution.intro[lang]}</p>
              </div>
              <div>
                <p>{solution.equipment[lang]}</p>
                <a
                  href={`/catalogue/hikvision?lang=${lang}&category=${solution.category}`}
                >
                  {sw ? "Angalia vifaa" : "Explore equipment"}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                {solution.id === "video" && (
                  <a href={`/services/cctv?lang=${lang}`}>
                    {sw
                      ? "Huduma kamili ya CCTV"
                      : "Full CCTV installation service"}{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>
        <section className="hv-equipment">
          <div className="hv-wrap">
            <div className="hv-equipment-heading">
              <div>
                <p className="hv-kicker">
                  {sw ? "MODELI ZA REJEA" : "EQUIPMENT REFERENCES"}
                </p>
                <h2>
                  {sw ? "Vifaa vinavyounda mfumo." : "Meet the equipment."}
                </h2>
              </div>
              <a href={`/catalogue/hikvision?lang=${lang}`}>
                {sw ? "Fungua katalogi yote" : "Open full catalogue"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hv-featured">
              {featured.map((item) => (
                <a
                  key={item.slug}
                  href={`/catalogue/hikvision/${item.slug}?lang=${lang}`}
                >
                  {item.images[0] && (
                    <Image
                      src={item.images[0].src}
                      width={300}
                      height={200}
                      sizes="(max-width:760px) 44vw, 22vw"
                      alt=""
                    />
                  )}
                  <strong>{item.name}</strong>
                  <span>{item.summary[lang]}</span>
                </a>
              ))}
            </div>
          </div>
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
