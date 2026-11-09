import cctv from "@/data/cctv-equipment-references.json";
import type { ReferenceProduct } from "../reference-types";
import type { Localized } from "../types";
import media from "./media.json";

export const hikvisionCategories = {
  access: { en: "Door access", sw: "Udhibiti wa milango" },
  intercom: { en: "Video intercom", sw: "Intercom yenye kamera" },
  video: { en: "CCTV & recording", sw: "CCTV na kurekodi" },
  intrusion: { en: "Intrusion alarms", sw: "Kengele za uvamizi" },
  software: { en: "Management software", sw: "Programu za usimamizi" },
} satisfies Record<string, Localized>;

export const softwareSources = {
  access:
    "https://hsrc.hikvision.com/europe/products/software/HikCentral-Professional-series/hikcentral-access-control/",
  professional:
    "https://pro-av.hikvision.com/uk/support/download/software/hikcentral-professional-v3-0-1/",
};

const sourcePages = {
  terminal:
    "https://securitylab.hikvision.com/uk/products/Access-Control-Products/terminals/face-recognition-terminal/ds-k1t341cmfw/",
  reader:
    "https://securitylab.hikvision.com/en/products/Access-Control-Products/Readers/Pro-Series/ds-k1107am/",
  controller:
    "https://pro-av.hikvision.com/mena-en/products/Access-Control-Products/Controllers/Pro-Series/ds-k2602t/",
  ip: "https://securitylab.hikvision.com/au-en/products/Video-Intercom-Products/IP-Series/ip-kits/ds-kis603-p-d-/",
  wire: "https://pro-av.hikvision.com/mena-en/products/Video-Intercom-Products/Kits/2-wire-Kits/ds-kis702y/",
  bullet:
    "https://hctl.hikvision.com/en/products/IP-Products/Network-Cameras/value-series/ds-2cd1043g2-liu-f-/",
  turret:
    "https://securitylab.hikvision.com/mena-en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2347g2h-li-u-/",
  nvr: "https://securitylab.hikvision.com/en/products/IP-Products/Network-Video-Recorders/Pro-Series/ds-7608nxi-k2-8p-d-/",
  wifi: "https://securitylab.hikvision.com/en/products/IP-Products/wireless-cameras/wi-fi-series/ds-2cv2041g2-idw/",
  solar:
    "https://securitylab.hikvision.com/en/products/IP-Products/wireless-cameras/aov-solarvu-4g-camera/ds-2cfs04-4g/",
  alarm:
    "https://pro-av.hikvision.com/mena-en/products/Alarm-Products/wireless-intrusion-alarm/ax-pro/ds-pwa96-m-we/",
};

const bullet = cctv.products.find((product) => product.brand === "Hikvision")!;
const pair = (en: string, sw: string): Localized => ({ en, sw });
type Item = {
  slug: string;
  name: string;
  category: keyof typeof hikvisionCategories;
  summary: Localized;
  feature: Localized;
  compatibility: Localized;
  source: string;
  variants?: string[];
  related?: string[];
  document?: string;
};

