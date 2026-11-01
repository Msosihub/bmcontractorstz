"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import copy from "@/data/electric-fence-commercial.json";
import references from "@/data/electric-fence-equipment-references.json";
import { fenceLinks } from "./links";

const brands = ["Nemtek", "JVA", "Gallagher", "Stafix"];
export function FenceCatalogue({ lang }: { lang: Language }) {
  const [brand, setBrand] = useState("all");
  const [application, setApplication] = useState("all");
  const sw = lang === "sw", t = copy[lang];
  const visible = references.models.filter(x => (brand === "all" || x.brand === brand) && (application === "all" || x.application === application));
  return <div className="ef-catalogue" aria-labelledby="ef-catalogue-title">
    <div className="ef-brands-heading"><p className="eyebrow">{sw ? "MWONGOZO WA VIFAA" : "EQUIPMENT GUIDE"}</p><h3 id="ef-catalogue-title">{t.brandsTitle}</h3><p>{t.brandsIntro}</p></div>
    <div className="ef-catalogue-controls">
      <div className="ef-brand-filters" role="group" aria-label={sw ? "Chagua chapa" : "Filter by brand"}>{["all", ...brands].map(x => <button type="button" key={x} aria-pressed={brand === x} onClick={() => setBrand(x)}>{x === "all" ? (sw ? "Chapa zote" : "All brands") : x}</button>)}</div>
      <label htmlFor="ef-equipment-use"><span>{sw ? "Matumizi" : "Application"}</span><select id="ef-equipment-use" value={application} onChange={e => setApplication(e.target.value)}><option value="all">{sw ? "Matumizi yote" : "All applications"}</option><option value="security">{sw ? "Usalama" : "Security"}</option><option value="agricultural">{sw ? "Kilimo na mifugo" : "Agriculture & livestock"}</option></select></label>
    </div>
    <p className="ef-catalogue-count" role="status">{sw ? `Modeli ${visible.length}` : `${visible.length} model${visible.length === 1 ? "" : "s"}`}</p>
    <div className="ef-models">{references.models.map(item => <article key={item.id} className="ef-model-card" data-model-id={item.id} hidden={!visible.some(x => x.id === item.id)}>
      <div className="ef-model-photo"><Image src={item.imagePath} alt={item.name} fill sizes="(max-width:380px) 85vw, (max-width:760px) 40vw, (max-width:1100px) 42vw, 280px" /></div>
      <div className="ef-model-information"><p className="eyebrow">{item.application === "security" ? (sw ? "USALAMA" : "SECURITY") : (sw ? "KILIMO NA MIFUGO" : "AGRICULTURE & LIVESTOCK")}</p><h4>{item.name}</h4><ul className="ef-model-features">{(sw ? item.featuresSw : item.featuresEn).map(x => <li key={x}>{x}</li>)}</ul><p>{sw ? item.descriptionSw : item.descriptionEn}</p><a className="ef-model-enquiry" href={fenceLinks(lang, `${t.briefPrefix} — ${item.name}`).quote}>{t.quote}<ArrowUpRight size={16} aria-hidden="true" /></a><a className="ef-manufacturer" href={item.url} target="_blank" rel="noopener noreferrer">{t.official}<span className="sr-only">{sw ? " (hufunguka kwenye ukurasa mpya)" : " (opens in a new tab)"}</span> ↗</a></div>
    </article>)}</div>
    {visible.length === 0 && <div className="ef-catalogue-empty"><p>{sw ? "Hakuna modeli katika chaguo hili. Tuambie matumizi yako tukushauri kifaa kinachofaa." : "No model in this selection. Tell us your application and we’ll help you choose suitable equipment."}</p><a href={fenceLinks(lang, sw ? "Ushauri wa energizer" : "Energizer selection advice").quote}>{sw ? "Omba ushauri" : "Ask for advice"} ↗</a></div>}
    <p className="ef-reference-note">{t.brandNote}</p>
  </div>;
}
