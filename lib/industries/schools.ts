import type { Language } from "@/lib/i18n/config";
export const schoolsPath = "/industries/schools";
export const schoolsMeta = {
  en: [
    "School Security & Engineering Solutions Tanzania | BM Contractors",
    "School CCTV, boarding fire alarms, electric fencing, staff attendance, Wi-Fi, PA, electrical, solar and backup power. Plan a campus assessment with BM Contractors.",
  ],
  sw: [
    "Mifumo ya Usalama na Ufundi kwa Shule | BM Contractors",
    "Ufungaji wa CCTV shuleni, tahadhari ya moto mabwenini, uzio wa umeme, mahudhurio ya wafanyakazi, mitandao na umeme. Omba tathmini ya shule yako.",
  ],
} satisfies Record<Language, [string, string]>;
/** Existing intake contract; editable school context, never a separate form/database. */
export function schoolLinks(lang: Language, scope?: string) {
  const sw = lang === "sw";
  const requirement =
    scope ||
    (sw ? "Mifumo ya shule na mabweni" : "School & boarding campus systems");
  const brief = sw
    ? `Hitaji: ${requirement}\nJina la shule / taasisi:\nEneo:\nKutwa / bweni / kutwa na bweni:\nNgazi ya shule / aina ya taasisi:\nIdadi ya majengo (takriban):\nMifumo inayohitajika:\nUfungaji mpya / uboreshaji / matengenezo:\nMaelezo ya mradi:\nNjia ya mawasiliano unayopendelea:`
    : `Requirement: ${requirement}\nSchool / institution name:\nLocation:\nDay / boarding / day and boarding:\nSchool level / institution type:\nApproximate number of buildings:\nRequired systems:\nNew installation / upgrade / maintenance:\nProject description:\nPreferred contact method:`;
  return {
    quote:
      "/contact?" + new URLSearchParams({ lang, subject: requirement, brief }),
    survey:
      "/request-site-survey?" +
      new URLSearchParams({ lang, service: requirement, brief }),
    whatsapp:
      "/whatsapp?" +
      new URLSearchParams({
        lang,
        text:
          (sw
            ? "Habari BM, naomba tathmini na makadirio: "
            : "Hello BM, please assess and quote for ") +
          requirement +
          (sw ? ". Shule na eneo: " : ". School and location: "),
      }),
    call: "tel:+255760111880",
  };
}
export const campusAreas = [
  {
    id: "gate",
    name: ["Gate & arrival", "Geti na mapokezi"],
    text: [
      "Vehicle access, visitor communication and clear entrance views, with gate safety assessed first.",
      "Udhibiti wa magari, mawasiliano ya wageni na mwonekano wa kuingilia, tukianza na usalama wa geti.",
    ],
    services: ["cctv", "gate-motors", "hikvision"],
  },
  {
    id: "classrooms",
    name: ["Classrooms & learning blocks", "Madarasa na majengo ya kujifunzia"],
    text: [
      "Lighting, classroom connectivity, PA and bells selected for audibility and teaching routines.",
      "Taa, mtandao, mfumo wa matangazo na kengele kulingana na usikivu na ratiba za masomo.",
    ],
    services: ["electrical-contracting", "networking", "pa-sound-systems"],
  },
  {
    id: "boarding",
    name: ["Dormitories & boarding", "Mabweni na makazi ya wanafunzi"],
    text: [
      "Fire detection, audible warnings, escape lighting and readiness. CCTV is kept out of private sleeping areas.",
      "Utambuzi wa moto, tahadhari zinazosikika, taa za njia za kutokea na maandalizi. CCTV haiwekwi katika sehemu binafsi za kulala.",
    ],
    services: ["fire-alarm-systems", "electrical-contracting"],
  },
  {
    id: "kitchens",
    name: ["Kitchens & dining", "Jikoni na sehemu za chakula"],
    text: [
      "Detection and extinguishers matched to heat, cooking hazards and electrical equipment; not one type for every risk.",
      "Vihisio na vizima moto huchaguliwa kwa joto, hatari za upishi na vifaa vya umeme; aina moja haifai kila hatari.",
    ],
    services: ["fire-alarm-systems", "pa-sound-systems"],
  },
  {
    id: "labs",
    name: ["Laboratories & libraries", "Maabara na maktaba"],
    text: [
      "Restricted access, appropriate fire protection, protected electrical circuits and reliable data links.",
      "Udhibiti wa kuingia, kinga ya moto inayofaa, saketi zenye ulinzi na miunganisho imara ya data.",
    ],
    services: [
      "access-control",
      "fire-alarm-systems",
      "electrical-contracting",
    ],
  },
  {
    id: "admin",
    name: ["Administration & staff", "Utawala na wafanyakazi"],
    text: [
      "Staff time attendance, office telephones, access permissions and protected ICT equipment.",
      "Mahudhurio ya wafanyakazi, simu za ofisini, ruhusa za kuingia na umeme wa akiba kwa TEHAMA.",
    ],
    services: ["access-control", "telephone-systems", "power-backup"],
  },
  {
    id: "perimeter",
    name: ["Compound & perimeter", "Kiwanja na mipaka"],
    text: [
      "Assessed electric fencing, external lighting and CCTV coverage, with warning signs and safe separation.",
      "Tathmini ya uzio wa umeme, taa za nje na eneo la CCTV, pamoja na alama za tahadhari na nafasi salama.",
    ],
    services: ["electric-fence", "cctv", "solar-street-lights"],
  },
  {
    id: "ict",
    name: ["ICT rooms & campus links", "Vyumba vya TEHAMA na mtandao wa shule"],
    text: [
      "CAT6 within buildings, suitable fibre between blocks, managed Wi-Fi and backup for the complete network.",
      "CAT6 ndani ya majengo, fibre inayofaa kati ya majengo, Wi-Fi inayosimamiwa na umeme wa akiba kwa mtandao mzima.",
    ],
    services: ["networking", "power-backup"],
  },
] as const;
