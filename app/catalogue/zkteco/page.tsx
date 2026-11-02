import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import { zktecoProducts, zktecoCategories } from "@/lib/catalogue/zkteco";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { DoorAccessoryGuide } from "@/components/premium/access-control/EquipmentGuide";
import "@/components/premium/access-control/access.css";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const q = await searchParams,
    l = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(
    "/catalogue/zkteco",
    l,
    l === "en"
      ? [
          "ZKTeco Catalogue: Attendance, Door Access & Smart Locks Tanzania",
          "Compare genuine ZKTeco model references, controllers, smart locks and turnstiles. Request current equipment prices or complete installation from BM Contractors.",
        ]
      : [
          "Katalogi ya ZKTeco: Mahudhurio, Milango na Makufuli Janja",
          "Linganisha modeli za ZKTeco, controllers, makufuli janja na turnstiles. Omba bei ya sasa ya vifaa au mfumo kamili kutoka BM Contractors.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const q = await searchParams,
    lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main">
        <header className="ac-section rc-catalogue-head">
          <p className="eyebrow">
            <a href={`/services/access-control?lang=${lang}`}>
              {sw
                ? "ACCESS CONTROL NA MAHUDHURIO"
                : "ACCESS CONTROL & ATTENDANCE"}
            </a>{" "}
            / ZKTECO
          </p>
          <h1>
            {sw ? "Watu. Milango." : "People. Doors."}
            <br />
            <em>{sw ? "Chaguo sahihi." : "The right fit."}</em>
          </h1>
          <p className="lead">
            {sw
              ? "Chunguza vifaa vinavyotambulika. Linganisha kazi, modeli na ulinganifu kabla ya kuomba bei au ufungaji."
              : "Explore recognizable equipment. Compare purpose, model and compatibility before requesting equipment or a complete installed system."}
          </p>
          <p className="ac-note">
            {sw
              ? "Rejea za mtengenezaji zilizohakikiwa; si stock iliyothibitishwa. Vifaa vya mifumo ya zamani vimeainishwa. Bei, leseni na upatikanaji hutolewa kwenye nukuu."
              : "Verified manufacturer references, not confirmed inventory. Older existing-system models are identified. Prices, licences and availability are confirmed in your quotation."}
          </p>
        </header>
        <section className="ac-section">
          <ReferenceCatalogue
            products={zktecoProducts}
            lang={lang}
            namespace="/catalogue/zkteco"
            categories={zktecoCategories}
            initialCategory={q.category === "hotel" ? "smart-lock" : q.category}
          />
        </section>
        <DoorAccessoryGuide lang={lang} />
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
