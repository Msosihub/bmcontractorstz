import type { Language } from "@/lib/i18n/config";
/** Native radio interaction and useful SVG are available before/without hydration. */
export function TransferSequence({ lang }: {
    lang: Language;
}) {
    const sw = lang === "sw";
    const states = sw
        ? [["mains", "01", "Umeme mkuu", "Umeme mkuu unahudumia saketi zilizochaguliwa; jenereta iko tayari."], ["start", "02", "Umeme umekatika", "AMF hutambua tatizo na kuanzisha jenereta kwa mpangilio uliowekwa. Mzigo unasubiri chanzo kinachofaa."], ["generator", "03", "Jenereta inahudumia", "Baada ya masharti ya umeme kutimia, ATS hubadilisha chanzo. Vifaa vya interlock huzuia kuunganisha vyanzo hivi viwili pamoja."], ["return", "04", "Umeme umerudi", "Umeme mkuu ukitulia, mfumo hurudisha mzigo kwa mpangilio uliowekwa; jenereta hupoa kisha kusimama."]]
        : [["mains", "01", "Mains available", "Utility power serves the selected circuits. The generator remains on standby."], ["start", "02", "Mains failure", "AMF detects the problem and starts the set in the configured sequence. The load waits for a suitable source."], ["generator", "03", "Generator on load", "Once supply conditions are met, ATS transfers the load. Interlocking keeps these two sources from being connected together."], ["return", "04", "Mains restored", "Once utility power is stable, the system transfers back as configured; the generator cools down and stops."]];
    return (<fieldset className="ge-flow" data-bm-belt="">
      <legend>{sw ? "Chagua hatua kuona mpangilio wa kubadili umeme" : "Choose a stage to explore the transfer sequence"}</legend>
      <div className="ge-flow-states">
        {states.map(([id, n, name]) => <label key={id} htmlFor={`ge-state-${id}`}><input id={`ge-state-${id}`} name="ge-transfer-stage" type="radio" value={id} defaultChecked={id === "mains"}/><span><small>{n}</small>{name}</span></label>)}
      </div>
      <svg className="ge-flow-drawing" viewBox="0 0 620 300" role="img" aria-label={sw ? "Umeme mkuu na jenereta huingia ATS kwa njia tofauti, kisha kwenda kwenye saketi muhimu" : "Utility and generator reach ATS through separate paths, then supply essential circuits"}>
        <path className="ge-wire" d="M155 78H240V130H292M155 222H260V170H292M390 150H470"/>
        <path className="ge-current ge-utility" d="M155 78H240V130H292"/>
        <path className="ge-current ge-genset" d="M155 222H260V170H292"/>
        <path className="ge-current ge-load" d="M390 150H470"/>
        <rect x="20" y="38" width="135" height="80" rx="8"/><rect x="20" y="182" width="135" height="80" rx="8"/><rect x="292" y="105" width="98" height="90" rx="10"/><rect x="470" y="105" width="130" height="90" rx="8"/>
        <path className="ge-symbol" d="M70 58L61 82H76L69 99M60 211H113V232H60Z M69 211V204H102V211M81 215V228M86 215V228M91 215V228M314 150H328L352 131M353 150H369M505 160V130H565V173H505Z M516 140H523M535 140H542M553 140H559M516 151H523M535 151H542M553 151H559"/>
        <text x="101" y="85" textAnchor="middle">{sw ? "Mkuu" : "Utility"}</text><text x="87" y="251" textAnchor="middle">{sw ? "Jenereta" : "Generator"}</text><text x="341" y="180" textAnchor="middle">ATS</text><text x="535" y="94" textAnchor="middle">{sw ? "Saketi muhimu" : "Essential circuits"}</text>
      </svg>
      <div className="ge-flow-explanations" aria-live="off">{states.map(([id, , , text]) => <p className={`ge-explanation ge-explanation-${id}`} key={id}>{text}</p>)}</div>
      <p className="ge-flow-note">{sw ? "Mchoro wa kueleza mpangilio, si mchoro wa kufungia. Muda wa kubadili hutegemea usanifu; vifaa visivyovumilia kukatika vinaweza kuhitaji UPS." : "A sequence illustration, not a wiring drawing. Transfer time depends on the design; no-break loads may need a UPS."}</p>
    </fieldset>);
}
