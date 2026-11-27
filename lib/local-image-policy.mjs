// Confirmed by the bounded hosted audit; only approved equipment, never scene photos.
export const powerEquipmentImages = [
  ...["cummins-c110d5i", "perkins-1103a-33g", "dse7320-mkii", "dse8610-mkii", "comap-amf25", "comap-intelineo5500"].map((name) => `/images/generator-engineering/${name}.webp`),
  ...["jinko", "deye", "victron", "ritar", "chloride", "lorentz"].map((name) => `/images/solar-engineering/${name}.webp`),
  "/images/power-backup/apc.webp", "/images/power-backup/eaton.webp",
];
// Exact existing reference sources: no blanket access-control directory bypass.
export const zktecoProductImages = [
  "/images/access-control/k40-pro.webp",
  "/images/access-control/mb360.webp",
  "/images/access-control/mb1000.webp",
  "/images/access-control/mb20.webp",
  "/images/access-control/mb10.webp",
  "/images/access-control/senseface-4a.webp",
  "/images/access-control/speedface-v5l.webp",
  "/images/access-control/f18-pro.webp",
  "/images/access-control/f18.webp",
  "/images/access-control/k40.webp",
  "/images/access-control/sc105.webp",
  "/images/access-control/inbio-pro-plus.webp",
  "/images/access-control/c3-plus.webp",
  "/images/access-control/c2-260.webp",
  "/images/access-control/inbio-classic.webp",
  "/images/access-control/kr600.webp",
  "/images/access-control/kr500.webp",
  "/images/access-control/fr1200.webp",
  "/images/access-control/ml100.webp",
  "/images/access-control/sl01-t430h.webp",
  "/images/access-control/lh4000.webp",
  "/images/access-control/ts2000-plus.webp",
  "/images/access-control/al-280-led.webp",
  "/images/access-control/eb104.webp",
  "/images/access-control/ex-802.webp",
  "/images/access-control/biotime-9-5.webp",
  "/images/access-control/biotime-cloud.webp",
  "/images/access-control/zkbio-cvaccess.webp",
  "/images/access-control/zkbio-hlms.webp",
  "/images/access-control/ll-03.webp",
  "/images/access-control/fht2400.webp",
  "/images/access-control/uhf5-pro.webp",
  "/images/access-control/uhf10-pro.webp",
  "/images/access-control/zk8500r.webp",
  "/images/access-control/fr1500s.webp",
  "/images/access-control/zkb201.webp",
  "/images/access-control/zk-m3.webp",
  "/images/access-control/zkx6040.webp",
  "/images/access-control/probg3100.webp",
  "/images/access-control/zk-d180.webp"
];
export const fenceProductImages = [
  "/assets/electric-fence-products/nemtek-druid-13lcd-640.webp",
  "/assets/electric-fence-products/nemtek-druid-28lcd-640.webp",
  "/assets/electric-fence-products/nemtek-agri-10km-640.webp",
  "/assets/electric-fence-products/jva-z14-640.webp",
  "/assets/electric-fence-products/jva-z28-640.webp",
  "/assets/electric-fence-products/gallagher-mbs200-640.webp",
  "/assets/electric-fence-products/stafix-x3-640.webp",
  "/assets/electric-fence-products/stafix-x6i-640.webp"
];
export const networkingProductImages = [
  "/images/networking/mikrotik-rb5009ug-s-in.webp",
  "/images/networking/mikrotik-hex-e50ug.webp",
  "/images/networking/omada-eap650.webp",
  "/images/networking/omada-eap225-outdoor.webp",
  "/images/networking/omada-sg2210mp.webp",
  "/images/networking/tp-link-tl-sg1024d.webp"
];
export const telephonyProductImages = [
  "/images/telephony/yeastar-p550.webp",
  "/images/telephony/yeastar-ta400.webp",
  "/images/telephony/yeastar-ta410.webp",
  "/images/telephony/yealink-sip-t31p.webp",
  "/images/telephony/grandstream-grp2602.webp",
  "/images/telephony/grandstream-ghp610.webp"
];
export const fireSafetyProductImages = ["/images/fire-safety/aw-fp300.webp", "/images/fire-safety/aw-d301.webp", "/images/fire-safety/aw-d302.webp", "/images/fire-safety/aw-d305.webp", "/images/fire-safety/aw-d306.webp", "/images/fire-safety/hf-c104.webp", "/images/fire-safety/abc-powder.webp", "/images/fire-safety/co2.webp"];
export const climateProductImages = ["/images/air-conditioning/gree-pular.webp", "/images/air-conditioning/gree-u-match.webp", "/images/air-conditioning/gree-gmv6.webp", "/images/air-conditioning/hisense-u8.webp", "/images/air-conditioning/hisense-freematch.webp", "/images/air-conditioning/hisense-s5.webp", "/images/air-conditioning/lg-multi-split.webp", "/images/air-conditioning/lg-multi-v-s.webp"];
const equipmentSet = new Set([
  ...climateProductImages,
  ...telephonyProductImages,
  ...fireSafetyProductImages,
  ...networkingProductImages,
  ...powerEquipmentImages, ...zktecoProductImages,
  // Both existing fence renditions share the same source policy.
  ...fenceProductImages.flatMap(src => [src, src.replace("-640.webp", "-320.webp")]),
]);
// Deliberately bounded to reviewed, already compressed manufacturer artwork.
// Remote media, CMS uploads and unreviewed sources retain their existing delivery policy.
export function directProductImage(src) {
  return typeof src === 'string' && (
    /^\/assets\/gate-automation\/products\/[a-z0-9-]+\.webp$/.test(src) ||
    /^\/images\/hikvision\/ds-[a-z0-9-]+\.webp$/.test(src) || equipmentSet.has(src)
  );
}
const scenes = [
  {src:"/images/schools/hero.webp",width:1536,height:1024,widths:[384,640,960,1280,1536]},
  {src:"/images/schools/boarding.webp",width:1536,height:1024,widths:[384,640,960,1280,1536]},
  {src:"/images/schools/hero-mobile.webp",width:683,height:1024,widths:[384,640,683]},
  {"src": "/images/air-conditioning/commercial-portrait-v2.webp", "width": 1086, "height": 1448, "widths": [384, 640, 960, 1086]},
  {"src": "/images/air-conditioning/maintenance-portrait-v2.webp", "width": 1086, "height": 1448, "widths": [384, 640, 960, 1086]},
  {"src": "/images/air-conditioning/hero-mobile.webp", "width": 1024, "height": 1536, "widths": [384, 640, 960, 1024]},
  {"src": "/images/air-conditioning/hero.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/air-conditioning/commercial.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/air-conditioning/maintenance.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/air-conditioning/multiroom.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},

  {"src":"/images/telephony/hotel-portrait.webp","width":1086,"height":1448,"widths":[384,640,960,1086]},
  {"src":"/images/telephony/office-portrait.webp","width":1086,"height":1448,"widths":[384,640,960,1086]},
  {"src":"/images/telephony/maintenance-portrait.webp","width":1086,"height":1448,"widths":[384,640,960,1086]},
  {"src": "/images/telephony/reception.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/telephony/guest-room.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/telephony/maintenance.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src":"/images/fire-safety/protected-building-v2.webp","width":1672,"height":941,"widths":[384,640,960,1280,1672]},
  {"src":"/images/fire-safety/protected-building-mobile-v2.webp","width":1024,"height":1536,"widths":[384,640,960,1024]},
  { src: "/images/fire-safety/readiness-demonstration.webp", width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  {"src": "/images/fire-safety/safety-architecture.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/fire-safety/boarding-assessment.webp", "width": 1672, "height": 941, "widths": [384, 640, 960, 1280, 1672]},
  {"src": "/images/fire-safety/maintenance.webp", "width": 1086, "height": 1448, "widths": [384, 640, 960, 1086]},
  {"src": "/images/fire-safety/healthcare.webp", "width": 1536, "height": 1024, "widths": [384, 640, 960, 1280, 1536]},
  {"src": "/images/fire-safety/kitchen.webp", "width": 1536, "height": 1024, "widths": [384, 640, 960, 1280, 1536]},
  { src: '/images/networking/cabinet-family.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/fibre-materials.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/copper-materials.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/connected-campus.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/workplace.webp', width: 1672, height: 941, widths: [384, 640, 960, 1280, 1672] },
  { src: '/images/networking/rack-detail.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/fibre-work.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/networking/hotel-wifi.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536] },
  { src: '/images/hikvision/courtyard.webp', width: 1200, height: 800, widths: [384, 640, 960, 1200] },
  { src: '/images/hikvision/building.webp', width: 1680, height: 946, widths: [384, 640, 960, 1280, 1680] },
  { src: '/images/hikvision/reception.webp', width: 1200, height: 800, widths: [384, 640, 960, 1200] },
  { src: '/images/solar-engineering/campus-1600.webp', width: 1536, height: 1024, widths: [384, 640, 960, 1280, 1536], derivativePrefix: '/images/solar-engineering/services-campus' },
];
export function responsiveLocalScene(src) {
  const scene = scenes.find((item) => item.src === src);
  if (!scene) return null;
  const originalWidth = scene.widths.at(-1);
  const prefix = scene.derivativePrefix || scene.src.replace('.webp', '');
  return {
    width: scene.width,
    height: scene.height,
    fallback: `${prefix}-640.webp`,
    srcSet: scene.widths.map((width) => `${width === originalWidth ? scene.src : `${prefix}-${width}.webp`} ${width}w`).join(', '),
  };
}