const items: Item[] = [
  {
    slug: "ds-k1t341cmfw",
    name: "DS-K1T341CMFW",
    category: "access",
    source: sourcePages.terminal,
    summary: pair(
      "MinMoe terminal for controlled staff doors.",
      "Kifaa cha MinMoe kwa milango ya wafanyakazi.",
    ),
    feature: pair(
      "4.3-inch touch screen, M1 card support, built-in door controller and 2.4 GHz Wi-Fi.",
      "Skrini ya kugusa ya inchi 4.3, kadi za M1, kidhibiti cha mlango ndani ya kifaa na Wi-Fi ya 2.4 GHz.",
    ),
    compatibility: pair(
      "Confirm credential methods, firmware and attendance platform support. Design lock power and safe exit hardware for the actual door.",
      "Hakiki njia za utambulisho, firmware na programu ya mahudhurio inayooana. Panga umeme wa kufuli na vifaa vya kutoka salama kulingana na mlango.",
    ),
    document:
      "https://www.hikvision.com/content/dam/hikvision/products/S000000001/S000000080/S000000103/S000000107/OFR000141/M000059643/Data_Sheet/DS-K1T341CMFW_Datasheet_20240808.pdf",
    related: ["hikcentral-access-control"],
  },
  {
    slug: "ds-k1107am",
    name: "DS-K1107AM",
    category: "access",
    source: sourcePages.reader,
    summary: pair(
      "Wall-mounted M1 card reader for a controlled entrance.",
      "Kisoma kadi cha M1 kinachofungwa ukutani kwa mlango wenye udhibiti.",
    ),
    feature: pair(
      "13.56 MHz M1; RS-485 and Wiegand interfaces.",
      "M1 ya 13.56 MHz; miunganisho ya RS-485 na Wiegand.",
    ),
    compatibility: pair(
      "Match controller protocol, card type, wiring and firmware before ordering. A reader needs a controller.",
      "Linganisha protokali ya kidhibiti, aina ya kadi, nyaya na firmware kabla ya kuagiza. Kisoma kadi kinahitaji kidhibiti.",
    ),
    document:
      "https://assets.hikvision.com/prd/public/all/doc/m000056145/DS-K1107AM_Datasheet_20250509.pdf",
    related: ["ds-k2602t"],
  },
  {
    slug: "ds-k2602t",
    name: "DS-K2602T",
    category: "access",
    source: sourcePages.controller,
    summary: pair(
      "Two-door access controller for staff or restricted areas.",
      "Kidhibiti cha milango miwili kwa wafanyakazi au maeneo yenye ruhusa maalumu.",
    ),
    feature: pair(
      "Two-door Pro Series controller with TCP/IP. Photo shows the series enclosure.",
      "Kidhibiti cha milango miwili cha Pro Series chenye TCP/IP. Picha inaonyesha kasha la mfululizo huu.",
    ),
    compatibility: pair(
      "Confirm the exact reader interface and firmware, as well as lock loads, door contacts and emergency exit requirements.",
      "Hakiki muunganisho na firmware za kisoma kadi, mahitaji ya umeme wa makufuli, vihisi vya milango na njia za dharura.",
    ),
    related: ["ds-k1107am"],
  },
  {
    slug: "ds-kis603-p-c",
    name: "DS-KIS603-P(C)",
    category: "intercom",
    source:
      "https://assets.hikvision.com/prd/public/all/doc/m000062603/DS-KIS603-PC_Datasheet_20241012.pdf",
    summary: pair(
      "IP video intercom kit for a single villa or office entrance.",
      "Seti ya intercom ya IP yenye kamera kwa mlango mmoja wa nyumba au ofisi.",
    ),
    feature: pair(
      "DS-KV6113-WPE1(C) door station and DS-KH6320-WTE1 indoor monitor in the manufacturer’s kit reference.",
      "Rejea ya seti ya mtengenezaji ina kifaa cha mlangoni cha DS-KV6113-WPE1(C) na skrini ya ndani ya DS-KH6320-WTE1.",
    ),
    compatibility: pair(
      "Confirm the bundle revision, lock interface and calling arrangements. For apartments, plan the call directory and door stations separately.",
      "Hakiki toleo la seti, muunganisho wa kufuli na utaratibu wa kupokea simu. Kwa jengo la vyumba, panga orodha ya wakazi na vifaa vya milangoni tofauti.",
    ),
    related: ["ds-kis702y"],
  },
  {
    slug: "ds-kis702y",
    name: "DS-KIS702Y",
    category: "intercom",
    source: sourcePages.wire,
    summary: pair(
      "Matched two-wire video intercom kit for suitable upgrade sites.",
      "Seti ya intercom ya nyaya mbili kwa maeneo yanayofaa kuboresha mfumo uliopo.",
    ),
    feature: pair(
      "Two-wire Y-series door station, indoor station and distributor.",
      "Kifaa cha nje, skrini ya ndani na kisambaza muunganisho vya mfululizo wa Y wa nyaya mbili.",
    ),
    compatibility: pair(
      "Check the existing cable type, length and topology. Verify matching Y-series equipment rather than assuming that older two-wire generations will work.",
      "Kagua aina, urefu na mpangilio wa nyaya zilizopo. Hakiki vifaa vya mfululizo wa Y vinavyooana, kwa sababu vizazi vya zamani vya nyaya mbili vinaweza kutooana.",
    ),
    document:
      "https://assets.hikvision.com/prd/normal/all/doc/m000044159/DS-KIS702Y_Datasheet_20260611.pdf",
    related: ["ds-kis603-p-c"],
  },
  {
    slug: "ds-2cd1043g2-liu-f",
    name: bullet.model,
    category: "video",
    source: sourcePages.bullet,
    summary: pair(
      "4MP Smart Hybrid Light IP bullet camera already referenced in BM’s CCTV guide.",
      "Kamera ya IP aina ya bullet ya 4MP yenye Smart Hybrid Light, iliyotajwa kwenye mwongozo wa CCTV wa BM.",
    ),
    feature: pair(
      bullet.facts.join(" · "),
      "4MP · kamera ya IP aina ya bullet · PoE 802.3af · IP67",
    ),
    compatibility: pair(
      "Check lens, recorder, exact LIU or LIUF suffix and storage requirements.",
      "Hakiki lenzi, kinasa video, kiambishi sahihi cha LIU au LIUF na mahitaji ya hifadhi.",
    ),
    document: bullet.source,
    variants: ["DS-2CD1043G2-LIU", "DS-2CD1043G2-LIUF"],
    related: ["ds-7608nxi-k2-8p-d"],
  },
  {
    slug: "ds-2cd2347g2h-liu",
    name: "DS-2CD2347G2H-LIU",
    category: "video",
    source: sourcePages.turret,
    summary: pair(
      "4MP ColorVu turret for an entrance or reception approach where lighting can be planned.",
      "Kamera ya turret ya ColorVu ya 4MP kwa mlango au njia ya mapokezi inayoweza kupangiwa mwanga.",
    ),
    feature: pair(
      "4MP, Smart Hybrid Light, IP67 and built-in microphone on the LIU model.",
      "4MP, Smart Hybrid Light, IP67 na maikrofoni ndani ya modeli ya LIU.",
    ),
    compatibility: pair(
      "Confirm lens, lighting and recording settings on site. Enable audio only where appropriate and approved by the site operator.",
      "Hakiki lenzi, mwanga na mipangilio ya kurekodi katika eneo halisi. Washa sauti pale inapofaa na msimamizi wa eneo ameridhia.",
    ),
    document:
      "https://www.hikvision.com/content/dam/hikvision/products/S000000001/S000000002/S000000003/S000000025/OFR007893/M000081920/SM000052159/Data_Sheet/DS-2CD2347G2H-LIU_Datasheet_20240417.pdf",
    related: ["ds-7608nxi-k2-8p-d"],
  },
  {
    slug: "ds-7608nxi-k2-8p-d",
    name: "DS-7608NXI-K2/8P(D)",
    category: "video",
    source: sourcePages.nvr,
    summary: pair(
      "AcuSense network recorder for a compact wired IP system.",
      "Kinasa video cha mtandao cha AcuSense kwa mfumo mdogo wa kamera za IP zenye nyaya.",
    ),
    feature: pair(
      "Eight IP inputs, eight PoE ports and up to 80 Mbps incoming bandwidth on revision (D).",
      "Ingizo nane za kamera za IP, milango minane ya PoE na kipimo cha data kinachoingia hadi 80 Mbps kwa toleo (D).",
    ),
    compatibility: pair(
      "Size storage and verify camera streams, PoE budget and analytics modes. Do not substitute the unsuffixed or (E) model without rechecking specifications.",
      "Panga ukubwa wa hifadhi na hakiki mikondo ya video, uwezo wa PoE na uchambuzi wa matukio. Hakiki vipimo upya ukibadilisha kwenda modeli isiyo na kiambishi au toleo (E).",
    ),
    related: ["ds-2cd1043g2-liu-f", "ds-2cd2347g2h-liu"],
  },
  {
    slug: "ds-2cv2041g2-idw",
    name: "DS-2CV2041G2-IDW (W)",
    category: "video",
    source: sourcePages.wifi,
    document:
      "https://assets.hikvision.com/prd/public/all/doc/sm000062364/DS-2CV2041G2-IDW-W_Datasheet_20250313.pdf",
    summary: pair(
      "4MP Wi-Fi bullet option for locations with local power and a reliable wireless network.",
      "Kamera ya bullet ya 4MP yenye Wi-Fi kwa maeneo yenye umeme karibu na mawimbi imara.",
    ),
    feature: pair(
      "4MP network camera with Wi-Fi connectivity.",
      "Kamera ya mtandao ya 4MP yenye muunganisho wa Wi-Fi.",
    ),
    compatibility: pair(
      "Survey signal quality and power, then confirm recording destination, suffix and firmware.",
      "Pima ubora wa mawimbi na hakiki umeme, mahali video itahifadhiwa, kiambishi cha modeli na firmware.",
    ),
  },
  {
    slug: "ds-2cfs04-4g",
    name: "DS-2CFS04/4G",
    category: "video",
    source: sourcePages.solar,
    summary: pair(
      "4MP AOV SolarVu camera for selected remote points with solar exposure and LTE coverage.",
      "Kamera ya AOV SolarVu ya 4MP kwa maeneo yaliyo mbali yenye mwanga wa jua na mawimbi ya LTE.",
    ),
    feature: pair(
      "4G LTE, 8 W solar panel, 9000 mAh battery and AOV recording mode.",
      "4G LTE, paneli ya sola ya 8 W, betri ya 9000 mAh na hali ya kurekodi ya AOV.",
    ),
    compatibility: pair(
      "Verify the regional LTE/SIM variant with the local operator. Assess shade, panel siting, storage, battery and event recording before choosing it for a critical view.",
      "Hakiki toleo la LTE/SIM na mtoa huduma wa eneo husika. Kagua kivuli, mahali pa paneli, hifadhi, betri na namna ya kurekodi matukio kabla ya kuitumia kulinda eneo muhimu.",
    ),
    document:
      "https://assets.hikvision.com/prd/normal/all/doc/sm000091062/DS-2CFS04_4G_Datasheet_20260211.pdf",
  },
  {
    slug: "ds-pwa96-m-we",
    name: "DS-PWA96-M-WE",
    category: "intrusion",
    source: sourcePages.alarm,
    summary: pair(
      "868 MHz AX PRO intrusion panel for a planned detector and alert system.",
      "Paneli ya AX PRO ya 868 MHz kwa mfumo wenye vihisi na tahadhari zilizopangwa.",
    ),
    feature: pair(
      "Manufacturer documents up to 96 wireless zones/outputs and Ethernet, Wi-Fi and cellular communication.",
      "Mtengenezaji anaainisha hadi kanda au matokeo 96 yasiyotumia nyaya, pamoja na mawasiliano ya Ethernet, Wi-Fi na mtandao wa simu.",
    ),
    compatibility: pair(
      "Hikvision lists DS-PDP15P-EG2-WE on the applicable panel compatibility matrix. Check exact hardware, frequency and firmware against the current list before quoting.",
      "Hikvision imeorodhesha DS-PDP15P-EG2-WE kwenye jedwali la ulinganifu wa paneli husika. Hakiki vifaa, masafa na firmware kwenye orodha ya sasa kabla ya kutoa nukuu.",
    ),
    document:
      "https://www.hikvision.com/content/dam/hikvision/au/marketing-material/hilook-alarm/AX-PRO---Alarm-Detectors-and-Peripherals-Compatibility-Table.pdf",
  },
  {
    slug: "hikcentral-access-control",
    name: "HikCentral Access Control",
    category: "software",
    source: softwareSources.access,
    summary: pair(
      "Focused management for supported doors, attendance and intercom.",
      "Programu ya kusimamia milango, mahudhurio na intercom zinazooana.",
    ),
    feature: pair(
      "Manufacturer reference: v2.5.0. Define shifts, door access and operator roles before deployment.",
      "Rejea ya mtengenezaji: v2.5.0. Panga zamu, ruhusa za milango na majukumu kabla ya kusakinisha.",
    ),
    compatibility: pair(
      "Confirm the selected device list, software edition, hosting and reporting requirements. Payroll integration is separate.",
      "Hakiki orodha ya vifaa, toleo la programu, seva na mahitaji ya ripoti. Muunganisho wa mishahara hupangwa tofauti.",
    ),
    related: ["ds-k1t341cmfw", "hikcentral-professional"],
  },
  {
    slug: "hikcentral-professional",
    name: "HikCentral Professional",
    category: "software",
    source: softwareSources.professional,
    summary: pair(
      "Modular software for supported building-security workflows.",
      "Programu yenye moduli kwa kazi za ulinzi wa jengo zinazooana.",
    ),
    feature: pair(
      "Manufacturer reference: v3.0.1 with video and access control applications.",
      "Rejea ya mtengenezaji: v3.0.1 yenye programu za video na udhibiti wa milango.",
    ),
    compatibility: pair(
      "Quote only verified devices, modules and licences. Confirm intercom and alarm event support for the proposed design; test the operator workflow before handover.",
      "Toa nukuu ya vifaa, moduli na leseni zilizohakikiwa. Thibitisha utendaji wa intercom na matukio ya kengele kwa mfumo uliopangwa, kisha jaribu kazi za wahudumu kabla ya kukabidhi.",
    ),
    related: ["hikcentral-access-control"],
  },
];

const images: Record<string, { src: string }> = media;

export const hikvisionProducts: ReferenceProduct[] = items.map((item) => ({
  ...item,
  brand: "Hikvision",
  generation: item.category === "software" ? "HikCentral" : "Hikvision",
  images: images[item.slug]
    ? [{ src: images[item.slug].src, alt: item.name }]
    : [],
  specs: [
    {
      label: pair("Manufacturer reference", "Rejea ya mtengenezaji"),
      value: item.feature,
    },
  ],
  variants: item.variants ?? [item.name],
  documents: [
    {
      label: pair("Manufacturer reference", "Rejea ya mtengenezaji"),
      url: item.source,
    },
    ...(item.document
      ? [
          {
            label: pair("Technical document", "Nyaraka za kiufundi"),
            url: item.document,
          },
        ]
      : []),
  ],
  related: item.related ?? [],
  classification: "current",
  price: null,
  availability: "Quote required",
}));
