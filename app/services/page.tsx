import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo } from "@/components/premium/Frame";
import legacyServices from "@/data/secondary-services.json";
import services from "@/data/premium-services.json";
import imagery from "@/data/service-imagery.json";
import divisions from "@/data/service-divisions.json";
import { prisma } from "@/lib/prisma";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const unpublished = await prisma.service.findMany({
    where: { isPublished: false },
    select: { slug: true },
  });
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <section className="service-hero">
          <div>
            <p className="eyebrow">
              {lang === "sw" ? "HUDUMA ZETU" : "OUR EXPERTISE"}
            </p>
            <h1>
              {lang === "sw"
                ? "Usalama. Umeme. Mawasiliano."
                : "Protection. Power. Connection."}
            </h1>
            <p className="lead">
              {lang === "sw"
                ? "Kuanzia CCTV na ulinzi wa mipaka hadi kazi za umeme, nishati na mifumo ya mawasiliano. Panga mahitaji yako na timu moja."
                : "From CCTV and perimeter security to electrical infrastructure, energy and communications. Begin with the systems your site needs."}
            </p>
          </div>
          <Photo asset="engineering" lang={lang} />
        </section>
        <section className="section division-index">
          <nav
            className="division-shortcuts"
            aria-label={lang === "sw" ? "Idara za huduma" : "Service divisions"}
          >
            {divisions.map((d) => (
              <a key={d.id} href={"#" + d.id}>
                {d[lang]} ↘
              </a>
            ))}
          </nav>
          {divisions.map((d, i) => (
            <section
              className="division-group"
              id={d.id}
              key={d.id}
              aria-labelledby={d.id + "-title"}
            >
              <div className="division-heading">
                <p className="eyebrow">0{i + 1} / BM CONTRACTORS</p>
                <h2 id={d.id + "-title"}>{d[lang]}</h2>
                <p>{lang === "sw" ? d.descriptionSw : d.descriptionEn}</p>
              </div>
              <div className="visual-directory">
                {d.slugs
                  .filter((slug) => !unpublished.some((x) => x.slug === slug))
                  .map((slug) => {
                    const core = services.find((x) => x.slug === slug);
                    const secondary = legacyServices.find(
                      (x) => x.slug === slug,
                    );
                    const visual = imagery[slug as keyof typeof imagery];
                    const intro = core
                      ? core[lang].intro
                      : lang === "sw"
                        ? secondary?.descriptionSw
                        : secondary?.descriptionEn;
                    return (
                      <article
                        className={
                          visual ? "directory-feature" : "directory-note"
                        }
                        key={slug}
                      >
                        {visual && (
                          <Photo
                            asset={visual.asset}
                            lang={lang}
                            alt={visual[lang]}
                            sizes="(max-width:760px) 100vw, (max-width:1100px) 45vw, 30vw"
                          />
                        )}
                        <a href={"/services/" + slug + "?lang=" + lang}>
                          <h3>
                            {core
                              ? core[lang].name
                              : lang === "sw"
                                ? secondary?.titleSw
                                : secondary?.titleEn}
                          </h3>
                          <span aria-hidden="true">↗</span>
                        </a>
                        <p>{intro}</p>
                      </article>
                    );
                  })}
              </div>
            </section>
          ))}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
