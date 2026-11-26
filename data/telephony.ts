export type VoiceCopy = { en: string; sw: string };
const l = (en: string, sw: string): VoiceCopy => ({ en, sw });
export const approaches = [
  {
    id: "analogue",
    title: l("Analogue. Still useful.", "Analogue. Bado zina nafasi."),
    intro: l(
      "Working room phones and extension cables may have a future. Start with an audit, not a complete replacement.",
      "Simu za vyumbani na nyaya zilizopo zinaweza kuendelea kutumika. Anza na tathmini kabla ya kubadili mfumo mzima.",
    ),
    detail: l(
      "We check existing PABX capacity, extension wiring, distribution, handset condition and replacement options. Repair faults, change extension assignments or retain tested copper pairs where the equipment and cable condition allow.",
      "Tunahakiki uwezo wa PABX, nyaya na mgawanyo wa extension, hali ya simu na vifaa vya kubadilisha. Tunarekebisha hitilafu, kupanga upya extension au kutumia jozi za nyaya zilizopimwa pale mfumo na hali ya nyaya vinaporuhusu.",
    ),
    intent: l(
      "Repair or expand an analogue system",
      "Rekebisha au panua mfumo wa analogue",
    ),
  },
  {
    id: "ip",
    title: l("IP. Built around your team.", "IP. Ilingane na timu yako."),
    intro: l(
      "A PBX, suitable SIP phones and a well-planned network bring reception, departments and remote users into one call plan.",
      "PBX, simu za SIP zinazofaa na mtandao uliopangwa huunganisha mapokezi, idara na watumiaji wa mbali kwa mpango mmoja wa simu.",
    ),
    detail: l(
      "Internal calls can stay on the local network. Outside calls need a configured provider connection; remote extensions need secure connectivity. Check SIP compatibility, firmware, VLAN/QoS needs and PoE or individual power requirements before choosing endpoints.",
      "Simu za ndani zinaweza kubaki kwenye mtandao wa eneo. Kupiga nje kunahitaji muunganisho wa mtoa huduma uliosanidiwa; extension za mbali zinahitaji muunganisho salama. Hakiki SIP, firmware, mahitaji ya VLAN/QoS na PoE au adapta za umeme kabla ya kuchagua simu.",
    ),
    intent: l(
      "Install a new IP telephone system",
      "Funga mfumo mpya wa simu za IP",
    ),
  },
  {
    id: "hybrid",
    title: l("Hybrid. Upgrade intelligently.", "Hybrid. Boresha kwa mpango."),
    intro: l(
      "Keep suitable analogue phones. Upgrade reception, external lines and selected departments at a sensible pace.",
      "Endelea na simu za analogue zinazofaa. Boresha mapokezi, laini za nje na idara hatua kwa hatua.",
    ),
    detail: l(
      "FXS ports or an FXS gateway connect ordinary analogue handsets to the designed PBX system. FXO interfaces connect suitable analogue outside lines. These are different jobs. Port counts, line conditions, signalling, cabling and the exact PBX/gateway combination must be assessed.",
      "Port za FXS au gateway ya FXS huunganisha simu za kawaida za analogue kwenye mfumo wa PBX. FXO huunganisha laini za analogue kutoka nje. Hizi ni kazi tofauti. Idadi ya port, hali ya laini, signalling, nyaya na mchanganyiko wa PBX/gateway lazima uhakikiwe.",
    ),
    intent: l(
      "Assess an analogue-to-IP hybrid upgrade",
      "Tathmini maboresho ya analogue kwenda hybrid/IP",
    ),
  },
];
export const hotelScenarios = [
  {
    title: l(
      "Keep the room phones. Modernise reception.",
      "Baki na simu za vyumbani. Boresha mapokezi.",
    ),
    text: l(
      "An IP reception phone can work with tested analogue room extensions through suitable FXS interfaces. We map rooms, count required ports and assess the copper pairs before specifying the PBX and gateway capacity.",
      "Simu ya IP mapokezini inaweza kufanya kazi na simu za analogue za vyumbani kupitia FXS zinazofaa. Tunapanga namba za vyumba, kuhesabu port na kupima nyaya kabla ya kuchagua PBX na gateway.",
    ),
    intent: l(
      "Retain analogue hotel room phones",
      "Endelea kutumia simu za analogue za vyumbani",
    ),
  },
  {
    title: l(
      "A new hotel. One clear extension plan.",
      "Hoteli mpya. Mpango unaoeleweka wa extension.",
    ),
    text: l(
      "Connect guest rooms, reception, restaurant, housekeeping and management. Agree room-to-reception calls, service numbers, transfer rules and permitted outside calling. Plan networking and backup power for every necessary device.",
      "Unganisha vyumba, mapokezi, mgahawa, housekeeping na uongozi. Panga simu kutoka vyumbani kwenda mapokezi, namba za huduma, uhamishaji wa simu na ruhusa za kupiga nje. Panga mtandao na umeme wa akiba kwa vifaa vyote muhimu.",
    ),
    intent: l(
      "New hotel telephone installation",
      "Ufungaji wa simu kwa hoteli mpya",
    ),
  },
  {
    title: l(
      "Upgrade in stages. Keep the hotel working.",
      "Boresha hatua kwa hatua. Huduma ziendelee.",
    ),
    text: l(
      "Retain serviceable room phones while improving trunks, reception and back-office communications. Audit noisy pairs and numbering, back up configuration and agree the changeover and recovery plan with the property team.",
      "Hifadhi simu za vyumbani zinazofaa huku ukiboresha trunk, mapokezi na ofisi za ndani. Pima nyaya zenye kelele na namba za extension, hifadhi usanidi na kubaliana na timu ya hoteli kuhusu ubadilishaji na kurejesha mfumo ikihitajika.",
    ),
    intent: l(
      "Phased hotel PBX upgrade",
      "Maboresho ya PBX ya hoteli kwa awamu",
    ),
  },
  {
    title: l(
      "Dead extensions or failed transfers? Start here.",
      "Extension hazifanyi kazi au simu hazihamishiki?",
    ),
    text: l(
      "Trace handset, cord, cable pair, distribution point, gateway/PBX port and call-routing configuration. Test room numbering and reception transfers after repair instead of assuming every fault needs a new PBX.",
      "Fuatilia simu, cord, jozi ya nyaya, sehemu ya mgawanyo, port ya gateway/PBX na mpango wa routing. Baada ya matengenezo, jaribu namba za vyumba na uhamishaji mapokezini; si kila tatizo linahitaji PBX mpya.",
    ),
    intent: l(
      "Hotel telephone fault diagnosis and maintenance",
      "Uchunguzi wa hitilafu na matengenezo ya simu za hoteli",
    ),
  },
];
export const workplaceScenarios = [
  {
    title: l("Offices & tour companies", "Ofisi na kampuni za utalii"),
    text: l(
      "Help reception reach sales, accounts and management. Set sensible ring groups, transfer rules and outbound permissions. Add secure remote or branch extensions only where the platform, connectivity and licence support them.",
      "Saidia mapokezi kuunganisha mauzo, uhasibu na uongozi. Panga ring group, uhamishaji na ruhusa za kupiga nje. Ongeza extension za mbali au matawi pale mfumo, muunganisho na leseni vinaporuhusu.",
    ),
    intent: l(
      "Office reception and department call handling",
      "Simu za mapokezi na idara za ofisi",
    ),
  },
  {
    title: l("Schools & institutions", "Shule na taasisi"),
    text: l(
      "Give reception, administration, security and boarding departments clear extension groups. Assess separate buildings, cable routes and authorised outside calling without exposing private extensions to unrestricted access.",
      "Panga extension za mapokezi, utawala, ulinzi na idara za bweni. Tathmini majengo, njia za nyaya na ruhusa za kupiga nje bila kufungua extension binafsi kwa matumizi yasiyodhibitiwa.",
    ),
    intent: l(
      "School or institutional telephone system",
      "Mfumo wa simu za shule au taasisi",
    ),
  },
  {
    title: l("Hospitals & clinics", "Hospitali na kliniki"),
    text: l(
      "Plan reception and staff communications around operational priorities, resilience and power continuity. Any emergency or life-safety requirement needs a separately verified design; a standard office PBX is not a certified emergency system.",
      "Panga mawasiliano ya mapokezi na watumishi kulingana na vipaumbele vya kazi, uimara na umeme wa akiba. Mahitaji ya dharura au usalama wa maisha yanahitaji usanifu unaothibitishwa kando; PBX ya kawaida si mfumo uliothibitishwa wa dharura.",
    ),
    intent: l(
      "Healthcare administration telephone assessment",
      "Tathmini ya simu za utawala wa kituo cha afya",
    ),
  },
  {
    title: l(
      "More people. More rooms. An existing PBX.",
      "Watu na vyumba vinaongezeka. PBX tayari ipo.",
    ),
    text: l(
      "Check available extension ports, concurrent-call capacity, licences and wiring before adding rooms, moving desks or relocating the system. Expansion may need selected upgrades rather than replacing every handset.",
      "Hakiki port, uwezo wa simu zinazoendelea kwa pamoja, leseni na nyaya kabla ya kuongeza vyumba, kuhamisha meza au mfumo mzima. Upanuzi unaweza kuhitaji maboresho maalumu badala ya kubadili kila simu.",
    ),
    intent: l(
      "Expand or relocate an existing PBX",
      "Panua au hamisha PBX iliyopo",
    ),
  },
];
export const buyerFunctions = [
  [
    l("A clear first answer", "Mwitikio unaoeleweka"),
    l("Reception, IVR and transfers.", "Mapokezi, IVR na uhamishaji wa simu."),
  ],
  [
    l("The right team rings", "Simu ifikie timu inayofaa"),
    l(
      "Extension groups and call queues.",
      "Makundi ya extension na foleni za simu.",
    ),
  ],
  [
    l("Calls follow your hours", "Simu zifuate saa za kazi"),
    l(
      "Business-hours routing and escalation.",
      "Routing kulingana na saa za kazi na uelekezaji unapohitajika.",
    ),
  ],
  [
    l("Work beyond the desk", "Fanya kazi hata ukiwa mbali"),
    l(
      "Linkus or supported mobile/softphone extensions.",
      "Linkus au extension za simu/softphone zinazoungwa mkono.",
    ),
  ],
  [
    l("Control outside calling", "Dhibiti simu za nje"),
    l(
      "Permissions, trunks and call records.",
      "Ruhusa, trunk na rekodi za matumizi ya simu.",
    ),
  ],
  [
    l("Keep a recovery plan", "Panga namna ya kurejesha mfumo"),
    l(
      "Configuration backups and documented handover.",
      "Nakala za usanidi na makabidhiano yaliyoandikwa.",
    ),
  ],
];
export const faultGroups = [
  {
    title: l(
      "No dial tone. Noise. A dead room phone.",
      "Hakuna dial tone. Kelele. Simu ya chumbani imekufa.",
    ),
    text: l(
      "Start with the handset and cord, then test cable pairs, distribution and the correct FXS/PBX port. Check analogue line conditions and power before replacing hardware. Ordinary analogue phones must not be connected directly to Ethernet switch ports.",
      "Anza na simu na cord, kisha pima jozi za nyaya, mgawanyo na port sahihi ya FXS/PBX. Hakiki hali ya laini na umeme kabla ya kubadili vifaa. Simu za kawaida za analogue zisiunganishwe moja kwa moja kwenye port za swichi ya Ethernet.",
    ),
  },
  {
    title: l(
      "No incoming calls. No outside calls. Wrong transfers.",
      "Simu za nje haziingii, hazitoki au zinahamishwa vibaya.",
    ),
    text: l(
      "Check provider service, trunk registration or FXO line state, inbound routes, ring groups, forwarding and outbound permissions. Separate a provider outage from an extension, gateway or call-plan fault.",
      "Hakiki huduma ya mtoa laini, usajili wa trunk au hali ya laini ya FXO, njia za simu zinazoingia, ring group, forwarding na ruhusa za kupiga nje. Tofautisha hitilafu ya mtoa huduma na tatizo la extension, gateway au mpango wa simu.",
    ),
  },
  {
    title: l(
      "IP phones register, but audio is poor or one-way.",
      "Simu za IP zinasajiliwa, lakini sauti haiko sawa.",
    ),
    text: l(
      "Investigate SIP/RTP reachability, NAT/firewall rules, codec negotiation and packet loss, delay or jitter. Review network capacity, configured QoS and VLANs where appropriate; do not expose SIP services broadly as a shortcut.",
      "Chunguza upatikanaji wa SIP/RTP, NAT/firewall, makubaliano ya codec na packet loss, delay au jitter. Pitia uwezo wa mtandao, QoS na VLAN zinazofaa; usifungue huduma za SIP kwa kila mtu ili kutafuta suluhisho la haraka.",
    ),
  },
  {
    title: l(
      "Secure it. Back it up. Keep the whole chain powered.",
      "Linda mfumo. Hifadhi usanidi. Weka umeme wa akiba.",
    ),
    text: l(
      "Use strong SIP/extension credentials, restricted external access and controlled outbound permissions to reduce toll-fraud risk. Plan updates, configuration backups and privacy controls for recordings/call logs. Backup power must cover the PBX, gateways, necessary switches/router and powered handsets—not just one appliance. Never put credentials or private call records in an enquiry form.",
      "Tumia credentials imara za SIP/extension, zuia access isiyohitajika kutoka nje na dhibiti ruhusa za kupiga ili kupunguza toll fraud. Panga updates, nakala za usanidi na faragha ya rekodi za sauti/matumizi. Umeme wa akiba ujumuishe PBX, gateway, swichi/router muhimu na simu zinazohitaji umeme—si kifaa kimoja tu. Usiweke credentials au rekodi binafsi za simu kwenye fomu.",
    ),
  },
];
export const delivery = [
  [
    l("Survey & audit", "Tathmini na ukaguzi"),
    l(
      "Rooms, users, lines and the system already in place.",
      "Vyumba, watumiaji, laini na mfumo uliopo.",
    ),
  ],
  [
    l("Design the call plan", "Panga mfumo wa mawasiliano"),
    l(
      "PBX capacity, trunks, FXS/FXO, numbering, network and backup.",
      "Uwezo wa PBX, trunk, FXS/FXO, namba, mtandao na umeme wa akiba.",
    ),
  ],
  [
    l("Supply, install & configure", "Ugavi, ufungaji na usanidi"),
    l(
      "Equipment, tidy wiring, gateways and endpoint provisioning.",
      "Vifaa, nyaya nadhifu, gateway na usanidi wa simu.",
    ),
  ],
  [
    l("Test & hand over", "Jaribu na kabidhi"),
    l(
      "Internal/external calls, transfers, permissions and agreed recovery tests.",
      "Simu za ndani/nje, uhamishaji, ruhusa na majaribio ya urejeshaji yaliyokubaliwa.",
    ),
  ],
  [
    l("Maintain & grow", "Tunza na panua"),
    l(
      "Fault support, configuration records, upgrades and new extensions.",
      "Msaada wa hitilafu, rekodi za usanidi, maboresho na extension mpya.",
    ),
  ],
];
export const voiceFAQs = [
  [
    l(
      "Are internet service and call charges included?",
      "Je, intaneti na gharama za kupiga simu vinajumuishwa?",
    ),
    l(
      "Not automatically. Separate equipment, installation, provider subscriptions, outside lines and ongoing call charges in the quotation. We train the nominated administrator and agree who maintains extension lists, removes departed staff access and keeps configuration backups.",
      "Si moja kwa moja. Nukuu itenganishe vifaa, ufungaji, usajili wa mtoa huduma, laini na gharama za matumizi. Tunamfundisha msimamizi aliyeteuliwa na kukubaliana nani anasasisha extension, anaondoa access ya walioondoka na kuhifadhi nakala za usanidi.",
    ),
  ],
  [
    l(
      "Do we need internet for every internal call?",
      "Je, kila simu ya ndani inahitaji intaneti?",
    ),
    l(
      "Not necessarily. Suitable local analogue or IP extensions can call internally through the configured local system. SIP trunks, remote extensions and hosted services depend on their specified provider/network connection. Power for the whole system still matters.",
      "Si lazima. Extension za analogue au IP zinazofaa zinaweza kupigiana ndani kupitia mfumo wa eneo uliosanidiwa. SIP trunk, extension za mbali na huduma za hosted hutegemea muunganisho wa mtoa huduma/mtandao ulioainishwa. Umeme wa mfumo mzima bado ni muhimu.",
    ),
  ],
  [
    l(
      "Must we replace every analogue hotel phone?",
      "Lazima tubadili kila simu ya analogue hotelini?",
    ),
    l(
      "No blanket replacement rule applies. Assess the handsets, cable pairs, required signalling and FXS/gateway capacity. Working analogue room phones may be retained while reception and the PBX are upgraded. A site audit determines the sensible route.",
      "Hakuna sharti la kubadili zote. Pima simu, jozi za nyaya, signalling inayohitajika na uwezo wa FXS/gateway. Simu za vyumbani zinazofanya kazi zinaweza kubaki wakati mapokezi na PBX vinaboreshwa. Tathmini ya eneo ndiyo huamua njia inayofaa.",
    ),
  ],
  [
    l(
      "Does any SIP phone work with any PBX?",
      "Kila simu ya SIP inafanya kazi na kila PBX?",
    ),
    l(
      "SIP support is a starting point, not a universal compatibility guarantee. Verify the exact model, firmware, codecs, provisioning template and required features against the PBX's current supported list. Yeastar and Yealink are different manufacturers.",
      "SIP ni mwanzo, si dhamana ya compatibility ya kila kifaa. Hakiki modeli, firmware, codec, provisioning template na vipengele vinavyohitajika kwenye orodha ya sasa ya PBX. Yeastar na Yealink ni watengenezaji tofauti.",
    ),
  ],
  [
    l(
      "Can you maintain our existing S-Series or PABX?",
      "Mnaweza kutengeneza S-Series au PABX iliyopo?",
    ),
    l(
      "Ask for an assessment with the exact model, symptoms and extension count. Support depends on condition, current firmware/security status, available parts and platform limitations. We do not promise that every old platform can accept current features or integrations.",
      "Omba tathmini ukiwa na modeli, dalili za tatizo na idadi ya extension. Msaada hutegemea hali ya mfumo, firmware/usalama wa sasa, vipuri na mipaka ya platform. Si kila mfumo wa zamani unaweza kuongezewa vipengele au integration za sasa.",
    ),
  ],
];
