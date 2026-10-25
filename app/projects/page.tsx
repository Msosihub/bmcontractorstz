import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo, EnquiryLink } from "@/components/premium/Frame";
import { prisma } from "@/lib/prisma";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const records = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <section className="service-hero">
          <div>
            <p className="eyebrow">
              {sw
                ? "MIRADI / KAZI ZILIZOCHAPISHWA"
                : "PROJECTS / PUBLISHED WORK"}
            </p>
            <h1>
              {sw
                ? "Ushahidi wenye\nmaelezo ya kweli."
                : "Evidence deserves\nthe whole story."}
            </h1>
            <p className="lead">
              {sw
                ? "Maelezo ya kazi na picha za miradi huwasilishwa baada ya kuthibitishwa na kuruhusiwa kuchapishwa. Picha za mifano hazitumiwi kama ushahidi wa kazi ya BM."
                : "Project details and site photography belong here when verified and approved for publication. Illustrative photography is never presented as evidence of a BM installation."}
            </p>
          </div>
          <Photo asset="engineering" lang={lang} />
        </section>
        <section className="section">
          <p className="eyebrow">
            {sw ? "REKODI ZA MIRADI" : "PROJECT RECORDS"}
          </p>
          {records.length ? (
            <div className="record-grid">
              {records.map((x) => (
                <article key={x.id}>
                  <h3>{sw ? x.titleSw || x.titleEn : x.titleEn}</h3>
                  <p>
                    {sw ? x.descriptionSw || x.descriptionEn : x.descriptionEn}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="editorial-empty">
              <h2>
                {sw
                  ? "Kazi yenye taarifa.\nSi picha pekee."
                  : "A considered record.\nNot just a photograph."}
              </h2>
              <p>
                {sw
                  ? "Hakuna rekodi ya mradi iliyochapishwa kwenye mazingira haya kwa sasa. Kabla ya maelezo kuongezwa, tunahitaji kazi iliyoelezwa, picha zilizoidhinishwa na taarifa zinazoweza kuthibitishwa."
                  : "No project record is currently published in this environment. A future case study needs a defined scope, approved site photography and verifiable project information."}
              </p>
              <EnquiryLink lang={lang} subject="Project scope discussion" />
            </div>
          )}
        </section>
        <section className="brief-band">
          <h2>
            {sw ? "Mradi wako\nunahitaji nini?" : "What does\nyour site need?"}
          </h2>
          <div>
            <p>
              {sw
                ? "Tuletee eneo, vipaumbele na mfumo uliopo. Mazungumzo ya mradi huanza na mahitaji yako, si madai ya kazi nyingine."
                : "Bring your site requirements, priorities and existing systems. The conversation begins with your brief."}
            </p>
            <a className="text-link" href={"/services?lang=" + lang}>
              {sw ? "Fahamu huduma" : "Explore expertise"} ↗
            </a>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
