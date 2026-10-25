/**
 * Support Articles Data
 * ---------------------
 * Temporary support/help center data for BM Contractors.
 *
 * Purpose:
 * - Powers the public support/help center pages.
 * - Supports English and Swahili from the beginning.
 * - Helps customers understand services before contacting BM.
 *
 * Later:
 * - Move support articles to Neon Postgres.
 * - Manage articles from /admin/support.
 * - Add search, categories, and article images.
 */

export const supportArticles = [
  {
    slug: "how-to-request-site-survey",
    categoryEn: "Site Survey",
    categorySw: "Ukaguzi wa eneo",
    titleEn: "How to request a site survey",
    titleSw: "Jinsi ya kuomba ukaguzi wa eneo",
    summaryEn:
      "Learn what information to provide when requesting a site survey for CCTV, electric fence, gate motors or access control.",
    summarySw:
      "Taarifa za kuandaa unapoomba ukaguzi wa CCTV, uzio wa umeme, geti la kiotomatiki au udhibiti wa kuingia.",
    contentEn:
      "To request a site survey, provide your name, phone number, location, type of property and the service you need. If possible, describe the number of rooms, entrances, gates, compound size or areas you want covered. BM Contractors will contact you and guide you on the best solution.",
    contentSw:
      "Jaza jina, simu, eneo, aina ya jengo na huduma unayohitaji. Eleza idadi ya vyumba, milango, mageti na sehemu zinazohitaji ulinzi. Timu itawasiliana nawe kufafanua mahitaji na kupanga hatua inayofuata; kutuma ombi si uthibitisho wa miadi.",
  },
  {
    slug: "what-is-included-in-cctv-package",
    categoryEn: "CCTV",
    categorySw: "CCTV",
    titleEn: "What is included in a CCTV package?",
    titleSw: "Kifurushi cha CCTV kinajumuisha nini?",
    summaryEn:
      "Understand common items included in CCTV packages such as cameras, DVR/NVR, HDD, cables and installation materials.",
    summarySw:
      "Fahamu vifaa vinavyoweza kuhitajika: kamera, DVR/NVR, hifadhi ya rekodi, nyaya na vifaa vya ufungaji.",
    contentEn:
      "A CCTV package commonly includes cameras, DVR or NVR, HDD storage, power supply, connectors, cables and installation materials. The exact items depend on the site, cable distance, camera type and recording requirements.",
    contentSw:
      "Orodha inaweza kuhusisha kamera, DVR au NVR, hifadhi ya rekodi, chanzo cha umeme, viunganishi na nyaya. Vifaa halisi hutegemea eneo, umbali wa nyaya, aina ya kamera na muda wa kuhifadhi rekodi. Omba orodha yenye modeli na idadi; usidhani kila kifurushi kinajumuisha vifaa na kazi zote.",
  },
  {
    slug: "ip-vs-analog-cctv",
    categoryEn: "CCTV",
    categorySw: "CCTV",
    titleEn: "IP cameras vs analog cameras",
    titleSw: "Kamera za IP na kamera za analogi",
    summaryEn:
      "A simple explanation of the difference between IP and analog CCTV systems.",
    summarySw:
      "Maelezo ya tofauti za miunganisho na namna ya kuchagua mfumo unaofaa.",
    contentEn:
      "IP cameras use network cables and connect through NVR or network systems. Analog cameras commonly use coaxial cable and connect to DVR. The best choice depends on budget, image quality needs, distance and future expansion plans.",
    contentSw:
      "Kamera za IP huunganishwa kwenye mtandao na zinaweza kutumia NVR kurekodi. Kamera za analogi kwa kawaida hutumia nyaya za coaxial na DVR inayooana. Uchaguzi hutegemea ubora wa picha, miundombinu iliyopo, umbali na mpango wa kupanua. Modeli za kamera na kifaa cha kurekodi lazima zilinganishwe kabla ya kuchanganya vifaa.",
  },
  {
    slug: "electric-fence-basics",
    categoryEn: "Electric Fence",
    categorySw: "Uzio wa umeme",
    titleEn: "Electric fence basics",
    titleSw: "Mambo ya msingi kuhusu uzio wa umeme",
    summaryEn:
      "Learn the main parts of an electric fence system and why site planning is important.",
    summarySw: "Sehemu kuu za mfumo na umuhimu wa tathmini ya mpaka wa eneo.",
    contentEn:
      "An electric fence system can include an energizer, HT wire, insulators, brackets, earth rods, warning signs and alarm options. Proper installation and testing are important for safety and performance.",
    contentSw:
      "Mfumo unaweza kuhusisha energizer, nyaya za uzio, vihami, nguzo, mfumo wa kutuliza umeme ardhini, alama za tahadhari na kengele. Hali ya ukuta, mageti, mimea na maeneo yanayofikiwa na watu vikaguliwe kabla ya ufungaji. Ufungaji na majaribio yafanywe na fundi mwenye uwezo; usiguse nyaya ili kujaribu kama mfumo unafanya kazi.",
  },
  {
    slug: "gate-motor-service-guide",
    categoryEn: "Gate Motors",
    categorySw: "Mageti ya kiotomatiki",
    titleEn: "Gate motor service guide",
    titleSw: "Wakati wa kuomba matengenezo ya mota ya geti",
    summaryEn:
      "Know when your gate motor may need service, repair or adjustment.",
    summarySw:
      "Dalili zinazohitaji ukaguzi wa geti, mota na vifaa vya usalama.",
    contentEn:
      "A gate motor may need service if it moves slowly, makes unusual noise, fails to open, stops halfway or has remote control issues. Regular service helps reduce breakdowns and improves safety.",
    contentSw:
      "Omba ukaguzi geti likipungua mwendo, kutoa sauti isiyo ya kawaida, kusimama njiani au kutopokea rimoti vizuri. Tatizo linaweza kuwa la umeme, mota au sehemu za geti. Usilazimishe mwendo au kuongeza nguvu ya mota ili kuficha kukwama; kagua pia vihisi vya usalama na njia ya kufungua kwa mkono kwa maelekezo ya mfumo.",
  },
  {
    slug: "how-to-contact-bm-support",
    categoryEn: "Support",
    categorySw: "Msaada",
    titleEn: "How to contact BM support",
    titleSw: "Jinsi ya kuwasiliana na BM",
    summaryEn:
      "Contact BM Contractors through WhatsApp, phone, email or website forms.",
    summarySw:
      "Tumia ukurasa wa mawasiliano au fomu ya kuomba ukaguzi wa eneo.",
    contentEn:
      "For national quotations and institutional enquiries, call +255 760 111 880 or email sales@bmcontractorstz.com. Moshi office: +255 745 778 821 (also WhatsApp), 55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania. Arusha office: Mianzini, Arusha, Tanzania; +255 799 660 068 for enquiries and site visit coordination. Call to arrange a visit. You can also use the contact and site survey forms.",
    contentSw:
      "Kwa nukuu na maombi ya taasisi nchi nzima, piga +255 760 111 880 au tuma barua pepe sales@bmcontractorstz.com. Ofisi ya Moshi: +255 745 778 821 (pia WhatsApp), 55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania. Ofisi ya Arusha: Mianzini, Arusha, Tanzania; +255 799 660 068 kwa maombi na mipango ya ziara. Piga simu kupanga ziara. Unaweza pia kutumia fomu za mawasiliano na ukaguzi wa eneo. Usitume nywila au misimbo ya kuingia.",
  },
];

export function getSupportArticleBySlug(slug: string) {
  return supportArticles.find((article) => article.slug === slug);
}
