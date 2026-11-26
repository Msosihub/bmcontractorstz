import { VoiceMotion } from "./VoiceMotion";
import type { Language } from "@/lib/i18n/config";
export function CallFlow({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const options = [
    [
      "hotel",
      sw ? "Simu ya mgeni kutoka nje" : "An incoming hotel call",
      sw
        ? "Laini iliyoandaliwa huingia PBX na kufika mapokezini. Mpokeaji anaweza kuhamishia extension ya chumba kulingana na ruhusa na mpango wa simu."
        : "A configured trunk reaches the PBX and reception. The receptionist can transfer to a room extension according to the call plan and permissions.",
    ],
    [
      "office",
      sw ? "Uhamishaji kwenda idara" : "A department transfer",
      sw
        ? "Mapokezi huhamishia idara au ring group iliyoandaliwa. IVR inaweza kuongoza mpigaji pale platform na usanidi vinaporuhusu."
        : "Reception transfers to a configured department or ring group. An IVR can guide the caller where the platform and configuration support it.",
    ],
    [
      "room",
      sw ? "Chumba kwenda mapokezi" : "Room to reception",
      sw
        ? "Simu ya analogue huingia kupitia FXS na PBX kuelekea mapokezi. FXO si port ya kuunganisha simu ya kawaida ya chumbani."
        : "An analogue handset connects through FXS and the PBX to reception. FXO is not the port for an ordinary room handset.",
    ],
    [
      "hybrid",
      sw ? "Analogue kwenda IP" : "Analogue to IP",
      sw
        ? "PBX inaweza kupanga simu kati ya extension ya analogue kupitia FXS na simu ya IP kupitia LAN. Compatibility na uwezo wa gateway lazima uhakikiwe."
        : "A PBX can route between an analogue extension through FXS and an IP phone on the LAN. Gateway capacity and compatibility must be verified.",
    ],
  ];
  return (
    <section className="tp-flow-section" id="call-flow">
      <div className="tp-wrap">
        <div className="tp-section-head">
          <div>
            <p className="tp-kicker">
              {sw ? "FUATILIA SIMU" : "FOLLOW THE CONVERSATION"}
            </p>
            <h2>
              {sw ? "Simu moja." : "One call."}
              <em>{sw ? "Njia iliyo wazi." : "A clear way through."}</em>
            </h2>
          </div>
          <p>
            {sw
              ? "Kutoka mpigaji hadi anayehitajika. Chagua mfano uone kazi ya kila sehemu."
              : "From the caller to the right person. Choose a situation and see what each part does."}
          </p>
        </div>
        <VoiceMotion className="tp-flow">
          <fieldset className="tp-flow-choices">
            <legend>
              {sw ? "Chagua mfano wa simu" : "Explore a call scenario"}
            </legend>
            {options.map(([id, label], i) => (
              <label key={id}>
                <input
                  type="radio"
                  name="voice-scenario"
                  value={id}
                  id={"tp-call-" + id}
                  defaultChecked={i === 0}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className="tp-flow-diagram">
            <svg
              viewBox="0 0 1100 400"
              role="img"
              aria-labelledby="tp-flow-title tp-flow-description"
            >
              <title id="tp-flow-title">
                {sw ? "Njia za simu kupitia PBX" : "Conceptual PBX call paths"}
              </title>
              <desc id="tp-flow-description">
                {sw
                  ? "SIP trunk huingia PBX; laini ya analogue huingia kupitia FXO. Simu za IP ziko kwenye LAN na simu za analogue kupitia FXS."
                  : "A SIP trunk reaches the PBX; an analogue outside line uses FXO. IP phones use the LAN and analogue handsets use FXS."}
              </desc>
              <defs>
                <linearGradient id="tp-flow-light">
                  <stop stopColor="#73c0bb" />
                  <stop offset=".6" stopColor="#e1bc87" />
                  <stop offset="1" stopColor="#e9d4ae" />
                </linearGradient>
              </defs>
              <g className="tp-flow-base" fill="none">
                <path d="M190 90 H310 Q335 90 335 125 V170 H420" />
                <path d="M190 275 H250 M365 275 H390 Q410 275 410 240 V215 H420" />
                <path d="M590 185 H650 Q675 185 675 105 H760 M760 105 H900 M760 105 V185 H900" />
                <path d="M545 235 V305 H675 M795 305 H900" />
              </g>
              <g
                className="tp-flow-active"
                fill="none"
                stroke="url(#tp-flow-light)"
              >
                <path
                  className="path-in"
                  d="M190 90 H310 Q335 90 335 125 V170 H420"
                />
                <path
                  className="path-reception"
                  d="M590 185 H650 Q675 185 675 105 H900"
                />
                <path
                  className="path-office"
                  d="M590 185 H650 Q675 185 675 105 H760 V185 H900"
                />
                <path className="path-room" d="M545 235 V305 H900" />
              </g>
              <g className="tp-flow-box">
                <rect x="20" y="55" width="170" height="70" rx="10" />
                <rect x="20" y="240" width="170" height="70" rx="10" />
                <rect x="250" y="245" width="115" height="60" rx="10" />
                <rect x="420" y="140" width="170" height="95" rx="14" />
                <rect x="700" y="70" width="95" height="70" rx="10" />
                <rect x="675" y="275" width="120" height="60" rx="10" />
                <rect x="900" y="65" width="180" height="65" rx="10" />
                <rect x="900" y="155" width="180" height="65" rx="10" />
                <rect x="900" y="275" width="180" height="65" rx="10" />
              </g>
              <g className="tp-flow-label">
                <text x="105" y="85">
                  SIP trunk
                </text>
                <text x="105" y="106" className="tp-flow-small">
                  {sw ? "Mtoa huduma" : "Provider connection"}
                </text>
                <text x="105" y="269">
                  {sw ? "Laini ya analogue" : "Analogue outside line"}
                </text>
                <text x="105" y="291" className="tp-flow-small">
                  PSTN*
                </text>
                <text x="307" y="281">
                  FXO
                </text>
                <text x="505" y="180">
                  PBX
                </text>
                <text x="505" y="207" className="tp-flow-small">
                  {sw ? "Mpango wa simu / IVR*" : "Call plan / IVR*"}
                </text>
                <text x="747" y="99">
                  LAN
                </text>
                <text x="747" y="121" className="tp-flow-small">
                  PoE*
                </text>
                <text x="735" y="311">
                  FXS
                </text>
                <text x="990" y="104">
                  {sw ? "Mapokezi · IP" : "Reception · IP"}
                </text>
                <text x="990" y="195">
                  {sw ? "Idara · IP" : "Department · IP"}
                </text>
                <text x="990" y="314">
                  {sw ? "Chumba · analogue" : "Room · analogue"}
                </text>
              </g>
            </svg>
          </div>
          <ol
            className="tp-mobile-flow"
            aria-label={sw ? "Sehemu za mfumo" : "System building blocks"}
          >
            <li>
              SIP /{" "}
              {sw ? "laini ya nje kupitia FXO" : "outside line through FXO"}
            </li>
            <li>PBX / {sw ? "mpango wa simu" : "call plan"}</li>
            <li>{sw ? "Simu za IP kupitia LAN" : "IP phones through LAN"}</li>
            <li>
              {sw
                ? "Simu za analogue kupitia FXS"
                : "Analogue handsets through FXS"}
            </li>
          </ol>
          <div className="tp-flow-explanations" aria-live="off">
            {options.map(([id, , text]) => (
              <p className={"scenario-" + id} key={id}>
                {text}
              </p>
            ))}
          </div>
          <p className="tp-flow-note">
            {sw
              ? "Mfano wa routing, si mchoro wa kuunganisha nyaya. Laini, IVR, PoE na vipengele hutegemea vifaa, huduma na usanidi. Muunganisho huhakikiwa kwa mfumo husika. Simu za nje hutumia SIP trunk au laini ya FXO iliyosanidiwa, kulingana na ruhusa na huduma ya mtoa laini."
              : "Conceptual call routing, not a wiring or packet-flow diagram. Trunks, IVR, PoE and features depend on the equipment, provider and configuration. Compatibility is verified for the proposed system. Outside calls use the configured SIP trunk or FXO line, subject to permissions and provider service."}
          </p>
        </VoiceMotion>
      </div>
    </section>
  );
}
