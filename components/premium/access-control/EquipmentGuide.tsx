import type { Language } from "@/lib/i18n/config";
import { solutionLinks } from "@/components/catalogue/links";
export function DoorAccessoryGuide({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    items = [
      [
        "Lock & mounting",
        "Kufuli na mounting",
        "Magnetic lock with matching L/Z/U bracket, or a suitable electric strike. Door swing, frame, latch and emergency behavior determine the choice.",
        "Magnetic lock yenye bracket ya L/Z/U inayolingana, au electric strike inayofaa. Mwelekeo wa mlango, fremu, latch na kutoka dharura huamua uchaguzi.",
      ],
      [
        "Exit & emergency release",
        "Kutoka na ufunguaji wa dharura",
        "An everyday exit button and a separately designed emergency-release arrangement. Confirm fire-system interfaces and relevant site requirements.",
        "Kitufe cha kutoka kila siku na mpangilio tofauti wa kufungua dharura. Hakiki interface ya mfumo wa moto na mahitaji ya eneo.",
      ],
      [
        "Door status",
        "Hali ya mlango",
        "Suitable door sensor and configured held-open/forced-door monitoring where supported; a sensor does not lock a door.",
        "Sensor inayofaa na ufuatiliaji wa mlango uliobaki wazi/uliofunguliwa kwa nguvu ikiwa mfumo unaunga mkono; sensor haifungi mlango.",
      ],
      [
        "Power & battery",
        "Umeme na betri",
        "Correctly rated 12V supply where specified, protected enclosure and compatible backup battery/charger. Some terminals require 5V; never assume one supply fits everything.",
        "Supply ya 12V yenye uwezo sahihi inapohitajika, box salama na betri/charger inayooana. Baadhi ya mashine zinahitaji 5V; supply moja haifai kila kifaa.",
      ],
      [
        "Cards & key fobs",
        "Kadi na key fobs",
        "Select the exact frequency, technology and encoding supported by the reader. EM and MIFARE credentials are not interchangeable merely because both are RFID.",
        "Chagua frequency, teknolojia na encoding inayoungwa mkono na reader. EM na MIFARE si mbadala wa moja kwa moja kwa kuwa zote ni RFID.",
      ],
      [
        "Enrolment & handover",
        "Usajili na makabidhiano",
        "A supported USB scanner such as ZK9500 may be assessed for enrolment with the correct driver/software. FR1200 is a verification reader, not an enrolment scanner.",
        "USB scanner kama ZK9500 inaweza kutathminiwa kwa usajili ikiwa driver/programu vinaoana. FR1200 ni reader ya kuhakiki, si scanner ya usajili.",
      ],
    ];
  return (
    <section className="ac-section ac-sage" id="accessory-guide">
      <p className="eyebrow">
        {sw
          ? "MLANGO MZIMA, SI READER PEKEE"
          : "THE COMPLETE DOOR, NOT JUST THE READER"}
      </p>
      <div className="ac-heading">
        <h2>
          {sw
            ? "Vitu vidogo. Kazi kubwa."
            : "Small components. Essential work."}
        </h2>
        <p>
          {sw
            ? "Modeli za strike, bracket, break-glass, sensor, PSU, betri na kadi zitaainishwa baada ya tathmini. Hii ni guide ya vipengele, si orodha ya stock."
            : "Strike, bracket, break-glass, sensor, PSU, battery and credential models are selected after assessment. This is a scope guide, not a stock list."}
        </p>
      </div>
      <div className="ac-benefits">
        {items.map((r, i) => (
          <article key={r[0]}>
            <span>0{i + 1}</span>
            <div>
              <h3>{r[sw ? 1 : 0]}</h3>
              <p>{r[sw ? 3 : 2]}</p>
            </div>
          </article>
        ))}
      </div>
      <a
        className="button dark"
        href={
          solutionLinks(
            lang,
            "ZKTeco — complete door accessories and installation",
          ).quote
        }
      >
        {sw
          ? "Omba nukuu ya mlango kamili"
          : "Quote a complete door installation"}{" "}
        ↗
      </a>
    </section>
  );
}
export function AttendanceComparison({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const rows = [
    [
      "K40",
      "k40",
      "Basic local attendance / assessed USB reporting",
      "Mahudhurio ya ndani / ripoti ya USB iliyohakikiwa",
      "Not on the cited 2024 PUSH list; do not assume 9.5",
      "Haipo kwenye PUSH list ya 2024; usidhani 9.5",
    ],
    [
      "K40 Pro",
      "k40-pro",
      "Fingerprint/PIN with battery; card option",
      "Fingerprint/PIN na betri; chaguo la kadi",
      "Listed PUSH platforms; check firmware, ADMS and capacities",
      "PUSH platforms zilizoorodheshwa; hakiki firmware, ADMS na uwezo",
    ],
    [
      "MB360",
      "mb360",
      "Indoor face + fingerprint; selected Wi-Fi/battery options",
      "Uso + fingerprint ndani; Wi-Fi/betri kwa toleo husika",
      "Regional capacities differ; verify actual revision",
      "Uwezo hutofautiana kwa matoleo; hakiki kifaa husika",
    ],
    [
      "MB1000",
      "mb1000",
      "Face + BioID fingerprint; distinct from MB100",
      "Uso + BioID fingerprint; tofauti na MB100",
      "Listed PUSH platforms; ID/MF, firmware and licence checks",
      "PUSH platforms zilizoorodheshwa; hakiki ID/MF, firmware na leseni",
    ],
    [
      "MB10 / MB20",
      "mb20",
      "Compact hybrid attendance for small teams",
      "Mahudhurio kwa njia mchanganyiko kwa timu ndogo",
      "Not MB10-VL/MB20-VL; check platform and optional UPS",
      "Si MB10-VL/MB20-VL; hakiki platform na UPS ya hiari",
    ],
    [
      "SenseFace / SpeedFace",
      "senseface-4a",
      "Modern face and model-specific credential options",
      "Utambuzi wa uso na njia nyingine kulingana na modeli",
      "TA PUSH / AC PUSH and entry/standard generation matter",
      "TA PUSH / AC PUSH na kizazi cha entry/standard ni muhimu",
    ],
  ];
  return (
    <section className="ac-section">
      <p className="eyebrow">
        {sw ? "LINGANISHA KABLA YA KUAGIZA" : "COMPARE BEFORE YOU ORDER"}
      </p>
      <h2>
        {sw
          ? "Jina linalofahamika. Toleo lililohakikiwa."
          : "A familiar name. A verified fit."}
      </h2>
      <div
        className="rc-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={
          sw
            ? "Ulinganisho wa mashine na programu"
            : "Device and software comparison"
        }
      >
        <table>
          <caption>
            {sw
              ? "Muongozo wa matumizi; leseni na ulinganifu si ahadi ya jumla."
              : "Application guide; licensing and compatibility are not universal promises."}
          </caption>
          <thead>
            <tr>
              <th scope="col">{sw ? "Modeli" : "Model"}</th>
              <th scope="col">{sw ? "Inafaa kwa" : "Starting point"}</th>
              <th scope="col">
                {sw ? "Hakiki kabla ya nukuu" : "Check before quotation"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row">
                  <a href={`/catalogue/zkteco/${r[1]}?lang=${lang}`}>
                    {r[0]} ↗
                  </a>
                </th>
                <td>{r[sw ? 3 : 2]}</td>
                <td>{r[sw ? 5 : 4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ac-note">
        {sw
          ? "Orodha ya Afrika Mashariki ilisasishwa 27 Agosti 2024; si uthibitisho wa kila build ya sasa. Usitume biometriki za wafanyakazi ukiomba nukuu."
          : "The East African list was updated 27 August 2024; it is not approval for every current build. Do not send employee biometrics with a quotation request."}
      </p>
      <a href="https://www.zkteco-ea.com/wp-content/uploads/2024/10/BioTime-Supported-Device-List-EA.pdf">
        {sw ? "Orodha rasmi ya vifaa" : "Official supported-device list"} ↗
      </a>
    </section>
  );
}

export function SoftwareScopeMatrix({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    rows = [
      [
        "BioTime 9.5",
        "Local server / web browser",
        "Seva ya ndani / kivinjari",
        "Supported PUSH device/firmware + exact build + employee/device licence limits. BM scopes setup, shifts, reports and training.",
        "Kifaa/firmware ya PUSH + build sahihi + mipaka ya leseni ya wafanyakazi/vifaa. BM huainisha usanidi, zamu, ripoti na mafunzo.",
      ],
      [
        "BioTime Cloud",
        "Hosted subscription",
        "Usajili wa cloud",
        "Confirm Internet, supported devices, data hosting, retention, account ownership and recurring fees.",
        "Hakiki intaneti, vifaa, eneo la data, uhifadhi, mmiliki wa akaunti na ada za usajili.",
      ],
      [
        "Mobile / approvals / API / payroll",
        "Optional or separately scoped",
        "Hiari au vipengele tofauti",
        "Verify regional licence/module availability, API permissions, workflow, integration specification and acceptance tests; not included by default.",
        "Hakiki leseni/module, ruhusa za API, utaratibu wa kazi, maelezo ya uunganishaji na vipimo vya kukubali; si vitu vilivyojumuishwa kwa mazoea.",
      ],
      [
        "CVAccess / CVSecurity / HLMS",
        "Different system purposes",
        "Mifumo ya kazi tofauti",
        "Door security and hotel-lock platforms are not interchangeable with attendance software. Check lock/controller/encoder, supported modules and security updates.",
        "Programu za usalama wa milango na hoteli si mbadala wa programu ya mahudhurio. Hakiki kufuli/controller/encoder, modules na updates za usalama.",
      ],
    ];
  return (
    <section className="ac-section ac-software">
      <h2>
        {sw ? "Programu ipi, leseni ipi?" : "Which software. Which licence?"}
      </h2>
      <div
        className="rc-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={sw ? "Programu na leseni" : "Software and licensing matrix"}
      >
        <table>
          <caption>
            {sw
              ? "Mahitaji ya kuandaa nukuu — hakuna leseni au ada iliyoahidiwa."
              : "Quotation scope — no licence entitlement or fee is implied."}
          </caption>
          <thead>
            <tr>
              {(sw
                ? ["Programu / kipengele", "Uwekaji", "Lazima ithibitishwe"]
                : ["Platform / capability", "Deployment", "Must be confirmed"]
              ).map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row">{r[0]}</th>
                <td>{r[sw ? 2 : 1]}</td>
                <td>{r[sw ? 4 : 3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <a href={`/services/access-control?lang=${lang}#software`}>
          {sw
            ? "Ulinganifu na taarifa muhimu za usalama"
            : "Compatibility & important security notices"}{" "}
          ↗
        </a>
      </p>
    </section>
  );
}
