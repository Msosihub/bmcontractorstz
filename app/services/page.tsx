import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo } from "@/components/premium/Frame";
import legacyServices from "@/data/secondary-services.json";
import services from "@/data/premium-services.json";
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
        <section className="section">
          <div className="directory">
            {services
              .filter((s) => !unpublished.some((x) => x.slug === s.slug))
              .map((s, i) => (
                <a href={"/services/" + s.slug + "?lang=" + lang} key={s.slug}>
                  <span className="index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s[lang].name}</span>
                  <span>↗</span>
                </a>
              ))}
          </div>
          <h2 className="secondary-directory-title">
            {lang === "sw"
              ? "Huduma nyingine za mifumo na matengenezo"
              : "Further systems & maintenance"}
          </h2>
          <div className="directory">
            {legacyServices
              .filter(
                (s) =>
                  !services.some((x) => x.slug === s.slug) &&
                  !unpublished.some((x) => x.slug === s.slug),
              )
              .map((s) => (
                <a key={s.slug} href={"/services/" + s.slug + "?lang=" + lang}>
                  <span>
                    {lang === "sw" ? s.titleSw || s.titleEn : s.titleEn}
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
