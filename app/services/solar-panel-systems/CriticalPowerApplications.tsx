import Image from "next/image";
import type { Language } from "@/lib/i18n/config";

/** Server-rendered applications; existing enquiry fields carry the assessment brief. */
export function CriticalPowerApplications({ lang }: { lang: Language }) {
  const t = (en: string, sw: string) => lang === "sw" ? sw : en;
  const applications = [
    {
      id: "security", image: "/images/luxury-concepts/cctv-960.webp",
      alt: t("A discreet exterior security camera on a modern building", "Kamera ya usalama nje ya jengo la kisasa"),
      category: t("CCTV & SECURITY BACKUP", "BACKUP YA CCTV NA USALAMA"),
      title: t("Keep recording. Even when power stops.", "Umeme ukikatika, ulinzi uendelee."),
      intro: t("Protect the complete chain: cameras, NVR/DVR, PoE switches, router and access control—not just the camera.", "Linda mfumo mzima: kamera, NVR/DVR, swichi za PoE, router na udhibiti wa kuingia—si kamera pekee."),
      detail: t("Short outages or a longer night?", "Kukatika kwa muda mfupi au usiku mzima?"),
      notes: t("A suitable UPS can bridge brief outages. Longer backup needs a matched battery and charging design. Include night-time IR, PTZ and recorder demand; check DC voltages, PoE standards and the AC loads before selecting a DC/PoE or inverter-based solution.", "UPS inayofaa inaweza kusaidia umeme unapokatika kwa muda mfupi. Backup ndefu inahitaji betri na mpangilio wa kuchaji unaolingana. Hesabu matumizi ya IR usiku, PTZ na recorder; hakiki voltage za DC, viwango vya PoE na vifaa vya AC kabla ya kuchagua mfumo wa DC/PoE au inverter."),
      action: t("Plan security backup", "Panga backup ya usalama"),
      prompts: t("Cameras / recorder / PoE / router models:\nNight recording and required backup hours:", "Modeli za kamera / recorder / PoE / router:\nKurekodi usiku na saa za backup:"),
      links: [["cctv", t("CCTV installation", "Ufungaji wa CCTV")], ["power-backup", t("UPS & backup", "UPS na backup")]],
    },
    {
      id: "off-grid", image: "/images/solar-engineering/off-grid-cctv.webp",
      alt: t("An unbranded camera, solar array and closed power cabinet at a remote farm entrance", "Kamera isiyo na chapa, paneli za sola na kabati la umeme kwenye lango la shamba"),
      category: t("OFF-GRID SURVEILLANCE", "CCTV BILA UMEME WA GRIDI"),
      title: t("A remote site. A complete security network.", "Eneo la mbali. Mfumo kamili wa ulinzi."),
      intro: t("Farms, estates, construction and wildlife areas. Power the cameras, recording and communications as one system, day and night.", "Mashamba, estates, ujenzi na maeneo ya wanyamapori. Panga umeme wa kamera, kurekodi na mawasiliano kama mfumo mmoja, mchana na usiku."),
      detail: t("16 or 32 cameras? Start with the whole load.", "Kamera 16 au 32? Anza na matumizi ya mfumo mzima."),
      notes: t("A standalone solar camera is different from a multi-camera network. Assess PV, charge controller, batteries, protected distribution, NVR/storage, networking and 4G where appropriate. Camera count is not a sizing formula: allow for 24-hour demand, low-sun periods, PTZ/IR night loads, recording retention and required autonomy. Remote viewing also needs suitable coverage and a data plan.", "Kamera moja ya sola ni tofauti na mtandao wa kamera nyingi. Tathmini paneli, charge controller, betri, usambazaji wenye kinga, NVR/hifadhi, mtandao na 4G inapofaa. Idadi ya kamera pekee haitoi ukubwa wa mfumo: zingatia matumizi ya saa 24, siku zenye jua kidogo, PTZ/IR usiku, muda wa kuhifadhi rekodi na muda wa kufanya kazi bila kuchaji. Kuangalia kwa mbali kunahitaji pia mtandao unaofika eneo hilo na kifurushi cha data."),
      action: t("Assess off-grid CCTV", "Tathmini CCTV ya off-grid"),
      prompts: t("Camera count / models / PTZ / IR:\nRecording hours / retention / 4G coverage:\nDays of autonomy required:", "Idadi / modeli za kamera / PTZ / IR:\nSaa za kurekodi / muda wa hifadhi / mtandao wa 4G:\nSiku zinazohitajika bila kuchaji:"),
      links: [["cctv", t("CCTV systems", "Mifumo ya CCTV")], ["networking", t("Site networking", "Mtandao wa eneo")]],
    },
    {
      id: "ict", image: "/images/home/network-practical.webp",
      alt: t("Neatly organised network racks in a contemporary office", "Rack za mtandao zilizopangwa kwa unadhifu ofisini"),
      category: t("OFFICES, SERVERS & CRITICAL ICT", "OFISI, SEVA NA ICT MUHIMU"),
      title: t("Keep your team connected. Protect the work.", "Timu iendelee kuwasiliana. Kazi ilindwe."),
      intro: t("From an office router to a server room: separate essential circuits and design backup around the interruption your operation can tolerate.", "Kuanzia router ya ofisi hadi chumba cha seva: tenga saketi muhimu na panga backup kulingana na kukatika kunakoweza kuvumiliwa na shughuli zako."),
      detail: t("Choose continuity, not just battery capacity.", "Chagua mwendelezo wa kazi, si ukubwa wa betri tu."),
      notes: t("Line-interactive UPS units regulate voltage and typically have a transfer interval. Online double-conversion designs support more demanding continuity needs; operating mode and the complete transfer path still matter. Assess servers, switches, routers, surveillance and rack loads, extended-battery compatibility, cooling, industrial critical loads and generator-backed operation. Solar or an inverter alone does not guarantee uninterrupted power.", "UPS za line-interactive hurekebisha voltage na kwa kawaida zina muda wa kuhamisha chanzo. Online double-conversion hufaa kwa mahitaji makubwa ya mwendelezo; hali ya uendeshaji na njia nzima ya transfer bado ni muhimu. Tathmini seva, swichi, router, CCTV na vifaa vya rack, uoanifu wa betri za ziada, kupooza, mizigo muhimu ya viwandani na jenereta ya backup. Sola au inverter pekee si dhamana ya umeme bila kukatika."),
      action: t("Plan critical ICT power", "Panga umeme wa ICT muhimu"),
      prompts: t("Critical servers / rack / network loads (W or VA if known):\nPermitted interruption / shutdown requirements:", "Seva / rack / vifaa muhimu vya mtandao (W au VA ukijua):\nKukatika kunakovumiliwa / mahitaji ya kuzima salama:"),
      links: [["power-backup", t("UPS & critical backup", "UPS na backup muhimu")], ["networking", t("ICT & networking", "ICT na mitandao")], ["generators", t("Generator engineering", "Uhandisi wa jenereta")]],
    },
    {
      id: "distribution", image: "/images/electrical-contracting/substation.webp",
      alt: t("A transformer and protected electrical distribution equipment at an industrial site", "Transfoma na vifaa vya usambazaji wa umeme wenye kinga eneo la kiwanda"),
      category: t("LARGE INVERTERS & SITE DISTRIBUTION", "INVERTER KUBWA NA USAMBAZAJI WA ENEO"),
      title: t("Power beyond one building.", "Umeme kwa zaidi ya jengo moja."),
      intro: t("Three-phase hybrids, BESS and engineered site networks for estates, industry, hotels and hospitals protecting essential loads.", "Mifumo mseto ya awamu tatu, BESS na usambazaji uliosanifiwa kwa estates, viwanda, hoteli na hospitali zinazolinda mizigo muhimu."),
      detail: t("When do transformers belong in the design?", "Transfoma inahitajika lini kwenye usanifu?"),
      notes: t("Not every large inverter needs a transformer. Where distances and losses justify it, assess step-up distribution and step-down near loads. Transformers change voltage; they do not create energy. Specify distribution voltage, cable distances/losses, inverter and transformer compatibility, protection coordination, isolation, earthing and utility requirements. Generator integration requires its own controls and approved transfer design.", "Si kila inverter kubwa inahitaji transfoma. Umbali na upotevu vikihalalisha, tathmini kuongeza voltage kwa usambazaji na kuipunguza karibu na mizigo. Transfoma hubadili voltage; haiongezi nishati. Ainisha voltage, umbali na upotevu wa nyaya, uoanifu wa inverter na transfoma, uratibu wa kinga, utenganishaji, earthing na masharti ya shirika la umeme. Kuunganisha jenereta kunahitaji udhibiti na usanifu wa transfer unaofaa."),
      action: t("Discuss site-wide power", "Jadili umeme wa eneo zima"),
      prompts: t("Three-phase load / essential circuits:\nBuildings / distribution distances / voltage if known:", "Mzigo wa awamu tatu / saketi muhimu:\nMajengo / umbali wa usambazaji / voltage ukijua:"),
      links: [["electrical-contracting", t("Electrical contracting", "Ukandarasi wa umeme")], ["generators", t("Generator integration", "Uunganishaji wa jenereta")]],
    },
  ];
  const brief = (scope: string, prompts: string) => t(
    `Requirement: ${scope}\nSite / location:\nGrid: available / unreliable / absent:\nEquipment / load to support:\nRequired backup duration:\nExisting solar / battery / generator models:\n${prompts}\nEquipment only / engineering & installation:`,
    `Hitaji: ${scope}\nEneo:\nGridi: ipo / si ya uhakika / haipo:\nVifaa / mzigo wa kuwezesha:\nMuda wa backup unaohitajika:\nModeli za sola / betri / jenereta zilizopo:\n${prompts}\nVifaa pekee / usanifu na ufungaji:`,
  );
  const inquiry = (item: typeof applications[number], survey = false) => {
    const context = brief(item.category, item.prompts);
    const query: Record<string, string> = survey ? { lang, service: item.category, brief: context } : { lang, subject: `Solar / Sola — ${item.category}`.slice(0, 120), brief: context };
    return `${survey ? "/request-site-survey" : "/contact"}?${new URLSearchParams(query)}`;
  };
  return <section id="critical-applications" className="se-critical" aria-labelledby="se-critical-title">
    <div className="se-wrap">
      <div className="se-section-heading">
        <div><p className="se-eyebrow">{t("POWER WHERE IT MATTERS", "UMEME KWA SHUGHULI MUHIMU")}</p><h2 id="se-critical-title">{t("Real equipment.", "Vifaa halisi.")}<em>{t("Real priorities.", "Mahitaji ya kweli.")}</em></h2></div>
        <p>{t("Security that keeps recording. An office that keeps working. Start with what must stay on, then engineer the power around it.", "Ulinzi unaoendelea kurekodi. Ofisi inayoendelea kufanya kazi. Anza na vifaa vinavyopaswa kuendelea, kisha panga mfumo wa umeme unaovifaa.")}</p>
      </div>
      <div className="se-critical-grid">{applications.map((item, index) => <article className={`se-critical-card se-critical-${item.id}`} id={`se-critical-${item.id}`} key={item.id}>
        <div className="se-critical-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width:760px) 100vw, 46vw"/><span aria-hidden="true">0{index + 1}</span></div>
        <div className="se-critical-copy"><p className="se-eyebrow">{item.category}</p><h3>{item.title}</h3><p>{item.intro}</p>
          <details className="se-details"><summary>{item.detail}<span aria-hidden="true">+</span></summary><p>{item.notes}</p>{item.id === "distribution" && <DistributionConcept lang={lang}/>}</details>
          <div className="se-critical-actions"><a className="se-button se-button-dark" href={inquiry(item)}>{item.action} ↗</a><a className="se-critical-survey" href={inquiry(item, true)}>{t("Site assessment", "Tathmini ya eneo")} ↗</a></div>
          <div className="se-critical-related">{item.links.map(([slug, title]) => <a key={slug} href={`/services/${slug}?lang=${lang}`}>{title} ↗</a>)}</div>
        </div>
      </article>)}</div>
    </div>
  </section>;
}

