import type { Language } from "@/lib/i18n/config";
export function SecurityLinks({ lang }: { lang: Language }) {
  return (
    <>
      {[
        ["cctv", lang === "sw" ? "Ufungaji wa CCTV" : "CCTV installation"],
        [
          "electric-fence",
          lang === "sw" ? "Uzio wa umeme" : "Electric fencing",
        ],
        [
          "gate-motors",
          lang === "sw" ? "Mageti ya kiotomatiki" : "Gate automation",
        ],
      ].map(([slug, title]) => (
        <a key={slug} href={"/services/" + slug + "?lang=" + lang}>
          {title} ↗
        </a>
      ))}
    </>
  );
}
export function SecurityNavigation({ lang }: { lang: Language }) {
  return (
    <details className="specialty-nav">
      <summary>
        {lang === "sw" ? "Ulinzi na Usalama" : "Security & Safety"}
      </summary>
      <div className="specialty-links">
        <SecurityLinks lang={lang} />
        <a href={"/services?lang=" + lang + "#security"}>
          {lang === "sw" ? "Huduma zote za ulinzi" : "All security services"} ↗
        </a>
      </div>
    </details>
  );
}
