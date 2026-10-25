import { PremiumArticle } from "@/components/premium/Article";
import { prisma } from "@/lib/prisma";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const packages = await prisma.cctvPackage.findMany({
    where: { isPublished: true },
    orderBy: { cameras: "asc" },
  });
  return (
    <PremiumArticle
      lang={lang}
      title={
        sw
          ? "CCTV iliyopangwa kwa eneo lako."
          : "CCTV packages. Defined by the site."
      }
      label={sw ? "KAMERA ZA ULINZI" : "SECURITY CAMERA SYSTEMS"}
      intro={
        sw
          ? "Idadi ya kamera ni mwanzo tu. Sehemu za kuangaliwa, mwanga, nyaya na muda wa kuhifadhi rekodi huamua mfumo unaofaa."
          : "Camera count is only the starting point. Views, lighting, cable routes and recording retention determine the right system."
      }
    >
      <section>
        <h2>{sw ? "Vifurushi vilivyochapishwa" : "Published packages"}</h2>
        {packages.length ? (
          <div className="directory">
            {packages.map((x) => (
              <a
                key={x.slug}
                href={"/cctv-packages/" + x.slug + "?lang=" + lang}
              >
                <span>
                  {sw ? x.titleSw || x.titleEn : x.titleEn}
                  <small>
                    {x.cameras} {sw ? "kamera" : "cameras"}
                  </small>
                </span>
                <span>↗</span>
              </a>
            ))}
          </div>
        ) : (
          <p>
            {sw
              ? "Hakuna kifurushi kilichochapishwa kwa sasa. Omba tathmini ili kuandaliwa orodha ya vifaa na nukuu inayolingana na eneo lako."
              : "No package is currently published. Request an assessment for an equipment schedule and quotation matched to your site."}
          </p>
        )}
      </section>
      <section>
        <h2>
          {sw ? "Nukuu iainishe nini?" : "What should the quotation identify?"}
        </h2>
        <p>
          {sw
            ? "Modeli na idadi ya kamera, DVR/NVR inayooana, hifadhi ya rekodi, nyaya, umeme, ufungaji na majaribio. Thibitisha pia namna ya kuangalia rekodi, ruhusa za watumiaji, dhamana na mambo yasiyojumuishwa."
            : "Camera models and quantities, compatible DVR/NVR, recording storage, cabling, power, installation and testing. Confirm playback, user access, warranty and exclusions too."}
        </p>
      </section>
      <nav className="article-links">
        <a href={"/services/cctv?lang=" + lang}>
          {sw ? "Huduma za ufungaji CCTV" : "CCTV installation service"} ↗
        </a>
        <a href={"/products?lang=" + lang}>
          {sw ? "Orodha ya vifaa" : "Equipment catalogue"} ↗
        </a>
      </nav>
    </PremiumArticle>
  );
}
