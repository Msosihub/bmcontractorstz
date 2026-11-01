import { Pause, Play } from "lucide-react";
import type { Language } from "@/lib/i18n/config";
import customers from "@/data/electric-fence-customers.json";

export function FenceCustomers({ lang }: { lang: Language }) {
  const items = customers.filter(x => x.enabled && x.approved), sw = lang === "sw";
  if (!items.length) return null;
  return <section className="ef-customers" aria-labelledby="ef-customer-title">
    <div className="ef-customer-heading"><div><p className="eyebrow">{sw ? "BAADHI YA WATEJA WA BM CONTRACTORS" : "SOME OF BM CONTRACTORS’ CUSTOMERS"}</p><h2 id="ef-customer-title">{sw ? "Tunathamini imani yao." : "We value their trust."}</h2></div></div>
    <input type="checkbox" id="ef-customers-pause" className="ef-pause-input" aria-label={sw ? "Sitisha au endelea na majina ya wateja" : "Pause or resume customer names"} /><label htmlFor="ef-customers-pause" className="ef-pause-control"><span className="ef-pause-label"><Pause size={17} aria-hidden="true" /></span><span className="ef-resume-label"><Play size={17} aria-hidden="true" /></span><span className="sr-only">{sw ? "Dhibiti mwendo wa majina ya wateja" : "Control customer-name movement"}</span></label>
    <div className="ef-customer-window"><div className="ef-customer-track">{[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate || undefined} inert={duplicate || undefined}>{items.map(x => <li key={x.id}><span className="ef-customer-monogram" aria-hidden="true">{x.name.split(/\s+/).slice(0, 2).map(w => w[0]).join("")}</span><span>{x.name}</span></li>)}</ul>)}</div></div>
  </section>;
}
