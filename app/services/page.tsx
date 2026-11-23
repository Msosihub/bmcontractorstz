import Image from "@/components/media/ReliableLocalImage";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EngineeringMotion } from "@/components/premium/EngineeringMotion";
import { TrustBelt } from "@/components/premium/TrustBelt";
import { navigationSnapshot } from "@/lib/navigation/server";
import legacy from "@/data/secondary-services.json";
import services from "@/data/premium-services.json";
import divisions from "@/data/service-divisions.json";
import "./directory.css";
const divisionImages: Record<string, { src: string; en: string; sw: string }> =
  {
    security: {
      src: "/images/hikvision/reception.webp",
      en: "A contemporary reception and building entrance",
      sw: "Mapokezi na mlango wa jengo la kisasa",
    },
    electrical: {
      src: "/images/electrical-contracting/industrial-hero.webp",
      en: "Electrical infrastructure in an industrial setting",
      sw: "Miundombinu ya umeme katika mazingira ya kiwanda",
    },
    power: {
      src: "/images/solar-engineering/campus-1600.webp",
      en: "Solar arrays at a commercial campus",
      sw: "Paneli za sola kwenye majengo ya biashara",
    },
    ict: {
      src: "/assets/network-1440.webp",
      en: "Organized network equipment and cabling",
      sw: "Vifaa na nyaya za mtandao zilizopangwa",
    },
    "support-supply": {
      src: "/assets/hvac-1440.webp",
      en: "Air conditioning in a contemporary workplace",
      sw: "Kiyoyozi katika eneo la kazi la kisasa",
    },
  };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en);
  const { unpublished, degraded } = await navigationSnapshot();
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main services-experience">
        <Breadcrumbs id="services" lang={lang} />
        <section className="sd-intro">
          <div>
            <p className="eyebrow">
              {t(
                "FIVE DIVISIONS. ONE CONSIDERED APPROACH.",
                "IDARA TANO. MPANGILIO MMOJA WA KAZI.",
              )}
            </p>
            <h1>
              {t("Built around", "Huduma zinazozingatia")}
              <em>{t("your everyday.", "mahitaji yako.")}</em>
            </h1>
            <p>
              {t(
                "Secure the entrance. Keep the power on. Connect the people inside. Find the engineering your building needs.",
                "Linda lango. Dumisha umeme. Unganisha watu ndani ya jengo. Chagua huduma za uhandisi zinazoendana na eneo lako.",
              )}
            </p>
            <a
              className="sd-text-action"
              href={
                "/contact?lang=" +
                lang +
                "&subject=" +
                encodeURIComponent(
                  t(
                    "Help choosing engineering services",
                    "Msaada wa kuchagua huduma za uhandisi",
                  ),
                )
              }
            >
              {t(
                "Not sure where to begin? Talk to us",
                "Hujui pa kuanzia? Zungumza nasi",
              )}{" "}
              ↗
            </a>
          </div>
          <div className="sd-intro-art">
            <Image
              src="/images/hikvision/building.webp"
              width={1080}
              height={760}
              alt={t(
                "A modern building with distinct entrances and shared spaces",
                "Jengo la kisasa lenye milango na maeneo ya pamoja",
              )}
              sizes="(max-width:850px) 100vw, 48vw"
              preload
            />
            <EngineeringMotion slug="directory" lang={lang} />
          </div>
        </section>
        {!degraded && (
          <nav
            className="sd-divisions"
            id="division-navigation"
            aria-label={t("Service divisions", "Idara za huduma")}
          >
            {divisions
              .filter((d) => d.slugs.some((slug) => !unpublished.has(slug)))
              .map((d, i) => (
                <a href={"#" + d.id} key={d.id}>
                  <span>0{i + 1}</span>
                  {sw ? d.shortSw : d.shortEn}
                  <b aria-hidden="true">↘</b>
                </a>
              ))}
          </nav>
        )}
        {degraded ? (
          <section className="sd-unavailable" role="status">
            <h2>
              {t(
                "Let’s find the right starting point.",
                "Tuanze kwa kutambua mahitaji yako.",
              )}
            </h2>
            <p>
              {t(
                "Service availability could not be checked just now. Our equipment directory and enquiry team are still available.",
                "Kwa sasa hatujaweza kuthibitisha orodha ya huduma. Bado unaweza kuangalia vifaa au kuwasiliana na timu yetu.",
              )}
            </p>
            <div>
              <a href={"/products?lang=" + lang}>
                {t("Explore equipment", "Angalia vifaa")} ↗
              </a>
              <a href={"/contact?lang=" + lang}>
                {t("Contact our team", "Wasiliana nasi")} ↗
              </a>
              <a href={"/request-site-survey?lang=" + lang}>
                {t("Request a site survey", "Omba tathmini ya eneo")} ↗
              </a>
            </div>
          </section>
        ) : (
          divisions.map((d, i) => {
            const slugs = d.slugs.filter((slug) => !unpublished.has(slug)),
              image = divisionImages[d.id];
            if (!slugs.length) return null;
            return (
              <section
                key={d.id}
                className={"sd-chapter sd-chapter-" + d.id}
                id={d.id}
                aria-labelledby={d.id + "-title"}
              >
                <div className="sd-chapter-image">
                  {image.src === "/images/solar-engineering/campus-1600.webp" ? (
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="/images/solar-engineering/services-campus-384.webp 384w, /images/solar-engineering/services-campus-640.webp 640w, /images/solar-engineering/services-campus-960.webp 960w, /images/solar-engineering/services-campus-1280.webp 1280w"
                        sizes="(max-width:850px) calc(100vw - 40px), (max-width:1400px) 40vw, 560px"
                      />
                      <Image
                        src="/images/solar-engineering/services-campus-640.webp"
                        alt={image[lang]}
                        fill
                        unoptimized
                      />
                    </picture>
                  ) : (
                    <Image
                      src={image.src}
                      alt={image[lang]}
                      fill
                      sizes="(max-width:850px) 100vw, 42vw"
                    />
                  )}
                  <span aria-hidden="true">0{i + 1}</span>
                </div>
                <div className="sd-chapter-copy">
                  <p className="eyebrow">0{i + 1} / BM ENGINEERING</p>
                  <h2 id={d.id + "-title"}>{d[lang]}</h2>
                  <p>{sw ? d.descriptionSw : d.descriptionEn}</p>
                  <div className="sd-service-links">
                    {slugs.map((slug) => {
                      const core = services.find((s) => s.slug === slug),
                        secondary = legacy.find((s) => s.slug === slug),
                        name = core
                          ? core[lang].name
                          : sw
                            ? secondary?.titleSw
                            : secondary?.titleEn;
                      return (
                        <a
                          key={slug}
                          href={"/services/" + slug + "?lang=" + lang}
                        >
                          <span>{name}</span>
                          <b aria-hidden="true">↗</b>
                        </a>
                      );
                    })}
                    {d.id === "security" && !unpublished.has("cctv") && (
                      <a href={"/services/hikvision?lang=" + lang}>
                        <span>
                          {t(
                            "Hikvision building security",
                            "Hikvision kwa ulinzi wa majengo",
                          )}
                        </span>
                        <b aria-hidden="true">↗</b>
                      </a>
                    )}
                  </div>
                  <div className="sd-chapter-actions">
                    <a
                      href={
                        "/contact?lang=" +
                        lang +
                        "&subject=" +
                        encodeURIComponent(d[lang])
                      }
                    >
                      {t("Discuss this division", "Jadili mahitaji haya")} ↗
                    </a>
                    <a
                      href={
                        "/products?lang=" +
                        lang +
                        "&q=" +
                        encodeURIComponent(sw ? d.shortSw : d.shortEn)
                      }
                    >
                      {t("Equipment enquiries", "Ulizia vifaa")} ↗
                    </a>
                  </div>
                </div>
              </section>
            );
          })
        )}
        <section className="sd-final">
          <div>
            <p className="eyebrow">
              {t(
                "EQUIPMENT. INSTALLATION. ONGOING CARE.",
                "VIFAA. UFUNGAJI. MATENGENEZO.",
              )}
            </p>
            <h2>
              {t(
                "One building.\nA joined-up brief.",
                "Jengo moja.\nMahitaji yanayoratibiwa.",
              )}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Share the location, how the building is used and what needs to work better. We’ll help shape the scope before a quotation.",
                "Tueleze eneo, matumizi ya jengo na unachotaka kuboresha. Tutakusaidia kufafanua wigo kabla ya nukuu ya bei.",
              )}
            </p>
            <a
              className="button dark"
              href={"/request-site-survey?lang=" + lang}
            >
              {t("Request a site assessment", "Omba tathmini ya eneo")} ↗
            </a>
            {!degraded && !unpublished.has("institutional-procurement") && (
              <a href={"/services/institutional-procurement?lang=" + lang}>
                {t("Institutional RFQs & BOQs", "RFQ na BOQ za taasisi")} ↗
              </a>
            )}
          </div>
        </section>
        <TrustBelt kind="sectors" lang={lang} managedMotion />
      </main>
      <Footer lang={lang} />
    </>
  );
}
