/** Manufacturer references, not BM inventory records. Sources reviewed 20 November 2026. */
export const paEquipment = [
  {
    model: "SSA-250M",
    image: "ssa-250m",
    source:
      "https://www.ahujaradios.com/mixer-amplifiers/high-wattage-pa-mixer-amplifiers/ssa-250m-2.html",
    en: {
      type: "Mixer amplifier",
      detail:
        "6 microphone and 2 auxiliary inputs. 4/8 Ω and 70/100 V outputs. Rated 250 W RMS at 10% THD; usable level depends on the design.",
    },
    sw: {
      type: "Amplifaya yenye miksa",
      detail:
        "Ingizo 6 za vipaza sauti na 2 za AUX. Matokeo ya 4/8 Ω na 70/100 V. Uwezo uliotajwa ni 250 W RMS kwa 10% THD; kiwango cha matumizi hupangwa kwa mfumo.",
    },
  },
  {
    model: "ACM-96CH",
    image: "acm-96ch",
    source:
      "https://www.ahujaradios.com/microphones/paging-microphones-series/acm-96ch.html",
    en: {
      type: "Desktop paging microphone",
      detail:
        "Single-zone announcements with a multi-tone chime. Microphone input and cable routing are checked with the chosen amplifier.",
    },
    sw: {
      type: "Kipaza sauti cha mezani kwa matangazo",
      detail:
        "Matangazo ya eneo moja na sauti ya kengele ya kuanzia. Ingizo la kipaza sauti na njia ya kebo huhakikiwa kwa amplifaya iliyochaguliwa.",
    },
  },
  {
    model: "CS-8151T",
    image: "cs-8151t",
    source:
      "https://www.ahujaradios.com/speakers/pa-ceiling-speakers/cs-8151t.html",
    en: {
      type: "Ceiling speaker",
      detail:
        "15 W RMS, 100 V line speaker with 15/10/5 W taps. Intended for flush ceiling mounting; quantity and tap choice follow coverage and load calculations.",
    },
    sw: {
      type: "Spika ya darini",
      detail:
        "Spika ya 15 W RMS kwa laini ya 100 V, yenye chaguo za 15/10/5 W. Idadi na chaguo la W hupangwa kwa eneo la kusikika na jumla ya mzigo.",
    },
  },
  {
    model: "SCM-15 / SCM-15T",
    image: "scm-15t",
    source:
      "https://www.ahujaradios.com/speakers/pa-column-speakers/scm-15-15t.html",
    en: {
      type: "Column speaker family",
      detail:
        "10 W RMS. SCM-15 is 8 Ω; SCM-15T is the 100 V version with 10/7.5/5 W taps. Weather resistance is for sheltered placement under roof eaves.",
    },
    sw: {
      type: "Familia ya spika za nguzo",
      detail:
        "Uwezo wa 10 W RMS. SCM-15 ni 8 Ω; SCM-15T ni toleo la 100 V lenye 10/7.5/5 W. Uwekaji wa nje uwe sehemu iliyokingwa chini ya paa.",
    },
  },
  {
    model: "UHC XT Series",
    image: "uhc-xt-series",
    source:
      "https://www.ahujaradios.com/speakers/pa-horn-speakers/uhc-series-2.html",
    en: {
      type: "100 V horn speaker family",
      detail:
        "UHC-15XT, UHC-25XT and UHC-30XT are 15/25/30 W RMS transformer models. Select the exact model, tap and outdoor mounting arrangement for the site.",
    },
    sw: {
      type: "Familia ya spika za honi za 100 V",
      detail:
        "UHC-15XT, UHC-25XT na UHC-30XT zina 15/25/30 W RMS na transfoma. Modeli, chaguo la W na namna ya kufunga nje huchaguliwa kwa eneo.",
    },
  },
  {
    model: "APM-201RM",
    image: "apm-201rm",
    source:
      "https://www.ahujaradios.com/paging-system-2/paging-system/apm-201rm.html",
    en: {
      type: "Zoned paging console",
      detail:
        "Pairs with one APM-202CU control unit for 6 zones, or two for 12 zones. Receives 24 V DC from that controller; amplifier, wiring and zone loads are separate design requirements.",
    },
    sw: {
      type: "Konsoli ya matangazo kwa maeneo",
      detail:
        "Hutumia kidhibiti kimoja cha APM-202CU kwa maeneo 6 au viwili kwa maeneo 12. Hupata 24 V DC kutoka kwenye kidhibiti; amplifaya, nyaya na mizigo ya maeneo hupangwa tofauti.",
    },
  },
] as const;

export const paApplications = [
  {
    en: "Schools & classrooms",
    sw: "Shule na madarasa",
    detailEn: "Assemblies, classrooms and announcements to selected areas.",
    detailSw: "Mikusanyiko, madarasa na matangazo kwa maeneo yaliyochaguliwa.",
  },
  {
    en: "Meetings & conference halls",
    sw: "Mikutano na kumbi",
    detailEn:
      "Clear speech, appropriate microphones and controlled sound levels.",
    detailSw:
      "Sauti inayoeleweka, vipaza sauti vinavyofaa na viwango vinavyodhibitiwa.",
  },
  {
    en: "Hotels & lodges",
    sw: "Hoteli na lodge",
    detailEn: "Reception paging and background sound separated where required.",
    detailSw:
      "Matangazo ya mapokezi na muziki wa nyuma vikitenganishwa panapohitajika.",
  },
  {
    en: "Places of worship",
    sw: "Maeneo ya ibada",
    detailEn:
      "Speech and sound planned around room acoustics and the congregation.",
    detailSw:
      "Sauti ikipangwa kwa mwangwi wa jengo na sehemu wanapokaa waumini.",
  },
  {
    en: "Commercial paging",
    sw: "Matangazo ya biashara",
    detailEn: "Announcements for shops, workplaces and shared premises.",
    detailSw: "Matangazo kwa maduka, maeneo ya kazi na majengo ya pamoja.",
  },
] as const;
