import relations from "@/data/service-relations.json";
import type { Destination, NavGroup } from "./types";
/** Navigation relationships only. Database publication remains authoritative. */
const routeDestinations: Omit<Destination,"relatedServices">[] = [
  {
    "id": "home",
    "title": {
      "en": "Home",
      "sw": "Mwanzo"
    },
    "href": "/",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "services",
    "title": {
      "en": "Services",
      "sw": "Huduma"
    },
    "href": "/services",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "equipment",
    "title": {
      "en": "Equipment",
      "sw": "Vifaa"
    },
    "href": "/products",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "about",
    "title": {
      "en": "About BM",
      "sw": "Kuhusu BM"
    },
    "href": "/about",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "projects",
    "title": {
      "en": "Projects & installations",
      "sw": "Miradi na mifumo"
    },
    "href": "/projects",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "journal",
    "title": {
      "en": "Articles & guides",
      "sw": "Makala na miongozo"
    },
    "href": "/blog",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "support",
    "title": {
      "en": "Technical support",
      "sw": "Msaada wa kiufundi"
    },
    "href": "/support",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "contact",
    "title": {
      "en": "Offices & contact",
      "sw": "Ofisi na mawasiliano"
    },
    "href": "/contact",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "quotation",
    "title": {
      "en": "Request a quotation",
      "sw": "Omba nukuu"
    },
    "href": "/contact?subject=Project%20quotation",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "survey",
    "title": {
      "en": "Request a site survey",
      "sw": "Omba ukaguzi wa eneo"
    },
    "href": "/request-site-survey",
    "parentId": "home",
    "status": "published",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "public"
  },
  {
    "id": "cctv",
    "title": {
      "en": "CCTV surveillance",
      "sw": "Kamera za CCTV"
    },
    "href": "/services/cctv",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "cctv"
    ],
    "equipmentCategories": [
      "cctv",
      "recorders",
      "poe"
    ],
    "visibility": "public"
  },
  {
    "id": "electric-fence",
    "title": {
      "en": "Electric fencing",
      "sw": "Uzio wa umeme"
    },
    "href": "/services/electric-fence",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "electric-fence"
    ],
    "equipmentCategories": [
      "energizers",
      "fence-components"
    ],
    "visibility": "public"
  },
  {
    "id": "gate-motors",
    "title": {
      "en": "Gate automation",
      "sw": "Mageti ya kiotomatiki"
    },
    "href": "/services/gate-motors",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "gate-motors"
    ],
    "equipmentCategories": [
      "gate-motors",
      "automation"
    ],
    "visibility": "public"
  },
  {
    "id": "access-control",
    "title": {
      "en": "Access & attendance",
      "sw": "Udhibiti wa kuingia na mahudhurio"
    },
    "href": "/services/access-control",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "access-control"
    ],
    "equipmentCategories": [
      "access-control",
      "attendance",
      "smart-locks"
    ],
    "visibility": "public"
  },
  {
    "id": "fire-alarm-systems",
    "title": {
      "en": "Fire detection & alarms",
      "sw": "Utambuzi wa moto na alarm"
    },
    "href": "/services/fire-alarm-systems",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "fire-alarm-systems"
    ],
    "equipmentCategories": [
      "fire-detection",
      "alarms"
    ],
    "visibility": "public"
  },
  {
    "id": "video-intercom",
    "title": {
      "en": "Video intercom",
      "sw": "Intercom za video"
    },
    "href": "/services/video-intercom",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "video-intercom"
    ],
    "equipmentCategories": [
      "intercom"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-contracting",
    "title": {
      "en": "Electrical engineering",
      "sw": "Uhandisi wa umeme"
    },
    "href": "/services/electrical-contracting",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "generators",
    "title": {
      "en": "Generator engineering",
      "sw": "Uhandisi wa jenereta"
    },
    "href": "/services/generators",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "generators"
    ],
    "equipmentCategories": [
      "generators",
      "controllers",
      "ats-amf"
    ],
    "visibility": "public"
  },
  {
    "id": "solar-panel-systems",
    "title": {
      "en": "Solar engineering",
      "sw": "Uhandisi wa sola"
    },
    "href": "/services/solar-panel-systems",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "solar-panel-systems"
    ],
    "equipmentCategories": [
      "pv",
      "inverters",
      "batteries",
      "pumping"
    ],
    "visibility": "public"
  },
  {
    "id": "power-backup",
    "title": {
      "en": "Power Backup & Critical Power",
      "sw": "Umeme wa akiba na mifumo muhimu"
    },
    "href": "/services/power-backup",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "power-backup"
    ],
    "equipmentCategories": [
      "ups",
      "batteries",
      "inverters",
      "protected-distribution"
    ],
    "visibility": "public"
  },
  {
    "id": "solar-street-lights",
    "title": {
      "en": "Solar street lighting",
      "sw": "Taa za barabarani za sola"
    },
    "href": "/services/solar-street-lights",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "solar-street-lights"
    ],
    "equipmentCategories": [
      "solar-lighting"
    ],
    "visibility": "public"
  },
  {
    "id": "networking",
    "title": {
      "en": "Networks & structured cabling",
      "sw": "Mitandao na ufungaji wa nyaya"
    },
    "href": "/services/networking",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "networking"
    ],
    "equipmentCategories": [
      "networking",
      "fibre",
      "racks"
    ],
    "visibility": "public"
  },
  {
    "id": "telephone-systems",
    "title": {
      "en": "Business telephony & IP-PBX",
      "sw": "Simu za biashara na IP-PBX"
    },
    "href": "/services/telephone-systems",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "telephone-systems"
    ],
    "equipmentCategories": [
      "ip-pbx",
      "telephones"
    ],
    "visibility": "public"
  },
  {
    "id": "pa-sound-systems",
    "title": {
      "en": "PA & Sound Systems",
      "sw": "PA na mifumo ya sauti"
    },
    "href": "/services/pa-sound-systems",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "pa-sound-systems"
    ],
    "equipmentCategories": [
      "amplifiers",
      "speakers"
    ],
    "visibility": "public"
  },
  {
    "id": "air-conditioners",
    "title": {
      "en": "Air conditioning & HVAC",
      "sw": "Viyoyozi na HVAC"
    },
    "href": "/services/air-conditioners",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "air-conditioners"
    ],
    "equipmentCategories": [
      "air-conditioning"
    ],
    "visibility": "public"
  },
  {
    "id": "maintenance-support",
    "title": {
      "en": "Maintenance & technical support",
      "sw": "Matengenezo na msaada wa kiufundi"
    },
    "href": "/services/maintenance-support",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "maintenance-support"
    ],
    "equipmentCategories": [
      "assessment",
      "spares"
    ],
    "visibility": "public"
  },
  {
    "id": "institutional-procurement",
    "title": {
      "en": "Institutional procurement",
      "sw": "Ugavi kwa taasisi"
    },
    "href": "/services/institutional-procurement",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "institutional-procurement"
    ],
    "equipmentCategories": [
      "equipment",
      "materials"
    ],
    "visibility": "public"
  },
  {
    "id": "hikvision",
    "title": {
      "en": "Hikvision building security",
      "sw": "Ulinzi wa majengo wa Hikvision"
    },
    "href": "/services/hikvision",
    "parentId": "services",
    "status": "published",
    "serviceSlugs": [
      "hikvision"
    ],
    "equipmentCategories": [
      "cctv",
      "access-control",
      "intercom",
      "alarms"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-commercial",
    "title": {
      "en": "Commercial electrical contracting",
      "sw": "Ukandarasi wa umeme wa biashara"
    },
    "href": "/services/electrical-contracting#commercial",
    "parentId": "electrical-contracting",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-industrial",
    "title": {
      "en": "Industrial electrical systems",
      "sw": "Mifumo ya umeme viwandani"
    },
    "href": "/services/electrical-contracting#industrial",
    "parentId": "electrical-contracting",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-panels",
    "title": {
      "en": "Switchgear & distribution",
      "sw": "Switchgear na usambazaji"
    },
    "href": "/services/electrical-contracting#panels",
    "parentId": "electrical-contracting",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-infrastructure",
    "title": {
      "en": "Power infrastructure",
      "sw": "Miundombinu ya umeme"
    },
    "href": "/services/electrical-contracting#infrastructure",
    "parentId": "electrical-contracting",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "electrical-maintenance",
    "title": {
      "en": "Electrical maintenance",
      "sw": "Matengenezo ya umeme"
    },
    "href": "/services/electrical-contracting#reliability",
    "parentId": "electrical-contracting",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "switchgear",
      "distribution",
      "cabling"
    ],
    "visibility": "public"
  },
  {
    "id": "backup-security",
    "title": {
      "en": "Keep CCTV working through outages",
      "sw": "Endeleza CCTV umeme unapokatika"
    },
    "href": "/services/power-backup#security",
    "parentId": "power-backup",
    "status": "published",
    "serviceSlugs": [
      "power-backup"
    ],
    "equipmentCategories": [
      "ups",
      "batteries",
      "inverters",
      "protected-distribution"
    ],
    "visibility": "public"
  },
  {
    "id": "backup-office",
    "title": {
      "en": "Protect offices & server rooms",
      "sw": "Linda umeme wa ofisi na seva"
    },
    "href": "/services/power-backup#office",
    "parentId": "power-backup",
    "status": "published",
    "serviceSlugs": [
      "power-backup"
    ],
    "equipmentCategories": [
      "ups",
      "batteries",
      "inverters",
      "protected-distribution"
    ],
    "visibility": "public"
  },
  {
    "id": "backup-remote",
    "title": {
      "en": "Power a remote security site",
      "sw": "Umeme wa ulinzi maeneo ya mbali"
    },
    "href": "/services/power-backup#off-grid",
    "parentId": "power-backup",
    "status": "published",
    "serviceSlugs": [
      "power-backup"
    ],
    "equipmentCategories": [
      "ups",
      "batteries",
      "inverters",
      "protected-distribution"
    ],
    "visibility": "public"
  },
  {
    "id": "catalogue-networking",
    "title": {
      "en": "Networking equipment",
      "sw": "Vifaa vya mitandao"
    },
    "href": "/catalogue/networking",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "networking"
    ],
    "equipmentCategories": [
      "networking",
      "routers",
      "access-points",
      "switches"
    ],
    "visibility": "public"
  },
  {
    "id": "catalogue-hikvision",
    "title": {
      "en": "Hikvision",
      "sw": "Hikvision"
    },
    "href": "/catalogue/hikvision",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "hikvision"
    ],
    "equipmentCategories": [
      "cctv",
      "access-control",
      "intercom",
      "alarms"
    ],
    "visibility": "public"
  },
  {
    "id": "catalogue-zkteco",
    "title": {
      "en": "ZKTeco",
      "sw": "ZKTeco"
    },
    "href": "/catalogue/zkteco",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "access-control"
    ],
    "equipmentCategories": [
      "access-control",
      "attendance",
      "smart-locks"
    ],
    "visibility": "public"
  },
  {
    "id": "catalogue-centurion",
    "title": {
      "en": "CENTURION",
      "sw": "CENTURION"
    },
    "href": "/catalogue/centurion",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "gate-motors"
    ],
    "equipmentCategories": [
      "gate-motors",
      "automation"
    ],
    "visibility": "public"
  },
  {
    "id": "fence-equipment",
    "title": {
      "en": "Electric fence components",
      "sw": "Vifaa vya uzio wa umeme"
    },
    "href": "/services/electric-fence#ef-catalogue-title",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "electric-fence"
    ],
    "equipmentCategories": [
      "fencing"
    ],
    "visibility": "public"
  },
  {
    "id": "generator-equipment",
    "title": {
      "en": "Generators & controls",
      "sw": "Jenereta na vidhibiti"
    },
    "href": "/services/generators#equipment",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "generators"
    ],
    "equipmentCategories": [
      "generators"
    ],
    "visibility": "public"
  },
  {
    "id": "solar-equipment",
    "title": {
      "en": "Solar equipment & storage",
      "sw": "Vifaa vya sola na betri"
    },
    "href": "/services/solar-panel-systems#equipment",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "solar-panel-systems"
    ],
    "equipmentCategories": [
      "solar"
    ],
    "visibility": "public"
  },
  {
    "id": "ups-equipment",
    "title": {
      "en": "UPS, inverters & batteries",
      "sw": "UPS, inverter na betri"
    },
    "href": "/services/power-backup#equipment",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "power-backup"
    ],
    "equipmentCategories": [
      "backup"
    ],
    "visibility": "public"
  },
  {
    "id": "panel-equipment",
    "title": {
      "en": "Panels & switchgear",
      "sw": "Paneli na switchgear"
    },
    "href": "/services/electrical-contracting#panels",
    "parentId": "equipment",
    "status": "published",
    "serviceSlugs": [
      "electrical-contracting"
    ],
    "equipmentCategories": [
      "electrical"
    ],
    "visibility": "public"
  },
  {
    "id": "fibre",
    "title": {
      "en": "Fibre infrastructure",
      "sw": "Miundombinu ya fibre"
    },
    "href": "/services/networking",
    "parentId": "networking",
    "status": "published",
    "serviceSlugs": [
      "networking"
    ],
    "equipmentCategories": [
      "networking"
    ],
    "visibility": "public"
  },
  {
    "id": "future-unified-records",
    "title": {
      "en": "Unified product records",
      "sw": "Rekodi moja kwa kila bidhaa"
    },
    "parentId": "equipment",
    "status": "planned",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "roadmap"
  },
  {
    "id": "future-catalogue-filters",
    "title": {
      "en": "Unified category & manufacturer filters",
      "sw": "Vichujio vya aina na watengenezaji"
    },
    "parentId": "equipment",
    "status": "planned",
    "serviceSlugs": [],
    "equipmentCategories": [],
    "visibility": "roadmap"
  }
];
const relationMap=relations as Record<string,{related:string[]}>;
const ids=new Set(routeDestinations.map(d=>d.id));
export const destinations:Destination[]=routeDestinations.map(d=>({...d,relatedServices:[...new Set(d.serviceSlugs.flatMap(s=>relationMap[s]?.related||[]))].filter(id=>ids.has(id))}));
export const navigationGroups: NavGroup[] = [
  {
    "id": "services",
    "title": {
      "en": "Services",
      "sw": "Huduma"
    },
    "intro": {
      "en": "Specialists for the systems your building depends on.",
      "sw": "Utaalamu kwa mifumo muhimu ya jengo lako."
    },
    "directory": "services",
    "sections": [
      {
        "id": "security",
        "title": {
          "en": "Security, safety & automation",
          "sw": "Ulinzi, usalama na otomatiki"
        },
        "items": [
          {
            "destination": "cctv"
          },
          {
            "destination": "electric-fence"
          },
          {
            "destination": "gate-motors"
          },
          {
            "destination": "access-control"
          },
          {
            "destination": "fire-alarm-systems"
          },
          {
            "destination": "video-intercom"
          }
        ]
      },
      {
        "id": "electrical",
        "title": {
          "en": "Electrical engineering",
          "sw": "Uhandisi wa umeme"
        },
        "items": [
          {
            "destination": "electrical-commercial"
          },
          {
            "destination": "electrical-industrial"
          },
          {
            "destination": "electrical-panels"
          },
          {
            "destination": "electrical-infrastructure"
          },
          {
            "destination": "electrical-maintenance"
          }
        ]
      },
      {
        "id": "energy",
        "title": {
          "en": "Energy & critical power",
          "sw": "Nishati na umeme muhimu"
        },
        "items": [
          {
            "destination": "generators"
          },
          {
            "destination": "solar-panel-systems"
          },
          {
            "destination": "power-backup"
          },
          {
            "destination": "solar-street-lights"
          }
        ]
      },
      {
        "id": "ict",
        "title": {
          "en": "ICT & communications",
          "sw": "ICT na mawasiliano"
        },
        "items": [
          {
            "destination": "networking"
          },
          {
            "destination": "fibre"
          },
          {
            "destination": "telephone-systems"
          },
          {
            "destination": "pa-sound-systems"
          }
        ]
      },
      {
        "id": "facilities",
        "title": {
          "en": "Facilities & support",
          "sw": "Majengo na huduma endelevu"
        },
        "items": [
          {
            "destination": "air-conditioners"
          },
          {
            "destination": "maintenance-support"
          },
          {
            "destination": "institutional-procurement"
          }
        ]
      }
    ]
  },
  {
    "id": "solutions",
    "title": {
      "en": "Solutions",
      "sw": "Suluhisho"
    },
    "intro": {
      "en": "Start with what needs to work. We’ll help connect the right systems.",
      "sw": "Anza na unachohitaji. Tutakusaidia kuchagua mifumo inayofaa."
    },
    "directory": "services",
    "sections": [
      {
        "id": "protect",
        "title": {
          "en": "Protect your premises",
          "sw": "Linda eneo lako"
        },
        "items": [
          {
            "destination": "cctv",
            "title": {
              "en": "Protect a building or property",
              "sw": "Linda jengo au eneo"
            },
            "description": {
              "en": "CCTV, recording and practical site coverage.",
              "sw": "CCTV, kurekodi na ulinzi kulingana na eneo."
            }
          },
          {
            "destination": "access-control",
            "title": {
              "en": "Secure entrances & access",
              "sw": "Dhibiti milango na wanaoingia"
            },
            "description": {
              "en": "Doors, identity and attendance requirements.",
              "sw": "Milango, utambuzi na mahudhurio."
            }
          }
        ]
      },
      {
        "id": "continuity",
        "title": {
          "en": "Keep operations moving",
          "sw": "Endeleza shughuli"
        },
        "items": [
          {
            "destination": "backup-security"
          },
          {
            "destination": "backup-office"
          },
          {
            "destination": "backup-remote"
          }
        ]
      },
      {
        "id": "connect",
        "title": {
          "en": "Connect & equip",
          "sw": "Unganisha na wezesha"
        },
        "items": [
          {
            "destination": "networking",
            "title": {
              "en": "Connect an office, hotel or campus",
              "sw": "Unganisha ofisi, hoteli au kampasi"
            }
          },
          {
            "destination": "electrical-industrial",
            "title": {
              "en": "Equip an industrial facility",
              "sw": "Wezesha miundombinu ya kiwanda"
            }
          },
          {
            "destination": "institutional-procurement",
            "title": {
              "en": "Source project materials",
              "sw": "Pata vifaa vya mradi"
            }
          }
        ]
      }
    ],
    "feature": {
      "destination": "power-backup",
      "title": {
        "en": "A complete chain. Protected.",
        "sw": "Mfumo mzima. Umelindwa."
      },
      "image": "/images/power-backup/workplace-640.webp",
      "alt": {
        "en": "An illustrative workplace with power and network equipment",
        "sw": "Mfano wa ofisi yenye vifaa vya umeme na mtandao"
      }
    }
  },
  {
    "id": "equipment",
    "title": {
      "en": "Equipment",
      "sw": "Vifaa"
    },
    "intro": {
      "en": "Find the right equipment. Ask for supply, installation or both.",
      "sw": "Chagua vifaa vinavyofaa. Omba ugavi, ufungaji au vyote."
    },
    "directory": "equipment",
    "sections": [
      {
        "id": "brands",
        "title": {
          "en": "Explore by manufacturer",
          "sw": "Angalia kwa mtengenezaji"
        },
        "items": [
          {
            "destination": "catalogue-hikvision"
          },
          {
            "destination": "catalogue-zkteco"
          },
          {
            "destination": "catalogue-centurion"
          }
        ]
      },
      {
        "id": "security-equipment",
        "title": {
          "en": "Security & automation",
          "sw": "Ulinzi na otomatiki"
        },
        "items": [
          {
            "destination": "catalogue-hikvision",
            "title": {
              "en": "CCTV & security equipment",
              "sw": "Vifaa vya CCTV na ulinzi"
            }
          },
          {
            "destination": "fence-equipment"
          },
          {
            "destination": "catalogue-centurion",
            "title": {
              "en": "Gate motors & automation",
              "sw": "Mota za mageti na otomatiki"
            }
          },
          {
            "destination": "catalogue-zkteco",
            "title": {
              "en": "Access control devices",
              "sw": "Vifaa vya udhibiti wa kuingia"
            }
          }
        ]
      },
      {
        "id": "power-equipment",
        "title": {
          "en": "Electrical & energy",
          "sw": "Umeme na nishati"
        },
        "items": [
          {
            "destination": "panel-equipment"
          },
          {
            "destination": "generator-equipment"
          },
          {
            "destination": "solar-equipment"
          },
          {
            "destination": "ups-equipment"
          }
        ]
      },
      {
        "id": "connected-equipment",
        "title": {
          "en": "Communication equipment",
          "sw": "Vifaa vya mawasiliano"
        },
        "items": [
          {
            "destination": "catalogue-networking",
            "title": {
              "en": "Networking & fibre",
              "sw": "Mitandao na fibre"
            }
          },
          {
            "destination": "telephone-systems",
            "title": {
              "en": "Office telephones",
              "sw": "Simu za ofisi"
            }
          },
          {
            "destination": "pa-sound-systems",
            "title": {
              "en": "PA & sound equipment",
              "sw": "Vifaa vya PA na sauti"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "industries",
    "title": {
      "en": "Industries",
      "sw": "Sekta"
    },
    "intro": {
      "en": "Different places. Practical engineering for the way you work.",
      "sw": "Maeneo tofauti. Uhandisi unaoendana na shughuli zako."
    },
    "directory": "services",
    "sections": [
      {
        "id": "places",
        "title": {
          "en": "Places to live & welcome",
          "sw": "Makazi na ukarimu"
        },
        "items": [
          {
            "destination": "cctv",
            "title": {
              "en": "Homes & residential developments",
              "sw": "Nyumba na makazi"
            }
          },
          {
            "destination": "hikvision",
            "title": {
              "en": "Hotels, lodges & tourism",
              "sw": "Hoteli, lodge na utalii"
            }
          },
          {
            "destination": "access-control",
            "title": {
              "en": "Schools & universities",
              "sw": "Shule na vyuo"
            }
          }
        ]
      },
      {
        "id": "operations",
        "title": {
          "en": "Workplaces & essential operations",
          "sw": "Sehemu za kazi na huduma muhimu"
        },
        "items": [
          {
            "destination": "power-backup",
            "title": {
              "en": "Hospitals & healthcare",
              "sw": "Hospitali na huduma za afya"
            }
          },
          {
            "destination": "networking",
            "title": {
              "en": "Offices & commercial buildings",
              "sw": "Ofisi na majengo ya biashara"
            }
          },
          {
            "destination": "electrical-industrial",
            "title": {
              "en": "Manufacturing & industry",
              "sw": "Uzalishaji na viwanda"
            }
          }
        ]
      },
      {
        "id": "sites",
        "title": {
          "en": "Land, projects & procurement",
          "sw": "Maeneo, miradi na ugavi"
        },
        "items": [
          {
            "destination": "solar-panel-systems",
            "title": {
              "en": "Farms & remote estates",
              "sw": "Mashamba na maeneo ya mbali"
            }
          },
          {
            "destination": "institutional-procurement",
            "title": {
              "en": "Contractors & procurement buyers",
              "sw": "Wakandarasi na wanunuzi wa taasisi"
            }
          }
        ]
      }
    ],
    "feature": {
      "destination": "institutional-procurement",
      "title": {
        "en": "A brief. A BOQ. A considered answer.",
        "sw": "Mahitaji. BOQ. Suluhisho linalofaa."
      },
      "image": "/images/electrical-contracting/industrial-hero.webp",
      "alt": {
        "en": "An illustrative industrial electrical environment",
        "sw": "Mfano wa mazingira ya umeme viwandani"
      }
    }
  },
  {
    "id": "company",
    "title": {
      "en": "Company",
      "sw": "Kampuni"
    },
    "intro": {
      "en": "Get to know BM. Find the people and support for your next step.",
      "sw": "Ifahamu BM. Pata mawasiliano na msaada kwa hatua inayofuata."
    },
    "directory": "about",
    "sections": [
      {
        "id": "bm",
        "title": {
          "en": "About BM Contractors",
          "sw": "Kuhusu BM Contractors"
        },
        "items": [
          {
            "destination": "about"
          },
          {
            "destination": "projects"
          },
          {
            "destination": "journal"
          }
        ]
      },
      {
        "id": "help",
        "title": {
          "en": "Work with us",
          "sw": "Wasiliana nasi"
        },
        "items": [
          {
            "destination": "maintenance-support"
          },
          {
            "destination": "support"
          },
          {
            "destination": "contact"
          },
          {
            "destination": "survey"
          }
        ]
      }
    ],
    "feature": {
      "destination": "contact",
      "title": {
        "en": "Moshi. Arusha. Across Tanzania.",
        "sw": "Moshi. Arusha. Tanzania nzima."
      },
      "image": "/images/luxury-concepts/cctv-960.webp",
      "alt": {
        "en": "Architectural entrance illustration",
        "sw": "Mfano wa lango la jengo"
      }
    }
  }
];
