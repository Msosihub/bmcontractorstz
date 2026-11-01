"use client";
import Image from "next/image";
import { useState } from "react";
import { House, Sprout, Map, ArrowUpRight, Check } from "lucide-react";
import copy from "@/data/electric-fence-commercial.json";
import type { Language } from "@/lib/i18n/config";
import { fenceLinks } from "./links";
const icons = [House, Sprout, Map];
export function FencePlanner({ lang }: {
    lang: Language;
}) {
    const t = copy[lang];
    const [selected, setSelected] = useState(0);
    const [mount, setMount] = useState(0);
    const [length, setLength] = useState("");
    const app = t.applications[selected];
    const context = [app.context, mount ? t.mountOptions[mount] : "", length ? `${length} m` : ""].filter(Boolean).join(" — ");
    const links = fenceLinks(lang, context);
    return (<section className="ef-section ef-planner" id="applications" aria-labelledby="ef-app-title">
      <div className="ef-heading"><p className="eyebrow">{t.applicationLabel}</p><h2 id="ef-app-title">{t.applicationTitle}</h2><p>{t.applicationIntro}</p></div>
      <div className="ef-app-picker" role="group" aria-labelledby="ef-app-title">
        {t.applications.map((item, i) => {
            const Icon = icons[i];
            return <button key={item.id} type="button" aria-pressed={selected === i} aria-controls={`ef-panel-${item.id}`} onClick={() => { setSelected(i); setMount(0); }}>
            <span className="ef-picker-top"><Icon size={24} aria-hidden="true"/><span>0{i + 1}</span></span>
            <strong>{item.name}</strong><span className="ef-choice-short">{item.short}</span><ArrowUpRight size={18} aria-hidden="true" className="ef-choice-arrow"/>
          </button>;
        })}
      </div>
      {t.applications.map((item, i) => <article key={item.id} id={`ef-panel-${item.id}`} className="ef-app-panel" hidden={selected !== i} aria-label={item.name}>
        <figure><Image src={item.image} alt={item.alt} fill sizes="(max-width:760px) 100vw, 42vw"/><figcaption>{lang === "sw" ? "Picha ya mfano wa mazingira" : "Illustrative setting"}</figcaption></figure>
        <div className="ef-panel-copy"><p className="eyebrow">{item.name}</p><h3>{item.title}</h3><p>{item.body}</p><ul>{item.points.map(x => <li key={x}><Check size={16} aria-hidden="true"/><span>{x}</span></li>)}</ul><p className="ef-panel-note">{item.note}</p></div>
      </article>)}
      <div className="ef-brief" aria-label={t.briefLabel}>
        <div className="ef-brief-title"><p className="eyebrow">{t.briefLabel}</p><p>{t.briefNote}</p></div>
        <div className="ef-inputs">
          <label htmlFor="ef-mount">{t.mountLabel}<select id="ef-mount" value={mount} onChange={e => setMount(Number(e.target.value))}>{t.mountOptions.map((x, i) => <option key={x} value={i}>{x}</option>)}</select></label>
          <label htmlFor="ef-length">{t.lengthLabel}<span className="ef-length-field"><input id="ef-length" inputMode="decimal" type="text" maxLength={7} value={length} placeholder={t.lengthPlaceholder} onChange={e => { const v = e.target.value; if (/^\d{0,5}(?:\.\d{0,1})?$/.test(v))
        setLength(v); }} aria-describedby="ef-length-help"/><span aria-hidden="true">m</span></span><small id="ef-length-help">{t.metres}</small></label>
        </div>
        <div className="ef-brief-actions"><a className="button dark" href={selected === 0 ? links.quote : links.survey}>{app.action}<ArrowUpRight size={18} aria-hidden="true"/></a><a className="ef-link" href={links.whatsapp}>{t.whatsapp} ↗</a></div>
      </div>
    </section>);
}
