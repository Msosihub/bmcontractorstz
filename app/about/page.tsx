import { WorkingApproach } from "@/components/premium/WorkingApproach";
import { Photo } from "@/components/premium/Frame";
import { PremiumArticle } from "@/components/premium/Article";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  return (
    <PremiumArticle
      lang={lang}
      title={
        sw
          ? "Mifumo inayolingana na matumizi ya jengo."
          : "Systems that serve the building."
      }
      label={sw ? "KUHUSU BM CONTRACTORS" : "ABOUT BM CONTRACTORS"}
      intro={
        sw
          ? "BM Engineering Contractors Limited hushughulikia mahitaji ya ulinzi, umeme na teknolojia kwa nyumba, biashara na taasisi."
          : "BM Engineering Contractors Limited works with security, electrical and technology requirements for homes, businesses and institutions."
      }
    >
      <Photo
        asset="team"
        lang={lang}
        className="people-photo"
        alt={
          sw
            ? "Watu wa kubuni wakijadili mpango wa eneo; picha ya AI"
            : "Fictional technical professionals discussing a site plan; AI illustration"
        }
        caption={
          sw
            ? "Picha ya mfano ya AI · Watu hawa si wafanyakazi wala wateja halisi wa BM"
            : "AI illustration · These are fictional people, not BM employees or clients"
        }
        sizes="(max-width:760px) 100vw, 75vw"
      />
      <section>
        <p className="eyebrow">
          {sw
            ? "MAZUNGUMZO. TATHMINI. MPANGO."
            : "CONVERSATION. ASSESSMENT. A PLAN."}
        </p>
        <h2>
          {sw
            ? "Mahitaji yako yanaongoza kazi."
            : "Your requirements guide the work."}
        </h2>
        <p>
          {sw
            ? "Nyumba, biashara na taasisi zina mahitaji tofauti. Eleza changamoto, matumizi ya eneo na mifumo iliyopo ili kupanga tathmini na wigo wa kazi. Picha hii inaonyesha mazungumzo ya kiufundi kwa mfano tu; si picha ya timu au mradi halisi wa BM."
            : "Homes, businesses and institutions need different systems. Share the problem, how the site is used and what is already installed so that assessment and scope can be planned. This image illustrates a technical discussion; it is not a photograph of the BM team or a completed project."}
        </p>
      </section>
      <section>
        <h2>
          {sw
            ? "Usalama, umeme na mawasiliano"
            : "Security, power & communications"}
        </h2>
        <p>
          {sw
            ? "CCTV, uzio wa umeme na mageti ya kiotomatiki ni sehemu kuu ya huduma zetu. Mahitaji ya kazi za umeme, jenereta, jua, umeme wa akiba, mitandao na simu za ofisi hupangwa kulingana na matumizi na hali ya eneo."
            : "CCTV, electric fencing and gate automation remain central to our services. Electrical contracting, generators, solar, backup power, networking and office telephones are planned around site conditions and use."}
        </p>
      </section>
      <WorkingApproach lang={lang} />
      <nav className="article-links">
        <a href={"/services?lang=" + lang}>
          {sw ? "Huduma zetu" : "Our services"} ↗
        </a>
        <a href={"/services/institutional-procurement?lang=" + lang}>
          {sw ? "Mahitaji ya taasisi" : "Institutional enquiries"} ↗
        </a>
      </nav>
    </PremiumArticle>
  );
}