function DistributionConcept({ lang }: { lang: Language }) {
  const t = (en: string, sw: string) => lang === "sw" ? sw : en;
  const stages = [t("Inverter / BESS AC output", "AC kutoka inverter / BESS"), t("Protection & distribution", "Kinga na usambazaji"), t("Step-up transformer*", "Transfoma ya kuongeza voltage*"), t("Assessed distribution route", "Njia ya usambazaji iliyotathminiwa"), t("Step-down & local protection*", "Kupunguza voltage na kinga za eneo*"), t("Essential loads", "Vifaa muhimu")];
  return <figure className="se-distribution-concept"><figcaption>{t("One assessed distribution option", "Mfano mmoja wa usambazaji unaohitaji tathmini")}</figcaption><ol>{stages.map((stage, i) => <li key={stage}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6"/></svg><span>{stage}</span>{i === 2 && <small>{t("Optional pair*", "Jozi ya hiari*")}</small>}</li>)}</ol><p>{t("*Use the transformer pair only where justified. Otherwise distribute at the designed inverter-output voltage. Concept only—not a wiring drawing; protection and isolation are required throughout. Medical no-break loads need a separate UPS/continuity design.", "*Jozi ya transfoma itumike pale inapohalalishwa. Vinginevyo sambaza kwa voltage ya inverter iliyosanifiwa. Huu ni mfano wa dhana, si mchoro wa ufungaji; kinga na utenganishaji vinahitajika kwenye mfumo mzima. Vifaa vya kitabibu visivyovumilia kukatika vinahitaji usanifu wake wa UPS na mwendelezo wa umeme.")}</p></figure>;
}
