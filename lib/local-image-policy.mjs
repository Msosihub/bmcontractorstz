// Deliberately bounded to reviewed, already compressed manufacturer artwork.
// Remote media, CMS uploads and other catalogues retain their existing delivery policy.
export function directProductImage(src) {
  return typeof src === 'string' && (
    /^\/assets\/gate-automation\/products\/[a-z0-9-]+\.webp$/.test(src) ||
    /^\/images\/hikvision\/ds-[a-z0-9-]+\.webp$/.test(src)
  );
}
const scenes = [
  { src: '/images/hikvision/building.webp', width: 1680, height: 946, widths: [384, 640, 960, 1280, 1680] },
  { src: '/images/hikvision/reception.webp', width: 1200, height: 800, widths: [384, 640, 960, 1200] },
];
export function responsiveLocalScene(src) {
  const scene = scenes.find((item) => item.src === src);
  if (!scene) return null;
  const originalWidth = scene.widths.at(-1);
  return {
    width: scene.width,
    height: scene.height,
    fallback: scene.src.replace('.webp', '-640.webp'),
    srcSet: scene.widths.map((width) => `${width === originalWidth ? scene.src : scene.src.replace('.webp', `-${width}.webp`)} ${width}w`).join(', '),
  };
}
