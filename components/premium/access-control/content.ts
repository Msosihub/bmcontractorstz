import type { Localized } from "@/lib/catalogue/types";
export const t = (en: string, sw: string): Localized => ({ en, sw });
export const paths = [
  {
    id: "doors",
    title: t("Control who enters.", "Dhibiti anayeingia."),
    label: t("Door access control", "Udhibiti wa kuingia mlangoni"),
    body: t(
      "From a PIN-operated office door to a managed multi-door building. Select permissions, secure the lock and keep a safe way out.",
      "Kuanzia mlango wa ofisi unaotumia PIN hadi jengo lenye milango mingi. Panga ruhusa, kufuli na njia salama ya kutoka.",
    ),
    image: "f18-pro",
    link: "#doors",
  },
  {
    id: "attendance",
    title: t("Every shift, accounted for.", "Kila zamu iwe na taarifa."),
    label: t("Staff time attendance", "Mahudhurio ya wafanyakazi"),
    body: t(
      "Fingerprint, face or card check-in, shift rules and useful reports. Attendance records do not automatically control a door.",
      "Kusajili kuingia kwa alama za vidole, uso au kadi; kupanga zamu na kupata ripoti. Kurekodi mahudhurio si kufungua mlango moja kwa moja.",
    ),
    image: "senseface-4a",
    link: "/services/access-control/time-attendance",
  },
  {
    id: "locks",
    title: t("A thoughtful welcome.", "Mapokezi yenye mpangilio."),
    label: t(
      "Smart locks & hotel access",
      "Makufuli janja na mifumo ya hoteli",
    ),
    body: t(
      "Choose a lock for the door—and an ecosystem for the people using it. Home app access and hotel guest-card management are different solutions.",
      "Chagua kufuli linalofaa mlango na mfumo unaofaa watumiaji. App ya nyumbani ni tofauti na usimamizi wa kadi za wageni wa hoteli.",
    ),
    image: "sl01-t430h",
    link: "/services/access-control/smart-locks",
  },
  {
    id: "software",
    title: t("See the whole picture.", "Simamia kwa taarifa sahihi."),
    label: t("Management software & cloud", "Programu za usimamizi na cloud"),
    body: t(
      "On-premise or cloud, attendance or security: match the platform, firmware, licences and data responsibilities before installation.",
      "Programu ya kwenye seva yako au cloud, kwa mahudhurio au usalama: linganisha vifaa, firmware, leseni na wajibu wa data kabla ya kufunga.",
    ),
    image: "inbio-pro-plus",
    link: "#software",
  },
  {
    id: "entrances",
    title: t("Keep people moving.", "Watu wapite kwa mpangilio."),
    label: t(
      "Turnstiles & entrance management",
      "Turnstiles na udhibiti wa viingilio",
    ),
    body: t(
      "Reception, factory and institutional staff entrances, with an accessible alternative lane and a considered emergency exit plan.",
      "Mapokezi, viwanda na viingilio vya wafanyakazi wa taasisi, pamoja na njia inayofikika na mpango wa kutoka dharura.",
    ),
    image: "ts2000-plus",
    link: "#entrances",
  },
  {
    id: "support",
    title: t(
      "Make it work. Keep it working.",
      "Ifanye kazi. Iendelee kufanya kazi.",
    ),
    label: t(
      "Installation, integration & maintenance",
      "Ufungaji, uunganishaji na matengenezo",
    ),
    body: t(
      "A complete scope: assessment, equipment, neat cabling, setup, user training and support for an existing or new system.",
      "Huduma yenye mpangilio: tathmini, vifaa, nyaya nadhifu, usanidi, mafunzo na msaada kwa mfumo mpya au uliopo.",
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
