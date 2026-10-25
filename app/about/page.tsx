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
      <section>
        <h2>
          {sw
            ? "Kuanzia mahitaji hadi wigo ulio wazi"
            : "From a brief to a clear scope"}
        </h2>
        <p>
          {sw
            ? "Anza kwa kueleza eneo, matumizi na tatizo unalotaka kutatua. Tathmini husaidia kuandaa vifaa, kazi, majaribio na makabidhiano. Nukuu inapaswa kuweka wazi mambo yanayojumuishwa, masharti na huduma zinazohitajika baadaye."
            : "Start with the location, intended use and problem to solve. Assessment helps define equipment, installation, testing and handover. The quotation should make inclusions, terms and future support requirements clear."}
        </p>
      </section>
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
