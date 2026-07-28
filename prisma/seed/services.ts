/**
 * Services Seed Data
 * ------------------
 * Main service records for BM Contractors.
 *
 * Purpose:
 * - Fills Neon database with public service pages.
 * - Lets /services and /services/[slug] read real database content.
 * - Gives the website richer, more human service descriptions.
 *
 * Later:
 * - Replace image paths with real project/service photos.
 * - Add richer service content blocks.
 * - Add admin image upload.
 */

export const serviceSeeds = [
  {
    slug: "cctv",
    titleEn: "CCTV Systems",
    titleSw: "Mifumo ya CCTV",
    eyebrowEn: "Security Camera Installation",
    eyebrowSw: "Installation ya Camera za Usalama",
    descriptionEn:
      "CCTV systems for homes, shops, offices, schools, warehouses and business premises, planned around real site needs.",
    descriptionSw:
      "Mifumo ya CCTV kwa nyumba, maduka, ofisi, shule, warehouses na maeneo ya biashara, ikipangwa kulingana na mahitaji halisi ya site.",
    contentEn:
      "A good CCTV system is not only about buying cameras. Camera position, cable routes, recorder size, hard disk storage, power supply and phone viewing all matter. BM Contractors helps you choose a practical setup for your site, whether it is a small home, shop, office, school, warehouse or larger compound.",
    contentSw:
      "Mfumo mzuri wa CCTV siyo kununua camera tu. Sehemu ya kufunga camera, njia za cable, ukubwa wa DVR/NVR, HDD ya kurekodi, power supply na kuangalia kwenye simu vyote ni muhimu. BM Contractors tunakusaidia kuchagua mfumo unaoendana na site yako, iwe ni nyumba, duka, ofisi, shule, warehouse au compound kubwa.",
    imageUrl: "/images/services/cctv.jpg",
    featuresEn: [
      "Indoor and outdoor camera installation",
      "DVR/NVR setup and configuration",
      "HDD recording and storage planning",
      "Remote viewing on phone",
      "Neat cabling and installation materials",
      "Maintenance, troubleshooting and support",
    ],
    featuresSw: [
      "Installation ya camera za ndani na nje",
      "Setup na configuration ya DVR/NVR",
      "Kupanga HDD na muda wa kurekodi",
      "Kuangalia camera kwenye simu",
      "Cabling safi na materials za installation",
      "Maintenance, troubleshooting na support",
    ],
  },
  {
    slug: "electric-fence",
    titleEn: "Electric Fence",
    titleSw: "Uzio wa Umeme",
    eyebrowEn: "Perimeter Security",
    eyebrowSw: "Ulinzi wa Eneo",
    descriptionEn:
      "Electric fence installation for homes, compounds, schools, warehouses, commercial and industrial premises.",
    descriptionSw:
      "Installation ya electric fence kwa nyumba, compounds, shule, warehouses, biashara na maeneo ya viwanda.",
    contentEn:
      "Electric fence helps protect the perimeter before an intruder reaches the building. We help plan the fence line, number of wire lines, energizer size, earth rods, insulators, warning signs and accessories. The goal is to create a system that is safe, visible, properly installed and suitable for the site.",
    contentSw:
      "Electric fence husaidia kulinda perimeter kabla mtu hajafika kwenye jengo. Tunasaidia kupanga njia ya fence, idadi ya lines, ukubwa wa energizer, earth rods, insulators, warning signs na accessories. Lengo ni kufunga mfumo ulio salama, unaoonekana, uliopangwa vizuri na unaoendana na site.",
    imageUrl: "/images/services/electric-fence.jpg",
    featuresEn: [
      "Fence line planning",
      "Energizer selection",
      "HT wire installation",
      "Insulators, brackets and accessories",
      "Earth rod setup",
      "Testing, warning signs and support",
    ],
    featuresSw: [
      "Kupanga njia ya fence",
      "Uchaguzi wa energizer",
      "Installation ya HT wire",
      "Insulators, brackets na accessories",
      "Setup ya earth rods",
      "Testing, warning signs na support",
    ],
  },
  {
    slug: "gate-motors",
    titleEn: "Gate Motors",
    titleSw: "Gate Motors",
    eyebrowEn: "Automatic Gate Solutions",
    eyebrowSw: "Mfumo wa Gate Automatic",
    descriptionEn:
      "Automatic gate motor installation and support for homes, apartments, offices and business premises.",
    descriptionSw:
      "Installation na support ya gate motors kwa nyumba, apartments, ofisi na maeneo ya biashara.",
    contentEn:
      "A gate motor brings convenience and controlled access to a property. We help with motor selection, sliding or swing gate setup, rails, remotes, safety sensors and after-installation support. We also assist with servicing and troubleshooting where the gate is slow, noisy, not closing properly or not responding to remotes.",
    contentSw:
      "Gate motor huongeza urahisi na udhibiti wa kuingia kwenye eneo. Tunasaidia kuchagua motor, setup ya sliding au swing gate, rails, remotes, safety sensors na support baada ya installation. Pia tunasaidia service na troubleshooting pale gate inapokuwa slow, ina kelele, haifungi vizuri au haijibu remote.",
    imageUrl: "/images/services/gate-motors.jpg",
    featuresEn: [
      "Sliding gate motors",
      "Swing gate solutions",
      "Remote control setup",
      "Safety sensor setup",
      "Gate motor servicing",
      "Troubleshooting and repair support",
    ],
    featuresSw: [
      "Sliding gate motors",
      "Swing gate solutions",
      "Setup ya remote control",
      "Setup ya safety sensors",
      "Service ya gate motor",
      "Troubleshooting na repair support",
    ],
  },
  {
    slug: "access-control",
    titleEn: "Access Control",
    titleSw: "Access Control",
    eyebrowEn: "Smart Entry Management",
    eyebrowSw: "Udhibiti wa Kuingia",
    descriptionEn:
      "Access control, biometric devices, door locks, attendance systems and smart entry solutions.",
    descriptionSw:
      "Access control, biometric, door locks, attendance systems na smart entry solutions.",
    contentEn:
      "Access control helps offices, shops, institutions and secure rooms manage who enters and when. BM Contractors can help with biometric devices, magnetic locks, exit buttons, door controllers, RFID cards and attendance support. It is useful for offices, stores, staff rooms, server rooms and restricted areas.",
    contentSw:
      "Access control husaidia ofisi, maduka, taasisi na vyumba maalum kudhibiti nani anaingia na muda gani. BM Contractors tunasaidia biometric devices, magnetic locks, exit buttons, door controllers, RFID cards na attendance support. Inafaa kwa ofisi, stores, staff rooms, server rooms na maeneo yenye ulinzi maalum.",
    imageUrl: "/images/services/access-control.jpg",
    featuresEn: [
      "Biometric access devices",
      "Magnetic locks and door controllers",
      "Exit buttons and RFID cards",
      "Attendance systems",
      "Office access management",
      "Support and maintenance",
    ],
    featuresSw: [
      "Biometric access devices",
      "Magnetic locks na door controllers",
      "Exit buttons na RFID cards",
      "Attendance systems",
      "Usimamizi wa access ya ofisi",
      "Support na maintenance",
    ],
  },
  {
    slug: "networking",
    titleEn: "Networking",
    titleSw: "Networking",
    eyebrowEn: "Business Connectivity",
    eyebrowSw: "Connectivity ya Biashara",
    descriptionEn:
      "Networking setup for CCTV, offices, internet sharing, routers, switches and business connectivity.",
    descriptionSw:
      "Networking kwa CCTV, ofisi, internet sharing, routers, switches na business connectivity.",
    contentEn:
      "Reliable networking keeps CCTV remote viewing, office internet, Wi-Fi and business systems working smoothly. We help plan routers, switches, access points, CAT6 cabling, point-to-point links and network troubleshooting. A good network reduces downtime and makes security systems easier to manage.",
    contentSw:
      "Networking nzuri husaidia CCTV remote viewing, internet ya ofisi, Wi-Fi na mifumo ya biashara kufanya kazi vizuri. Tunasaidia kupanga routers, switches, access points, CAT6 cabling, point-to-point links na troubleshooting. Network nzuri hupunguza downtime na kurahisisha usimamizi wa mifumo ya usalama.",
    imageUrl: "/images/services/networking.jpg",
    featuresEn: [
      "Office network setup",
      "CCTV networking",
      "Router and switch setup",
      "Wi-Fi coverage planning",
      "Point-to-point links",
      "Network troubleshooting",
    ],
    featuresSw: [
      "Setup ya network ya ofisi",
      "Networking ya CCTV",
      "Setup ya routers na switches",
      "Kupanga Wi-Fi coverage",
      "Point-to-point links",
      "Network troubleshooting",
    ],
  },
  {
    slug: "power-backup",
    titleEn: "Power Backup",
    titleSw: "Power Backup",
    eyebrowEn: "Reliable Backup Power",
    eyebrowSw: "Backup Power ya Kuaminika",
    descriptionEn:
      "UPS and backup power solutions for CCTV, routers, access control, offices and security systems.",
    descriptionSw:
      "UPS na backup power kwa CCTV, routers, access control, ofisi na mifumo ya usalama.",
    contentEn:
      "Security systems are only useful when they stay powered. We help protect CCTV cameras, routers, NVRs, access control and office equipment with suitable UPS and backup power planning. This helps reduce interruptions caused by power cuts and improves system uptime.",
    contentSw:
      "Mifumo ya usalama inakuwa na maana zaidi ikiwa inaendelea kufanya kazi muda wote. Tunasaidia kulinda CCTV, routers, NVR, access control na vifaa vya ofisi kwa UPS na backup power inayofaa. Hii hupunguza usumbufu wa kukatika kwa umeme na kuongeza uptime ya mfumo.",
    imageUrl: "/images/services/power-backup.jpg",
    featuresEn: [
      "UPS selection",
      "Backup for CCTV systems",
      "Backup for routers and internet",
      "Power protection",
      "Runtime planning",
      "Support and replacement guidance",
    ],
    featuresSw: [
      "Uchaguzi wa UPS",
      "Backup kwa mifumo ya CCTV",
      "Backup kwa routers na internet",
      "Power protection",
      "Kupanga muda wa backup",
      "Support na ushauri wa replacement",
    ],
  },
  {
    slug: "video-intercom",
    titleEn: "Video Intercom",
    titleSw: "Video Intercom",
    eyebrowEn: "Visitor Communication",
    eyebrowSw: "Mawasiliano na Wageni",
    descriptionEn:
      "Video intercom systems for homes, apartments, offices, gates and reception areas.",
    descriptionSw:
      "Mifumo ya video intercom kwa nyumba, apartments, ofisi, mageti na reception areas.",
    contentEn:
      "Video intercom makes it easier to see and speak with visitors before allowing entry. It is useful for homes, apartments, offices, gates, reception desks and controlled entrances. BM Contractors can help plan indoor monitors, outdoor door stations, cabling, network setup and integration with electric locks where needed.",
    contentSw:
      "Video intercom inarahisisha kuona na kuongea na mgeni kabla ya kumruhusu kuingia. Inafaa kwa nyumba, apartments, ofisi, mageti, reception na maeneo yanayohitaji udhibiti wa kuingia. BM Contractors tunasaidia kupanga indoor monitors, outdoor door stations, cabling, network setup na kuunganisha na electric locks inapohitajika.",
    imageUrl: "/images/services/video-intercom.jpg",
    featuresEn: [
      "Outdoor door station setup",
      "Indoor monitor installation",
      "Gate and reception communication",
      "Electric lock integration",
      "Network/IP intercom setup",
      "User training and support",
    ],
    featuresSw: [
      "Setup ya outdoor door station",
      "Installation ya indoor monitor",
      "Mawasiliano ya gate na reception",
      "Kuunganisha na electric lock",
      "Setup ya network/IP intercom",
      "Mafunzo ya matumizi na support",
    ],
  },
  {
    slug: "fire-alarm-systems",
    titleEn: "Fire Alarm Systems",
    titleSw: "Mifumo ya Fire Alarm",
    eyebrowEn: "Fire Detection and Warning",
    eyebrowSw: "Utambuzi na Tahadhari ya Moto",
    descriptionEn:
      "Fire alarm systems for offices, schools, shops, warehouses, apartments and commercial buildings.",
    descriptionSw:
      "Mifumo ya fire alarm kwa ofisi, shule, maduka, warehouses, apartments na majengo ya biashara.",
    contentEn:
      "Fire alarm systems help detect danger early and warn people before a small incident becomes a major loss. We help plan smoke detectors, heat detectors, manual call points, sounders, control panels and proper device placement. The system should match the building layout, occupancy and risk areas.",
    contentSw:
      "Fire alarm husaidia kugundua hatari mapema na kutoa tahadhari kabla tukio dogo halijawa hasara kubwa. Tunasaidia kupanga smoke detectors, heat detectors, manual call points, sounders, control panels na sehemu sahihi za kufunga vifaa. Mfumo unatakiwa kuendana na mpangilio wa jengo, matumizi ya eneo na maeneo yenye risk.",
    imageUrl: "/images/services/fire-alarm-systems.jpg",
    featuresEn: [
      "Smoke and heat detector planning",
      "Control panel installation",
      "Manual call points",
      "Sounders and warning devices",
      "Zone planning",
      "Testing and maintenance guidance",
    ],
    featuresSw: [
      "Kupanga smoke na heat detectors",
      "Installation ya control panel",
      "Manual call points",
      "Sounders na warning devices",
      "Kupanga zones",
      "Testing na ushauri wa maintenance",
    ],
  },
  {
    slug: "maintenance-support",
    titleEn: "Maintenance & Support",
    titleSw: "Maintenance na Support",
    eyebrowEn: "After-Sales Technical Care",
    eyebrowSw: "Huduma Baada ya Installation",
    descriptionEn:
      "Maintenance, troubleshooting and support for CCTV, electric fence, gate motors, access control, networking and power backup systems.",
    descriptionSw:
      "Maintenance, troubleshooting na support kwa CCTV, electric fence, gate motors, access control, networking na power backup.",
    contentEn:
      "A security system needs care after installation. BM Contractors supports customers with system checks, camera view issues, recorder problems, remote viewing support, electric fence faults, gate motor service, network troubleshooting and backup power guidance. Regular maintenance helps reduce failure and keeps the system useful for longer.",
    contentSw:
      "Mfumo wa usalama unahitaji matunzo baada ya installation. BM Contractors tunasupport wateja kwa system checks, matatizo ya camera view, DVR/NVR, remote viewing, faults za electric fence, service ya gate motor, network troubleshooting na ushauri wa backup power. Maintenance ya mara kwa mara husaidia kupunguza failure na kuongeza muda wa matumizi ya mfumo.",
    imageUrl: "/images/services/maintenance-support.jpg",
    featuresEn: [
      "CCTV health checks",
      "Remote viewing support",
      "Electric fence troubleshooting",
      "Gate motor servicing",
      "Network support",
      "Maintenance advice and follow-up",
    ],
    featuresSw: [
      "Ukaguzi wa CCTV",
      "Support ya remote viewing",
      "Troubleshooting ya electric fence",
      "Service ya gate motor",
      "Network support",
      "Ushauri wa maintenance na follow-up",
    ],
  },
];
