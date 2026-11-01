import Image from "next/image";
import { ShieldCheck, Cable, BatteryCharging, ArrowUpRight } from "lucide-react";
import type { Service } from "@prisma/client";
import type { Language } from "@/lib/i18n/config";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RecordImage } from "@/components/premium/RecordImage";
import { approvedRecordMedia } from "@/lib/approved-record-media";
import copy from "@/data/electric-fence-commercial.json";
import { FenceCatalogue } from "./Catalogue";
import { FenceCustomers } from "./Customers";
import { FencePlanner } from "./Planner";
import { fenceLinks } from "./links";
import "./fence.css";
export function ElectricFenceCommercialPage({ lang, record }: {
    lang: Language;
    record?: Service | null;
}) {
    const t = copy[lang], sw = lang === "sw";
    const links = fenceLinks(lang, sw ? "Ufungaji wa uzio wa umeme" : "Electric fence installation");
    const anchors = ["applications", "equipment", "questions"];
    const related = ["cctv", "gate-motors", "power-backup", "institutional-procurement"];
    const supplemental = record ? (sw ? record.contentSw : record.contentEn) : null;
    return <>
    <Header lang={lang}/>
    <main id="main" className="premium-main ef-commercial">
      <section className="ef-hero">
        <div className="ef-hero-copy">
          <p className="eyebrow"><a href={`/services?lang=${lang}`}>{sw ? "HUDUMA" : "OUR EXPERTISE"}</a> / {sw ? "UZIO WA UMEME" : "ELECTRIC FENCING"}</p>
          <p className="ef-identity">{t.service}</p><h1>{t.title}<br /><em>{t.emphasis}</em></h1><p className="lead">{t.intro}</p>
          <div className="ef-actions"><a className="button dark" href="#applications">{t.heroAction}<ArrowUpRight size={18} aria-hidden="true"/></a><a className="ef-link" href={links.whatsapp}>{t.whatsapp} ↗</a></div>
          <p className="ef-territory">{t.territory}</p>
        </div>
        {record && approvedRecordMedia("service", record) ? <div className="ef-record-image"><RecordImage kind="service" record={record} lang={lang}/></div> : <figure className="ef-hero-photo"><Image src="/assets/electric-fence-commercial/security-1440.webp" alt={t.applications[0].alt} fill preload loading="eager" sizes="(max-width:760px) 100vw, 54vw"/></figure>}
      </section>
      <nav className="ef-jump" aria-label={sw ? "Sehemu za ukurasa wa uzio" : "Electric fencing page sections"}>{t.jump.map((x, i) => <a href={`#${anchors[i]}`} key={x}><span>0{i + 1}</span>{x}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</nav>
      <FenceCustomers lang={lang}/>
      <FencePlanner lang={lang}/>
      {supplemental ? <section className="ef-service-notes"><details><summary>{sw ? "Maelezo ya ziada ya huduma" : "Additional service information"}<span aria-hidden="true">+</span></summary><p>{supplemental}</p></details></section> : record?.contentEn && sw ? <p className="ef-disclosure">Maelezo ya ziada ya rekodi hii bado hayajatafsiriwa kwa Kiswahili.</p> : null}
      <section className="ef-section ef-price" id="quotation" aria-labelledby="ef-price-title">
        <div><p className="eyebrow">{t.priceLabel}</p><h2 id="ef-price-title">{t.priceTitle}</h2><p>{t.priceIntro}</p><a className="button dark" href={links.survey}>{t.survey}<ArrowUpRight size={18} aria-hidden="true"/></a><p className="ef-small">{t.priceNote}</p></div>
        <div className="ef-price-factors">{t.priceFactors.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>
      <section className="ef-section ef-equipment" id="equipment" aria-labelledby="ef-equipment-title">
        <div className="ef-equipment-top"><div className="ef-heading"><p className="eyebrow">{t.equipmentLabel}</p><h2 id="ef-equipment-title">{t.equipmentTitle}</h2><p>{t.equipmentIntro}</p><div className="ef-system-marks" aria-hidden="true"><ShieldCheck /><span>+</span><Cable /><span>+</span><BatteryCharging /></div></div><div className="ef-equipment-details">{t.equipment.map(([title, body]) => <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></div>
        <FenceCatalogue lang={lang}/>
      </section>
      <section className="ef-section ef-maintenance" aria-labelledby="ef-maintenance-title"><div><p className="eyebrow">{t.maintenanceLabel}</p><h2 id="ef-maintenance-title">{t.maintenanceTitle}</h2></div><div><p>{t.maintenanceBody}</p><div className="ef-actions"><a className="button light" href={fenceLinks(lang, t.repairContext).quote}>{t.repairAction}<ArrowUpRight size={18} aria-hidden="true"/></a><a href={fenceLinks(lang, t.replacementContext).quote}>{t.replacementAction} ↗</a></div><p className="ef-small">{t.maintenanceNote}</p></div></section>
      <section className="ef-section ef-process" aria-labelledby="ef-process-title"><p className="eyebrow">{t.processLabel}</p><h2 id="ef-process-title">{t.processTitle}</h2><ol>{t.process.map(([title, body], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
      <section className="ef-section ef-faq" id="questions" aria-labelledby="ef-faq-title"><div><p className="eyebrow">{t.faqLabel}</p><h2 id="ef-faq-title">{t.faqTitle}</h2><a className="ef-link" href={links.whatsapp}>{t.whatsapp} ↗</a></div><div>{t.faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="ef-section ef-final"><p className="eyebrow">{t.finalLabel}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div className="ef-actions"><a className="button dark" href={links.quote}>{t.finalAction}<ArrowUpRight size={18} aria-hidden="true"/></a><a className="ef-link" href={links.survey}>{t.survey} ↗</a><a className="ef-link" href={links.call}>{t.callLabel} · +255 760 111 880</a></div></section>
      <nav className="ef-section ef-related" aria-label={t.relatedTitle}><h2>{t.relatedTitle}</h2><div>{related.map((slug, i) => <a key={slug} href={`/services/${slug}?lang=${lang}`}>{t.related[i]}<ArrowUpRight size={16} aria-hidden="true"/></a>)}</div></nav>
    </main>
    <Footer lang={lang} imageNotice={false}/>
    <div className="ef-mobile-actions" aria-label={sw ? "Wasiliana kuhusu uzio" : "Electric fence enquiry actions"}><a href={links.whatsapp}>WhatsApp ↗</a><a href={links.survey}>{t.survey} ↗</a></div>
  </>;
}
