import { pageMetadata } from "@/lib/seo";
import { PremiumArticle } from "@/components/premium/Article";
import { EnquiryLink } from "@/components/premium/Frame";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const pkg = await prisma.cctvPackage.findFirst({
    where: { slug, isPublished: true },
  });
  const title =
    (lang === "sw" ? pkg?.titleSw : pkg?.titleEn) ||
    pkg?.titleEn ||
    (lang === "sw" ? "Kifurushi cha CCTV" : "CCTV Package");
  const description =
    (lang === "sw" ? pkg?.descriptionSw : pkg?.descriptionEn) ||
    (lang === "sw"
      ? "Omba ukaguzi wa eneo kwa makadirio ya mfumo wa CCTV."
      : "Request a site survey for a CCTV quotation.");
  // includedItems currently has one shared language; bilingual package descriptions alone
  // do not make the complete detail content translated.
  return pageMetadata(
    "/cctv-packages/" + slug,
    lang,
    [title, description],
    false,
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const pkg = await prisma.cctvPackage.findFirst({
    where: { slug: (await params).slug, isPublished: true },
  });
  if (!pkg) notFound();
  const title = sw ? pkg.titleSw || pkg.titleEn : pkg.titleEn;
  const items = Array.isArray(pkg.includedItems)
    ? pkg.includedItems.filter((x): x is string => typeof x === "string")
    : [];
  return (
    <PremiumArticle
      lang={lang}
      title={title}
      intro={
        (sw ? pkg.descriptionSw || pkg.descriptionEn : pkg.descriptionEn) ||
        undefined
      }
      label={sw ? "KIFURUSHI CHA CCTV" : "CCTV PACKAGE"}
      enquiry={false}
    >
      {sw && (
        <p className="scope-note">
          Orodha ya vifaa ina lugha moja kwenye rekodi; baadhi ya maelezo
          yanaweza kuwa kwa Kiingereza.
        </p>
      )}
      <section>
        <h2>{sw ? "Taarifa za kifurushi" : "Package record"}</h2>
        <p>
          {pkg.cameras} {sw ? "kamera" : "cameras"} ·{" "}
          {pkg.priceFrom !== null
            ? "TZS " + pkg.priceFrom.toLocaleString("en-US")
            : sw
              ? "Omba bei baada ya ukaguzi"
              : "Price after site assessment"}
        </p>
        <ul>
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {!items.length && (
          <p>
            {sw
              ? "Orodha ya vifaa haijaongezwa; iombe kwenye nukuu."
              : "An itemised equipment list has not been added; request it with the quotation."}
          </p>
        )}
      </section>
      <section>
        <h2>{sw ? "Wigo uthibitishwe" : "Confirm the scope"}</h2>
        <p>
          {sw
            ? "Thibitisha modeli, umbali wa nyaya, muda wa rekodi, gharama za ufungaji, dhamana na upatikanaji kabla ya kuagiza."
            : "Confirm exact models, cable distances, recording period, installation costs, warranty and availability before ordering."}
        </p>
      </section>
      <EnquiryLink lang={lang} subject={title} packageSlug={pkg.slug} />
      <nav className="article-links">
        <a href={"/cctv-packages?lang=" + lang}>
          {sw ? "Vifurushi vyote" : "All packages"} ↗
        </a>
        <a href={"/services/cctv?lang=" + lang}>
          {sw ? "Ufungaji wa CCTV" : "CCTV installation"} ↗
        </a>
      </nav>
    </PremiumArticle>
  );
}
