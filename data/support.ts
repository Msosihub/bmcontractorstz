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
    categorySw: "Ukaguzi wa Site",
    titleEn: "How to request a site survey",
    titleSw: "Jinsi ya kuomba ukaguzi wa site",
    summaryEn:
      "Learn what information to provide when requesting a site survey for CCTV, electric fence, gate motors or access control.",
    summarySw:
      "Jifunze taarifa za kutoa unapoomba ukaguzi wa site kwa CCTV, electric fence, gate motors au access control.",
    contentEn:
      "To request a site survey, provide your name, phone number, location, type of property and the service you need. If possible, describe the number of rooms, entrances, gates, compound size or areas you want covered. BM Contractors will contact you and guide you on the best solution.",
    contentSw:
      "Kuomba ukaguzi wa site, jaza jina, namba ya simu, location, aina ya eneo na huduma unayohitaji. Ikiwezekana, elezea idadi ya vyumba, milango, gate, ukubwa wa compound au maeneo unayotaka yawe covered. BM Contractors tutakutafuta na kukupa ushauri wa solution sahihi.",
  },
  {
    slug: "what-is-included-in-cctv-package",
    categoryEn: "CCTV",
    categorySw: "CCTV",
    titleEn: "What is included in a CCTV package?",
    titleSw: "Nini huwa ndani ya package ya CCTV?",
    summaryEn:
      "Understand common items included in CCTV packages such as cameras, DVR/NVR, HDD, cables and installation materials.",
    summarySw:
      "Fahamu vitu vinavyopatikana kwenye package ya CCTV kama cameras, DVR/NVR, HDD, cables na materials za installation.",
    contentEn:
      "A CCTV package commonly includes cameras, DVR or NVR, HDD storage, power supply, connectors, cables and installation materials. The exact items depend on the site, cable distance, camera type and recording requirements.",
    contentSw:
      "Package ya CCTV mara nyingi hujumuisha cameras, DVR au NVR, HDD, power supply, connectors, cables na materials za installation. Vifaa halisi hutegemea site, umbali wa cable, aina ya camera na mahitaji ya recording.",
  },
  {
    slug: "ip-vs-analog-cctv",
    categoryEn: "CCTV",
    categorySw: "CCTV",
    titleEn: "IP cameras vs analog cameras",
    titleSw: "Tofauti ya IP cameras na analog cameras",
    summaryEn:
      "A simple explanation of the difference between IP and analog CCTV systems.",
    summarySw: "Maelezo rahisi ya tofauti kati ya mifumo ya IP na analog CCTV.",
    contentEn:
      "IP cameras use network cables and connect through NVR or network systems. Analog cameras commonly use coaxial cable and connect to DVR. The best choice depends on budget, image quality needs, distance and future expansion plans.",
    contentSw:
      "IP cameras hutumia network cables na huunganishwa kupitia NVR au network system. Analog cameras mara nyingi hutumia coaxial cable na huunganishwa kwenye DVR. Chaguo sahihi hutegemea budget, ubora wa picha unaohitajika, umbali na mpango wa kuongeza camera baadae.",
  },
  {
    slug: "electric-fence-basics",
    categoryEn: "Electric Fence",
    categorySw: "Electric Fence",
    titleEn: "Electric fence basics",
    titleSw: "Mambo ya msingi kuhusu electric fence",
    summaryEn:
      "Learn the main parts of an electric fence system and why site planning is important.",
    summarySw:
      "Fahamu sehemu muhimu za electric fence na kwa nini kupanga site ni muhimu.",
    contentEn:
      "An electric fence system can include an energizer, HT wire, insulators, brackets, earth rods, warning signs and alarm options. Proper installation and testing are important for safety and performance.",
    contentSw:
      "Mfumo wa electric fence unaweza kuwa na energizer, HT wire, insulators, brackets, earth rods, warning signs na alarm options. Installation nzuri na testing ni muhimu kwa usalama na performance.",
  },
  {
    slug: "gate-motor-service-guide",
    categoryEn: "Gate Motors",
    categorySw: "Gate Motors",
    titleEn: "Gate motor service guide",
    titleSw: "Mwongozo wa service ya gate motor",
    summaryEn:
      "Know when your gate motor may need service, repair or adjustment.",
    summarySw:
      "Fahamu lini gate motor inaweza kuhitaji service, repair au adjustment.",
    contentEn:
      "A gate motor may need service if it moves slowly, makes unusual noise, fails to open, stops halfway or has remote control issues. Regular service helps reduce breakdowns and improves safety.",
    contentSw:
      "Gate motor inaweza kuhitaji service kama inatembea taratibu, inatoa sauti isiyo ya kawaida, haifunguki, inasimama njiani au remote haifanyi kazi vizuri. Service ya mara kwa mara husaidia kupunguza breakdown na kuongeza usalama.",
  },
  {
    slug: "how-to-contact-bm-support",
    categoryEn: "Support",
    categorySw: "Support",
    titleEn: "How to contact BM support",
    titleSw: "Jinsi ya kuwasiliana na BM support",
    summaryEn:
      "Contact BM Contractors through WhatsApp, phone, email or website forms.",
    summarySw:
      "Wasiliana na BM Contractors kupitia WhatsApp, simu, email au form za website.",
    contentEn:
      "You can contact BM Contractors through WhatsApp +255 735 111 881, phone 0745 77 88 21 / 0760 111 880, email sales@bmcontractorstz.com or by using the contact and site survey forms on this website.",
    contentSw:
      "Unaweza kuwasiliana na BM Contractors kupitia WhatsApp +255 735 111 881, simu 0745 77 88 21 / 0760 111 880, email sales@bmcontractorstz.com au kutumia contact na site survey forms kwenye website hii.",
  },
];

export function getSupportArticleBySlug(slug: string) {
  return supportArticles.find((article) => article.slug === slug);
}
