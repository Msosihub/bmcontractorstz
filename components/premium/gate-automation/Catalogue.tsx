"use client";
import { useState } from "react";
import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { categoryNames, type CatalogueProduct } from "@/lib/catalogue/types";
export function ProductCard({
  p,
  lang,
}: {
  p: CatalogueProduct;
  lang: Language;
}) {
  const sw = lang === "sw";
  return (
    <article className="ga-product">
      <a
        className="ga-product-photo"
        href={`/catalogue/centurion/${p.slug}?lang=${lang}`}
      >
        <Image
          src={p.images[0].src}
          alt={p.images[0].alt}
          width={716}
          height={540}
          sizes="(max-width:650px) 90vw, (max-width:1000px) 45vw, 30vw"
        />
      </a>
      <div>
        <p className="ga-kicker">
          {p.generation === "smart-plus"
            ? "SMΔRT+"
            : categoryNames[p.category]?.[lang]}
        </p>
        <h3>
          <a href={`/catalogue/centurion/${p.slug}?lang=${lang}`}>{p.name}</a>
        </h3>
        <p>{p.summary[lang]}</p>
        <a
          className="ga-textlink"
          href={`/catalogue/centurion/${p.slug}?lang=${lang}`}
        >
          {sw ? "Angalia kifaa na uombe bei" : "View equipment & request price"}{" "}
          ↗
        </a>
      </div>
    </article>
  );
}
export function Catalogue({
  products,
  lang,
  initialCategory = "all",
}: {
  products: CatalogueProduct[];
  lang: Language;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(
      categoryNames[initialCategory] ? initialCategory : "all",
    ),
    [q, setQ] = useState(""),
    [selected, setSelected] = useState<string[]>([]);
  const sw = lang === "sw";
  const visible = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.name} ${p.summary[lang]}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <div className="ga-filter">
        <label>
          {sw ? "Tafuta modeli au matumizi" : "Search model or application"}
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="D6, VANTAGE, garage…"
          />
        </label>
        <label>
          {sw ? "Aina ya mfumo" : "System category"}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">{sw ? "Vifaa vyote" : "All equipment"}</option>
            {Object.entries(categoryNames).map(([key, l]) => (
              <option key={key} value={key}>
                {l[lang]}
              </option>
            ))}
          </select>
        </label>
        <p role="status">
          {visible.length} {sw ? "vifaa / makundi" : "models / families"}
        </p>
      </div>
      <div className="ga-grid">
        {visible.map((p) => (
          <div key={p.slug}>
            <ProductCard p={p} lang={lang} />
            <label className="ga-compare-check">
              <input
                type="checkbox"
                checked={selected.includes(p.slug)}
                disabled={selected.length === 3 && !selected.includes(p.slug)}
                onChange={() =>
                  setSelected((old) =>
                    old.includes(p.slug)
                      ? old.filter((x) => x !== p.slug)
                      : [...old, p.slug],
                  )
                }
              />
              {sw ? "Linganisha" : "Compare"}
            </label>
          </div>
        ))}
      </div>
      {visible.length === 0 ? (
        <p>
          {sw
            ? "Hakuna kifaa kinacholingana. Jaribu jina jingine au aina nyingine."
            : "No matching equipment. Try another name or category."}
        </p>
      ) : null}
      {selected.length > 0 ? (
        <section className="ga-comparison" aria-labelledby="compare-title">
          <h2 id="compare-title">
            {sw ? "Linganisha chaguo zako" : "Your shortlist"}{" "}
            <small>({selected.length}/3)</small>
          </h2>
          <p>
            {sw
              ? "Kiwango cha uzito pekee hakitoshi kuchagua mota. Tathmini ya geti ndiyo itaamua."
              : "A mass rating alone cannot select a motor. The gate assessment determines suitability."}
          </p>
          <div
            className="ga-comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label={sw ? "Ulinganisho wa vifaa" : "Equipment comparison"}
          >
            <table>
              <thead>
                <tr>
                  <th>{sw ? "Modeli" : "Model"}</th>
                  {products
                    .filter((p) => selected.includes(p.slug))
                    .map((p) => (
                      <th key={p.slug}>{p.name}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{sw ? "Matumizi" : "Application"}</th>
                  {products
                    .filter((p) => selected.includes(p.slug))
                    .map((p) => (
                      <td key={p.slug}>
                        {categoryNames[p.category]?.[lang]}
                        <p>{p.specs[0].value[lang]}</p>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th>{sw ? "Bei" : "Price"}</th>
                  {selected.map((slug) => (
                    <td key={slug}>
                      {sw ? "Omba bei ya sasa" : "Request current price"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>{sw ? "Hatua inayofuata" : "Next step"}</th>
                  {selected.map((slug) => (
                    <td key={slug}>
                      <a href={`/catalogue/centurion/${slug}?lang=${lang}`}>
                        {sw ? "Maelezo na nukuu" : "Details & quotation"} ↗
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" onClick={() => setSelected([])}>
            {sw ? "Ondoa chaguo" : "Clear shortlist"}
          </button>
        </section>
      ) : null}
    </>
  );
}
export function Gallery({ p, lang }: { p: CatalogueProduct; lang: Language }) {
  const [active, setActive] = useState(0);
  return (
    <div className="ga-gallery">
      <Image
        src={p.images[active].src}
        alt={p.images[active].alt}
        width={1000}
        height={750}
        sizes="(max-width:760px) 100vw, 50vw"
        preload
      />
      <div className="ga-thumbs">
        {p.images.map((im, i) => (
          <button
            type="button"
            key={im.src}
            aria-pressed={i === active}
            aria-label={`${lang === "sw" ? "Picha" : "Photo"} ${i + 1}`}
            onClick={() => setActive(i)}
          >
            <Image src={im.src} alt="" width={90} height={70} />
          </button>
        ))}
      </div>
    </div>
  );
}
export function ProductEnquiry({
  p,
  lang,
}: {
  p: CatalogueProduct;
  lang: Language;
}) {
  const [variant, setVariant] = useState(p.variants[0]);
  const sw = lang === "sw";
  const base = (sw ? "Vifaa pekee: " : "Equipment only: ") + variant;
  const install = (sw ? "Ufungaji kamili: " : "Installed system: ") + variant;
  return (
    <div className="ga-enquiry">
      <label htmlFor="gate-variant">
        {sw ? "Modeli / aina" : "Model / variant"}
      </label>
      <select
        id="gate-variant"
        value={variant}
        onChange={(e) => setVariant(e.target.value)}
      >
        {p.variants.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
      <p className="ga-price">
        {sw ? "Omba bei ya sasa" : "Request Current Price"}
      </p>
      <p>
        {sw
          ? "Bei na upatikanaji vitathibitishwa kwenye nukuu. Bei ya kifaa pekee hutofautiana na gharama ya mfumo uliofungwa."
          : "Price and availability are confirmed on quotation. Equipment-only and installed-system quotations are separate."}
      </p>
      <div className="ga-actions">
        <a
          className="button dark"
          href={`/contact?lang=${lang}&subject=${encodeURIComponent(base.slice(0, 100))}`}
        >
          {sw ? "Omba bei ya kifaa" : "Equipment quotation"} ↗
        </a>
        <a
          className="ga-textlink"
          href={`/request-site-survey?lang=${lang}&service=${encodeURIComponent(install.slice(0, 100))}`}
        >
          {sw ? "Omba ukaguzi wa ufungaji" : "Installed-system survey"} ↗
        </a>
        <a
          className="ga-textlink"
          href={`/whatsapp?text=${encodeURIComponent((sw ? "Habari BM, naomba bei na ushauri: " : "Hello BM, please advise and quote: ") + variant + ". " + (sw ? "Eneo langu ni: " : "My location is: "))}`}
        >
          WhatsApp ↗
        </a>
      </div>
    </div>
  );
}
