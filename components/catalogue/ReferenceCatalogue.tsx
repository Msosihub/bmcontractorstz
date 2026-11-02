"use client";
import { useState } from "react";
import type { Language } from "@/lib/i18n/config";
import type { Localized } from "@/lib/catalogue/types";
import type { ReferenceProduct } from "@/lib/catalogue/reference-types";
import { solutionLinks } from "./links";
import { ReferenceCard } from "./ReferenceCard";
/** Brand-independent namespace/categories are supplied by each curated catalogue. No live CMS fetch. */
export function ReferenceCatalogue({
  products,
  lang,
  namespace,
  categories,
  initialCategory,
}: {
  products: ReferenceProduct[];
  lang: Language;
  namespace: string;
  categories: Record<string, Localized>;
  initialCategory?: string;
}) {
  const sw = lang === "sw",
    [query, setQuery] = useState(""),
    [category, setCategory] = useState(
      initialCategory && categories[initialCategory] ? initialCategory : "all",
    ),
    [selected, setSelected] = useState<string[]>([]);
  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.name} ${p.variants.join(" ")} ${p.summary[lang]} ${categories[p.category]?.[lang]}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim()),
  );
  const compared = selected.map((id) => products.find((p) => p.slug === id)!);
  return (
    <div className="rc-catalogue">
      <div className="rc-filters">
        <label>
          {sw ? "Tafuta modeli au matumizi" : "Find a model or application"}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              sw ? "Mfano: SenseFace, hoteli…" : "Try SenseFace, hotel…"
            }
          />
        </label>
        <label>
          {sw ? "Aina ya vifaa" : "Equipment category"}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">{sw ? "Vifaa vyote" : "All equipment"}</option>
            {Object.entries(categories).map(([id, label]) => (
              <option key={id} value={id}>
                {label[lang]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="ac-note" role="status">
        {sw ? "Modeli/familia" : "Models/families"}: {filtered.length}.{" "}
        {sw ? "Chagua hadi 3 kulinganisha." : "Select up to 3 to compare."}
      </p>
      <div className="rc-grid">
        {filtered.map((p) => (
          <div key={p.slug}>
            <ReferenceCard p={p} lang={lang} namespace={namespace} />
            <label className="rc-check">
              <input
                type="checkbox"
                checked={selected.includes(p.slug)}
                disabled={selected.length === 3 && !selected.includes(p.slug)}
                onChange={() =>
                  setSelected((prev) =>
                    prev.includes(p.slug)
                      ? prev.filter((id) => id !== p.slug)
                      : [...prev, p.slug],
                  )
                }
              />
              {sw ? "Linganisha" : "Compare"} {p.name}
            </label>
          </div>
        ))}
      </div>
      {!filtered.length && (
        <div className="rc-empty">
          <p>
            {sw
              ? "Hakuna modeli iliyolingana. Jaribu jina au aina nyingine."
              : "No matching model. Try another name or category."}
          </p>
          <button
            type="button"
            className="button dark"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            {sw ? "Onyesha zote" : "Show all equipment"}
          </button>
        </div>
      )}
      {compared.length > 0 && (
        <section className="rc-compare" aria-labelledby="rc-compare-title">
          <div className="ac-heading">
            <h2 id="rc-compare-title">
              {sw ? "Linganisha chaguo lako" : "Compare your shortlist"}
            </h2>
            <button
              className="ac-textlink"
              type="button"
              onClick={() => setSelected([])}
            >
              {sw ? "Futa uchaguzi" : "Clear selection"}
            </button>
          </div>
          <p>
            {sw
              ? "Vifaa vya makundi tofauti si mbadala wa moja kwa moja."
              : "Devices in different categories are not direct substitutes."}
          </p>
          <div
            className="rc-table-scroll"
            tabIndex={0}
            role="region"
            aria-label={sw ? "Jedwali la ulinganisho" : "Comparison table"}
          >
            <table>
              <caption className="sr-only">
                {sw
                  ? "Vipengele na ulinganifu wa vifaa"
                  : "Equipment features and compatibility"}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{sw ? "Kipengele" : "Selection"}</th>
                  {compared.map((p) => (
                    <th key={p.slug} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{sw ? "Matumizi" : "Category"}</th>
                  {compared.map((p) => (
                    <td key={p.slug}>{categories[p.category]?.[lang]}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">{sw ? "Matoleo" : "Variants"}</th>
                  {compared.map((p) => (
                    <td key={p.slug}>{p.variants.join(" / ")}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">{sw ? "Ulinganifu" : "Compatibility"}</th>
                  {compared.map((p) => (
                    <td key={p.slug}>{p.compatibility[lang]}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">{sw ? "Chaguo la nukuu" : "Quotation"}</th>
                  {compared.map((p) => (
                    <td key={p.slug}>
                      <a href={solutionLinks(lang, "ZKTeco " + p.name).quote}>
                        {sw ? "Omba bei ya sasa" : "Request Current Price"} ↗
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
export function ReferenceEnquiry({
  p,
  lang,
}: {
  p: ReferenceProduct;
  lang: Language;
}) {
  const sw = lang === "sw",
    [variant, setVariant] = useState(p.variants[0]),
    [scope, setScope] = useState("installed"),
    detail = `ZKTeco ${variant} — ${scope === "installed" ? (sw ? "mfumo uliofungwa" : "installed system") : scope === "equipment" ? (sw ? "vifaa pekee" : "equipment only") : sw ? "matengenezo ya mfumo uliopo" : "existing-system support"}`,
    links = solutionLinks(lang, detail);
  return (
    <div className="rc-enquiry">
      <p className="eyebrow">
        {sw ? "OMBA BEI YA SASA" : "REQUEST CURRENT PRICE"}
      </p>
      <label>
        {sw ? "Modeli / toleo" : "Model / variant"}
        <select value={variant} onChange={(e) => setVariant(e.target.value)}>
          {p.variants.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <label>
        {sw ? "Unahitaji nini?" : "What do you need?"}
        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="installed">
            {sw ? "Mfumo kamili uliofungwa" : "Complete installed system"}
          </option>
          <option value="equipment">
            {sw ? "Vifaa pekee" : "Equipment only"}
          </option>
          <option value="support">
            {sw ? "Matengenezo / uboreshaji" : "Maintenance / upgrade"}
          </option>
        </select>
      </label>
      <div className="ac-actions">
        <a className="button dark" href={links.quote}>
          {sw ? "Omba nukuu" : "Request quotation"} ↗
        </a>
        <a className="ac-textlink" href={links.whatsapp}>
          WhatsApp ↗
        </a>
        <a className="ac-textlink" href={links.survey}>
          {sw ? "Ukaguzi wa eneo" : "Site survey"} ↗
        </a>
      </div>
      <p className="ac-note">
        {sw
          ? "Bei, upatikanaji, leseni na vifaa vya ziada vitathibitishwa kwenye nukuu."
          : "Price, availability, licences and included accessories are confirmed in your quotation."}
      </p>
    </div>
  );
}
