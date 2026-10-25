import content from "@/data/specialist-technical-content.json";
import manufacturers from "@/data/manufacturer-research.json";
import type { Language } from "@/lib/i18n/config";

/** Editorial guidance, not catalogue stock, a design specification or a partner claim. */
export function SpecialistDetail({
  slug,
  lang,
}: {
  slug: string;
  lang: Language;
}) {
  const entry = content[slug as keyof typeof content];
  if (!entry) return null;
  const t = entry[lang];
  const sw = lang === "sw";
  const referenceIds = new Set<string>(entry.references);
  const references = manufacturers.filter(
    (m) =>
      referenceIds.has(m.id) && m.identityStatus === "primary-source verified",
  );
  return (
    <section className="section specialist-detail" aria-label={t.title}>
      <div className="specialist-intro">
        <p className="eyebrow">
          {sw ? "MWONGOZO WA UCHAGUZI" : "THE TECHNICAL BRIEF"}
        </p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>
      <table className="specialist-comparison">
        <caption className="sr-only">{t.title}</caption>
        <thead>
          <tr>
            <th scope="col">
              {sw ? "Chaguo / matumizi" : "Option / application"}
            </th>
            <th scope="col">{sw ? "Cha kuzingatia" : "What to assess"}</th>
          </tr>
        </thead>
        <tbody>
          {t.comparison.map((row) => (
            <tr key={row.option}>
              <th scope="row">{row.option}</th>
              <td>{row.consideration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="specialist-notes">
        {t.notes.map((note) => (
          <article key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
      <details className="specialist-question">
        <summary>{t.faq.question}</summary>
        <p>{t.faq.answer}</p>
      </details>
      {references.length > 0 && (
        <details className="manufacturer-references">
          <summary>
            {sw
              ? "Rejea za vifaa na nyaraka za watengenezaji"
              : "Equipment references & manufacturer documentation"}
          </summary>
          <p className="scope-note">
            {sw
              ? "Rejea hizi zinasaidia kulinganisha mifumo. Hazithibitishi stock, uwakala, partnership au upatikanaji wa modeli kwa BM. Vifaa, uoanifu na masharti ya ugavi vithibitishwe kwenye nukuu."
              : "These references help compare systems. They do not establish BM stock, dealership, partnership or model availability. Confirm equipment, compatibility and supply terms in the quotation."}
          </p>
          <ul>
            {references.map((m) => (
              <li key={m.id}>
                <a href={m.source!} rel="noreferrer">
                  {m.brand} ↗
                </a>
                <span>{m.families}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
