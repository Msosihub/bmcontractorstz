import { PremiumArticle } from "@/components/premium/Article";
import { getPublicSupportArticles } from "@/lib/support";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const articles = await getPublicSupportArticles();
  return (
    <PremiumArticle
      lang={lang}
      title={
        sw
          ? "Mwongozo kabla na baada ya ufungaji."
          : "Useful guidance. Before and after installation."
      }
      label={sw ? "MSAADA KWA WATEJA" : "CUSTOMER SUPPORT"}
      intro={
        sw
          ? "Maelezo ya kupanga ukaguzi wa eneo, kuelewa vifaa na kutambua wakati wa kuomba matengenezo."
          : "Plan a site assessment, understand equipment choices and recognise when to request maintenance."
      }
    >
      <div className="directory">
        {articles.map((x) => (
          <a key={x.slug} href={"/support/" + x.slug + "?lang=" + lang}>
            <span>{sw ? x.titleSw || x.titleEn : x.titleEn}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <section>
        <h2>{sw ? "Unaripoti hitilafu?" : "Reporting a fault?"}</h2>
        <p>
          {sw
            ? "Taja modeli ya kifaa, eneo, dalili na muda tatizo lilipoanza. Usitume nywila, misimbo ya kuingia au rekodi zenye taarifa binafsi kwenye fomu."
            : "Include the equipment model, location, symptoms and when the problem started. Do not send passwords, access codes or recordings containing personal information through the form."}
        </p>
      </section>
    </PremiumArticle>
  );
}
