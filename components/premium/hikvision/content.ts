export const solutions = [
  {
    id: "video",
    category: "video",
    title: {
      en: "CCTV & intelligent surveillance",
      sw: "CCTV na ufuatiliaji mahiri",
    },
    intro: {
      en: "See activity at gates, reception areas and loading bays. Plan 4MP IP coverage around the detail needed in each view, night lighting, storage duration and power outages.",
      sw: "Fuatilia shughuli kwenye mageti, mapokezi na maeneo ya kupakia mizigo. Panga kamera za IP za 4MP kulingana na undani unaohitajika kwenye kila eneo, mwanga wa usiku, muda wa kuhifadhi video na kukatika kwa umeme.",
    },
    equipment: {
      en: "Compare ColorVu hybrid-light cameras and AcuSense recorders. Wi-Fi needs reliable coverage and local power. AOV SolarVu 4G can suit remote points after checking LTE bands, data, shade, battery and recording mode.",
      sw: "Linganisha kamera za ColorVu zenye mwanga mseto na virekodi vya AcuSense. Wi-Fi inahitaji mawimbi imara na umeme karibu. AOV SolarVu 4G inaweza kufaa mbali baada ya kuhakiki masafa ya LTE, kifurushi cha data, kivuli, betri na namna ya kurekodi.",
    },
  },

  {
    id: "access",
    category: "access",
    title: {
      en: "Access control & attendance",
      sw: "Udhibiti wa milango na mahudhurio",
    },
    intro: {
      en: "Give staff access to the right rooms and track shifts from reliable records. Useful at a tour office, staff entrance, school administration block or restricted hospital area.",
      sw: "Wape wafanyakazi ruhusa za kuingia katika vyumba vinavyowahusu, na fuatilia zamu kwa kutumia rekodi za mahudhurio. Inafaa kwa ofisi za utalii, milango ya wafanyakazi, ofisi za shule na maeneo ya hospitali yenye udhibiti wa kuingia.",
    },
    equipment: {
      en: "MinMoe terminals, card readers, controllers, lock power and exit hardware. HikCentral Access Control can manage supported doors, attendance and intercom devices. Agree shift rules, reporting and who can see records before commissioning.",
      sw: "Vifaa vya MinMoe, visoma kadi, vidhibiti vya milango, umeme wa makufuli na vifaa vya kutokea. HikCentral Access Control husimamia vifaa vinavyooana vya milango, mahudhurio na intercom. Kubaliana kuhusu zamu, ripoti na ruhusa za kuona rekodi kabla ya kukabidhi mfumo.",
    },
  },
  {
    id: "intercom",
    category: "intercom",
    title: {
      en: "Video intercom & smart entrances",
      sw: "Intercom yenye kamera",
    },
    intro: {
      en: "Let residents or reception staff see and speak to visitors before opening the gate or door. Plan around who answers at a home, apartment entrance, office or lodge reception.",
      sw: "Wakazi au wahudumu wa mapokezi wanaweza kumuona na kuzungumza na mgeni kabla ya kufungua geti au mlango. Panga nani atapokea simu nyumbani, kwenye jengo la vyumba, ofisini au mapokezi ya lodge.",
    },
    equipment: {
      en: "For new wiring, consider an IP door station and paired indoor monitor. A matched two-wire kit may suit an upgrade after cable and distance checks. Apartment call routing and lock release are designed separately from a single-villa kit.",
      sw: "Kwa nyaya mpya, zingatia kifaa cha nje cha IP na skrini ya ndani inayooana nacho. Seti ya nyaya mbili inaweza kufaa kwenye mfumo wa zamani baada ya kukagua nyaya na umbali. Mfumo wa kuita kila chumba na kufungua mlango kwenye jengo la vyumba hupangwa tofauti na seti ya nyumba moja.",
    },
  },
  {
    id: "intrusion",
    category: "intrusion",
    title: {
      en: "AX PRO intrusion alarms",
      sw: "Kengele za uvamizi za AX PRO",
    },
    intro: {
      en: "Alert the designated person when a protected shop, stockroom, office or lodge service area is entered after hours. Decide who responds and which areas should stay armed.",
      sw: "Mpe mhusika taarifa mtu anapoingia kwenye duka, stoo, ofisi au eneo la huduma la lodge nje ya saa za kazi. Amua nani atashughulikia tahadhari na maeneo yapi yaendelee kulindwa.",
    },
    equipment: {
      en: "Pair a regional AX PRO panel with compatible door contacts, motion detectors and sounders. Check radio coverage and backup communication on site, then test arming, power loss and the agreed alert process.",
      sw: "Unganisha paneli ya AX PRO ya toleo linalofaa eneo lako na vihisi vya milango, vihisi vya mwendo na ving’ora vinavyooana. Hakiki mawimbi na njia mbadala ya mawasiliano, kisha jaribu kuwasha ulinzi, kukatika kwa umeme na utaratibu wa kupokea tahadhari.",
    },
  },
  {
    id: "building",
    category: "software",
    title: {
      en: "Building security with HikCentral",
      sw: "Ulinzi wa majengo kwa HikCentral",
    },
    intro: {
      en: "Give a security desk a clearer view of events across a hotel, hospital campus or commercial property. Start with what the operator needs to see and do at each incident.",
      sw: "Wasaidie wahudumu wa ulinzi kufuatilia matukio katika hoteli, eneo la hospitali au jengo la biashara. Anza kwa kuainisha taarifa wanazohitaji kuona na hatua watakazochukua kila tukio linapotokea.",
    },
    equipment: {
      en: "HikCentral Professional offers licensed modules for supported devices and workflows. Verify each model, firmware, software version and licence before quoting shared video, doors, intercom or alarm events.",
      sw: "HikCentral Professional ina moduli zenye leseni kwa vifaa na kazi zinazooana. Hakiki kila modeli, firmware, toleo la programu na leseni kabla ya kutoa nukuu ya kusimamia video, milango, intercom au matukio ya kengele kwa pamoja.",
    },
  },
] as const;

export const diagram = [
  {
    name: { en: "Camera → NVR", sw: "Kamera → NVR" },
    detail: {
      en: "A compatible IP camera sends footage to its recorder.",
      sw: "Kamera ya IP inayooana hutuma video kwenye kinasa video chake.",
    },
    path: "M103 114H139V155H203",
    point: [103, 114],
    end: [203, 155],
  },
  {
    name: { en: "Reader → Controller", sw: "Kisoma kadi → Kidhibiti" },
    detail: {
      en: "A supported reader sends credential data to the door controller.",
      sw: "Kisoma kadi kinachooana hutuma taarifa za kadi kwenye kidhibiti cha mlango.",
    },
    path: "M143 239H191V212H245",
    point: [143, 239],
    end: [245, 212],
  },
  {
    name: { en: "Door station → Monitor", sw: "Kifaa cha nje → Skrini" },
    detail: {
      en: "A paired intercom calls its indoor station.",
      sw: "Intercom ya mlangoni hupigia skrini ya ndani iliyounganishwa nayo.",
    },
    path: "M466 240H409V213H349",
    point: [466, 240],
    end: [349, 213],
  },
  {
    name: { en: "Detector → AX PRO panel", sw: "Kihisi → Paneli ya AX PRO" },
    detail: {
      en: "A compatible detector reports to its own alarm panel.",
      sw: "Kihisi kinachooana hutuma taarifa kwenye paneli yake ya kengele.",
    },
    path: "M474 109H438V152H365",
    point: [474, 109],
    end: [365, 152],
  },
] as const;
