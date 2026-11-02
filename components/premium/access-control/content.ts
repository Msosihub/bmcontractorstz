import type { Localized } from "@/lib/catalogue/types";
export const t = (en: string, sw: string): Localized => ({ en, sw });
export const paths = [
  {
    id: "attendance",
    title: t("A reliable daily check-in.", "Mahudhurio ya kila siku."),
    label: t("I need an attendance machine", "Nahitaji mashine ya mahudhurio"),
    body: t(
      "Fingerprint, face, card or PIN: compare familiar K40 Pro and MB terminals against your team and reporting needs.",
      "Alama za vidole, uso, kadi au PIN: linganisha K40 Pro na MB kulingana na wafanyakazi na ripoti unazohitaji.",
    ),
    image: "mb360",
    link: "/services/access-control/time-attendance",
  },
  {
    id: "software",
    title: t("Turn records into decisions.", "Rekodi zisaidie maamuzi."),
    label: t(
      "I need complete attendance software",
      "Nahitaji mfumo kamili wa mahudhurio",
    ),
    body: t(
      "BioTime, supported terminals, shifts, manager reports and training—with licensing and responsibilities clearly scoped.",
      "BioTime, mashine zinazooana, zamu, ripoti na mafunzo; leseni na wajibu vinaainishwa wazi.",
    ),
    image: "biotime-dashboard",
    link: "/services/access-control/time-attendance#biotime",
  },
  {
    id: "doors",
    title: t("A door that knows who enters.", "Mlango wenye ruhusa sahihi."),
    label: t(
      "I want fingerprint / PIN door access",
      "Nahitaji mlango wa fingerprint / PIN",
    ),
    body: t(
      "A terminal is only one part. Plan the lock, exit button, emergency release, power and safe installation together.",
      "Terminal ni sehemu moja. Panga kufuli, kitufe cha kutoka, ufunguaji wa dharura, umeme na ufungaji salama pamoja.",
    ),
    image: "f18-pro",
    link: "#doors",
  },
  {
    id: "controllers",
    title: t(
      "One building. Clear permissions.",
      "Jengo moja. Ruhusa zilizo wazi.",
    ),
    label: t(
      "I need multiple controlled doors",
      "Nahitaji kudhibiti milango mingi",
    ),
    body: t(
      "Protected controllers, compatible readers, access levels and event review for offices and institutions.",
      "Controllers zilizolindwa, readers zinazooana, viwango vya ruhusa na ukaguzi wa matukio kwa ofisi na taasisi.",
    ),
    image: "inbio-pro-plus",
    link: "#doors",
  },
  {
    id: "locks",
    title: t("A thoughtful welcome.", "Mapokezi yenye mpangilio."),
    label: t(
      "I need hotel or smart locks",
      "Nahitaji makufuli ya hoteli au smart locks",
    ),
    body: t(
      "Guest cards, suitable door hardware and supported hotel management; home app locks are a different ecosystem.",
      "Kadi za wageni, vifaa vinavyofaa mlango na usimamizi wa hoteli unaooana; makufuli ya app ya nyumbani yana mfumo tofauti.",
    ),
    image: "lh4000",
    link: "/services/access-control/smart-locks",
  },
  {
    id: "support",
    title: t(
      "Make the existing system work.",
      "Mfumo uliopo ufanye kazi vizuri.",
    ),
    label: t(
      "I need repairs, setup or support",
      "Nahitaji matengenezo, usanidi au msaada",
    ),
    body: t(
      "Diagnosis, authorized backup, firmware and licence checks, reconfiguration and a clear handover.",
      "Uchunguzi, backup yenye ruhusa, ukaguzi wa firmware na leseni, usanidi na makabidhiano yaliyo wazi.",
    ),
    image: "inbio-classic",
    link: "#support",
  },
];
export const software = [
  {
    name: "ZKBio Time 9.5",
    mode: t("Locally hosted • attendance", "Seva yako • mahudhurio"),
    purpose: t(
      "Schedules, attendance rules and management reports for compatible terminals.",
      "Zamu, kanuni za mahudhurio na ripoti kwa vifaa vinavyoendana.",
    ),
    checks: t(
      "Verify the regional 9.5 build, TA PUSH hardware list, staff/device limits and licence. Payroll export/API is a scoped integration—not automatic payroll processing.",
      "Hakiki build ya 9.5, orodha ya TA PUSH, idadi ya wafanyakazi/vifaa na leseni. Export/API ya mishahara inaainishwa; programu haifanyi malipo ya mishahara yenyewe.",
    ),
    source: "https://www.zkteco-ea.com/biotime9-5/",
  },
  {
    name: "ZKBioTime Cloud",
    mode: t("Cloud subscription • attendance", "Usajili wa cloud • mahudhurio"),
    purpose: t(
      "Multi-location attendance with supported mobile and device connectivity.",
      "Mahudhurio ya matawi mengi kupitia simu na vifaa vinavyoungwa mkono.",
    ),
    checks: t(
      "Confirm Tanzania availability, supported devices, mobile/geofencing plan, hosting region, subscription, Internet and data-processing terms. Cloud is not required for every small office.",
      "Thibitisha huduma Tanzania, vifaa, mpango wa simu/geofencing, eneo la seva, ada, intaneti na masharti ya data. Si kila ofisi ndogo inahitaji cloud.",
    ),
    source: "https://www.zkteco.com/en/ZKBioTimeCloud/ZKBio_Time_Cloud",
  },
  {
    name: "ZKBio CVAccess",
    mode: t(
      "Locally hosted • access & selected modules",
      "Seva yako • access na moduli husika",
    ),
    purpose: t(
      "Web-based management for suitable small and medium security installations.",
      "Usimamizi kupitia kivinjari kwa mifumo midogo na ya kati inayofaa.",
    ),
    checks: t(
      "Match AC PUSH/controller compatibility and the licensed access, attendance or video modules. A supported module does not make every terminal compatible.",
      "Linganisha AC PUSH/controller na moduli zenye leseni za access, mahudhurio au video. Moduli iliyopo haimaanishi kila terminal inaoana.",
    ),
    source: "https://www.zkteco.com/en/ZKBio_CVAccess/ZKBio_CVAccess",
  },
  {
    name: "ZKBio CVSecurity",
    mode: t(
      "Locally hosted • integrated security",
      "Seva yako • mifumo jumuishi ya usalama",
    ),
    purpose: t(
      "A broader physical-security platform for advanced, multi-system requirements.",
      "Jukwaa pana la usalama kwa mahitaji ya mifumo kadhaa na usimamizi wa kina.",
    ),
    checks: t(
      "Scope servers, cybersecurity, approved controllers, modules and licences. Confirm each API, visitor or third-party integration; do not assume it is included.",
      "Ainisha seva, usalama wa mtandao, controllers, moduli na leseni. Thibitisha API, wageni na kila uunganishaji wa nje; si vyote vimejumuishwa.",
    ),
    source: "https://www.zkteco.com/en/ZKBio_CVSecurity/ZKBio_CVSecurity",
  },
  {
    name: "ZKBio HLMS / SmartLock",
    mode: t(
      "Hotel lock ecosystem • version-specific",
      "Mfumo wa makufuli ya hoteli • toleo husika",
    ),
    purpose: t(
      "Reception card issuing and room-lock administration within the matched hotel ecosystem.",
      "Kutengeneza kadi mapokezini na kusimamia makufuli ya vyumba katika mfumo unaoendana.",
    ),
    checks: t(
      "Verify lock model/firmware, encoder, cards and exact HLMS or CVSecurity SmartLock release. PMS connection needs separately confirmed support/licensing. ZSmart home locks are a separate ecosystem.",
      "Hakiki modeli/firmware, encoder, kadi na toleo halisi la HLMS au CVSecurity SmartLock. PMS inahitaji ulinganifu na leseni vilivyothibitishwa. ZSmart ya nyumbani ni mfumo tofauti.",
    ),
    source:
      "https://www.zkteco.com/en/ZKBioCVSecuritySmartLock/ZKBio_CVSecurity_SmartLock",
  },
];
export const faqs = [
  [
    t(
      "Can one device record attendance and open a door?",
      "Kifaa kimoja kinaweza kurekodi mahudhurio na kufungua mlango?",
    ),
    t(
      "Some models support both, but the firmware, software, wiring and configured rules must match. We specify the attendance outcome separately from door permissions.",
      "Baadhi zinaweza, lakini firmware, programu, nyaya na kanuni lazima ziendane. Mahitaji ya mahudhurio huainishwa tofauti na ruhusa za kufungua mlango.",
    ),
  ],
  [
    t(
      "Do we need Internet all the time?",
      "Lazima tuwe na intaneti muda wote?",
    ),
    t(
      "Local door decisions and supported terminal logs can operate without constant Internet. Cloud synchronization, remote administration and app features need suitable connectivity. Confirm offline behaviour for the exact system.",
      "Udhibiti wa karibu wa mlango na kumbukumbu za baadhi ya vifaa vinaweza kufanya kazi bila intaneti ya muda wote. Cloud, usimamizi wa mbali na app huhitaji mtandao. Hakiki tabia ya kifaa husika mtandao ukikatika.",
    ),
  ],
  [
    t(
      "Can you support our existing ZKTeco installation?",
      "Mnaweza kuhudumia mfumo wetu wa ZKTeco uliopo?",
    ),
    t(
      "Start with model, firmware and software version—not biometric exports or passwords. We assess configuration, power, locks, readers and supported upgrades before quoting.",
      "Tuanze na modeli, firmware na toleo la programu; usitume taarifa za biometriki au nywila. Tunakagua mipangilio, umeme, makufuli na readers kabla ya nukuu.",
    ),
  ],
  [
    t("What happens when power fails?", "Umeme ukikatika itakuwaje?"),
    t(
      "The chosen lock, controller and backup supply determine behaviour. We assess emergency release and fire-alarm interfaces where relevant. Battery runtime and fail-safe/fail-secure choices are site-specific.",
      "Aina ya kufuli, controller na umeme wa akiba huamua kinachotokea. Tunatathmini njia ya dharura na uhusiano na fire alarm inapohitajika. Muda wa betri na hali ya kufuli huchaguliwa kwa eneo husika.",
    ),
  ],
  [
    t(
      "How much does a complete system cost?",
      "Mfumo kamili unagharimu kiasi gani?",
    ),
    t(
      "Door quantity and material, users, credential types, cabling, power, software licences, hosting and training shape the quotation. Ask for equipment-only or a complete installed scope. No unverified price is advertised.",
      "Idadi na aina ya milango, watumiaji, utambulisho, nyaya, umeme, leseni, seva na mafunzo huamua nukuu. Omba vifaa pekee au mfumo uliofungwa. Bei isiyothibitishwa haitangazwi.",
    ),
  ],
  [
    t(
      "Must everyone register a fingerprint?",
      "Kila mtu lazima asajili alama za vidole?",
    ),
    t(
      "No. Choose appropriate supported cards/PINs and accessibility options alongside a lawful, proportionate biometric policy. Inform staff and define access, retention and deletion. Do not default to enrolling children.",
      "Hapana. Chagua kadi/PIN na njia zinazofikika pamoja na sera halali na inayofaa ya biometriki. Waeleze wafanyakazi na panga ufikiaji, uhifadhi na ufutaji wa taarifa. Usianze kwa kudhani watoto wote watasajiliwa.",
    ),
  ],
];
