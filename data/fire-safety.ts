import type { Language } from "@/lib/i18n/config";
export const firePath = "/services/fire-alarm-systems";
export const fireMetadata: Record<Language, [string, string]> = {
  en: [
    "Fire Alarms & Fire Extinguishers Tanzania | BM Contractors",
    "Fire detection, alarm installation and maintenance assessment for schools, hotels and workplaces. ABC 6 kg / 9 kg and CO₂ 5 kg extinguisher quotations. Moshi, Arusha and projects across Tanzania.",
  ],
  sw: [
    "Mifumo ya Tahadhari ya Moto na Vizima Moto Tanzania | BM",
    "Mifumo ya kugundua na kutoa tahadhari ya moto kwa shule, hoteli na biashara. Omba bei ya vizima moto vya poda kilo 6 / 9 na CO₂ kilo 5, ufungaji na tathmini ya matengenezo.",
  ],
};
export const fireSources = {
  act: "https://oagmis.oag.go.tz/portal/acts/revised/527/download",
  regulations:
    "https://polis.parliament.go.tz/uploads/bills/1459254298-GN%20533%20THE%20FIRE%20AND%20RESCUE%20FORCE%20%28FIRE%20PRECAUTIONS%20IN%20BUILDINGS%29%20REGULATIONS_2015.pdf",
  osha: "https://oagmis.oag.go.tz/portal/acts/revised/401/download",
  amendment: "https://oagmis.oag.go.tz/portal/legislation/3806",
};
export function fireLinks(lang: Language, scope: string, product = "") {
  const sw = lang === "sw";
  const brief = sw
    ? `Hitaji: ${scope}\n${product ? `Kifaa: ${product}\n` : ""}Mahali na matumizi ya jengo:\nIdadi ya ghorofa / ukubwa wa maeneo:\nHatari husika na maeneo ya kulala / jikoni:\nMfumo na vifaa vilivyopo:\nVifaa pekee / ufungaji / tathmini ya matengenezo:`
    : `Requirement: ${scope}\n${product ? `Equipment: ${product}\n` : ""}Location and building use:\nFloors / floor areas:\nRelevant hazards and sleeping / kitchen areas:\nExisting system and equipment:\nEquipment only / installation / maintenance assessment:`;
  return {
    quote:
      "/contact?" +
      new URLSearchParams({
        lang,
        subject: `${sw ? "Usalama wa moto" : "Fire safety"} — ${scope}`.slice(
          0,
          120,
        ),
        product,
        brief,
      }),
    survey:
      "/request-site-survey?" +
      new URLSearchParams({
        lang,
        service: sw ? "Tathmini ya usalama wa moto" : "Fire safety assessment",
        product,
        brief,
      }),
    whatsapp:
      "/whatsapp?" +
      new URLSearchParams({
        text:
          (sw ? "Habari BM. Naomba makadirio: " : "Hello BM. Please quote: ") +
          scope +
          (product ? ` — ${product}` : "") +
          (sw ? ". Eneo: " : ". Location: "),
      }),
    call: "tel:+255760111880",
  };
}
export const fireScenarios = [
  {
    id: "boarding",
    image: "/images/fire-safety/boarding-assessment.webp",
    en: [
      "Schools & boarding facilities",
      "Dormitories, laboratories, classrooms and kitchens need different protection. Start with sleeping areas, clear escape routes and staff response.",
      "Plan school fire safety",
    ],
    sw: [
      "Shule na mabweni",
      "Mabweni, maabara, madarasa na majiko yana hatari tofauti. Anza na maeneo ya kulala, njia wazi za kutokea na utaratibu wa wafanyakazi.",
      "Panga usalama wa shule",
    ],
  },
  {
    id: "hotels",
    image: "/images/networking/hotel-wifi.webp",
    en: [
      "Hotels & lodges",
      "Assess guest rooms, corridors, stairs and kitchens. Alarm coverage must support a clear response, including at night.",
      "Assess a hotel or lodge",
    ],
    sw: [
      "Hoteli na lodges",
      "Tathmini vyumba vya wageni, korido, ngazi na majiko. Tahadhari isaidie hatua za haraka, hata wakati wa usiku.",
      "Tathmini hoteli au lodge",
    ],
  },
  {
    id: "health",
    image: "/images/fire-safety/healthcare.webp",
    en: [
      "Hospitals & clinics",
      "Consider patient mobility, staff procedures and continuity of care. Phased evacuation applies only where required by the approved plan.",
      "Discuss healthcare protection",
    ],
    sw: [
      "Hospitali na kliniki",
      "Zingatia uwezo wa wagonjwa kutoka, taratibu za wafanyakazi na mwendelezo wa huduma. Uokoaji kwa awamu ufuate mpango ulioidhinishwa inapohitajika.",
      "Jadili usalama wa hospitali",
    ],
  },
  {
    id: "workplaces",
    image: "/images/networking/workplace.webp",
    en: [
      "Offices & institutions",
      "Plan zones for floors, meeting spaces and electrical rooms. Server areas need equipment chosen with people and sensitive electronics in mind.",
      "Plan workplace protection",
    ],
    sw: [
      "Ofisi na taasisi",
      "Panga kanda za ghorofa, vyumba vya mikutano na vya umeme. Vifaa vya maeneo ya seva vichaguliwe kwa kuzingatia watu na elektroniki.",
      "Panga usalama wa ofisi",
    ],
  },
  {
    id: "industry",
    image: "/assets/cctv-applications/warehouse-1440.webp",
    en: [
      "Warehouses & factories",
      "High ceilings, dust, heat and stored materials influence detector choice, access for testing and extinguisher selection.",
      "Review an industrial site",
    ],
    sw: [
      "Maghala na viwanda",
      "Dari ndefu, vumbi, joto na vifaa vilivyohifadhiwa huathiri uchaguzi wa vitambuzi, ufikivu wa ukaguzi na aina ya kizima moto.",
      "Tathmini eneo la kiwanda",
    ],
  },
  {
    id: "kitchens",
    image: "/images/fire-safety/kitchen.webp",
    en: [
      "Restaurants & kitchens",
      "Cooking oils, extraction and hot processes need a specific assessment. Ordinary smoke detectors and a general-purpose extinguisher are not an automatic fit.",
      "Assess kitchen fire risks",
    ],
    sw: [
      "Migahawa na majiko",
      "Mafuta ya kupikia, mfumo wa kuvuta hewa na joto vinahitaji tathmini maalumu. Kitambuzi cha moshi na kizima moto cha matumizi ya jumla si suluhisho la kila jiko.",
      "Tathmini hatari za jikoni",
    ],
  },
] as const;
export const fireFaqs = [
  {
    en: [
      "Do I need a conventional or addressable system?",
      "A conventional panel normally identifies a zone; an addressable system can identify an individual compatible device. Building layout, response arrangements, future expansion and maintenance access determine the design—not a rule that one is always better.",
    ],
    sw: [
      "Nichague conventional au addressable?",
      "Paneli ya conventional kwa kawaida huonyesha kanda; mfumo wa addressable unaweza kutambua kifaa husika kinachooana. Mpangilio wa jengo, hatua za dharura, upanuzi na matengenezo huamua uchaguzi—si kwamba aina moja ni bora kila mahali.",
    ],
  },
  {
    en: [
      "Must every school buy 6 kg or 9 kg extinguishers?",
      "No single capacity is a universal requirement for every school or room. GN 533 Regulation 244 includes occupancy-based provisions, including 9 kg dry chemical and 5 kg CO₂ for listed occupancies. A 6 kg quotation option must not be assumed to replace a specified 9 kg unit. Confirm agent, rating, quantity and approved placement for the actual building.",
    ],
    sw: [
      "Kila shule lazima iwe na vizima moto vya kilo 6 au 9?",
      "Hakuna uzito mmoja unaotumika kwa kila shule au chumba. Kanuni 244 ya GN 533 ina masharti kulingana na matumizi ya jengo, yakiwemo poda kilo 9 na CO₂ kilo 5 kwa makundi yaliyotajwa. Chaguo la kilo 6 kwenye makadirio lisichukuliwe kuwa mbadala wa kilo 9 iliyoainishwa. Hakiki aina, uwezo, idadi na mahali pa kuweka kwa jengo husika.",
    ],
  },
  {
    en: [
      "Can I mix Hikvision and ASENWARE detectors?",
      "Do not assume compatibility. Match the exact panel, detector, call point, sounder, protocol, revision and wiring instructions. Standalone or Wi-Fi alarms and camera analytics do not automatically replace a required engineered fire-alarm system.",
    ],
    sw: [
      "Naweza kuchanganya vitambuzi vya Hikvision na ASENWARE?",
      "Usidhani vifaa vinaoana. Linganisha paneli, kitambuzi, kitufe, king’ora, protocol, toleo na maelekezo ya nyaya. Alarm inayojitegemea, ya Wi-Fi au uchanganuzi wa kamera si mbadala wa moja kwa moja wa mfumo unaohitajika wa tahadhari ya moto.",
    ],
  },
  {
    en: [
      "What if my panel already shows a fault?",
      "Request fault diagnosis with the panel model and a description of the indication. Open/short circuits, earth faults, charger issues, depleted batteries or incompatible devices require different tests. Do not silence or disconnect protection as a substitute for repair; follow the building’s agreed safety procedure.",
    ],
    sw: [
      "Paneli yangu inaonyesha hitilafu; nifanye nini?",
      "Omba uchunguzi ukiambatanisha modeli na maelezo ya kiashiria. Nyaya zilizokatika au kugusana, earth fault, chaja, betri au vifaa visivyooana huhitaji vipimo tofauti. Kuzima au kutenganisha ulinzi si mbadala wa matengenezo; fuata utaratibu wa usalama wa jengo.",
    ],
  },
  {
    en: [
      "How often should extinguishers be checked?",
      "Regulation 244(7) provides initial inspection and approximately 30-day inspections, more often when circumstances require; maintenance intervals must not exceed one year, with earlier work if inspection indicates. Recharge after use and keep service records. Follow the current applicable rules and manufacturer instructions; specialist work requires suitable competence and authorization.",
    ],
    sw: [
      "Vizima moto vikaguliwe kila baada ya muda gani?",
      "Kanuni 244(7) inaeleza ukaguzi wa awali na takribani kila siku 30, au mara nyingi zaidi kulingana na hali. Matengenezo yasizidi mwaka mmoja kati ya huduma, na yafanyike mapema ukaguzi ukibaini hitaji. Jaza tena baada ya matumizi na hifadhi rekodi. Fuata kanuni zinazotumika na maelekezo ya mtengenezaji; kazi maalumu ihitaji uwezo na ruhusa husika.",
    ],
  },
  {
    en: [
      "Does BM issue a Government Fire Safety Certificate?",
      "No. Installation and commissioning records are not government inspection certificates. Statutory inspection and certification remain with the relevant authority. Regulated servicing, recharging, pressure testing and specialist suppression are scoped against verified authorization, with appropriately authorized specialists where needed.",
    ],
    sw: [
      "BM inatoa cheti cha Serikali cha usalama wa moto?",
      "Hapana. Rekodi za ufungaji na majaribio si vyeti vya ukaguzi wa Serikali. Ukaguzi na utoaji wa cheti cha kisheria ni wa mamlaka husika. Huduma zinazodhibitiwa, ujazaji, upimaji wa shinikizo na uzimaji maalumu hupangwa baada ya kuhakiki ruhusa, kwa kushirikisha wataalamu walioidhinishwa inapohitajika.",
    ],
  },
] as const;
