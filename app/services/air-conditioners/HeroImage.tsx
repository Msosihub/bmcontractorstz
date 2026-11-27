import { responsiveLocalScene } from "@/lib/local-image-policy.mjs";
export function ClimateHeroImage({ alt }: { alt: string }) {
  const desktop = responsiveLocalScene("/images/air-conditioning/hero.webp"),
    mobile = responsiveLocalScene("/images/air-conditioning/hero-mobile.webp");
  if (!desktop || !mobile) throw Error("AC hero renditions missing");
  return (
    <>
      <link
        rel="preload"
        as="image"
        media="(min-width:761px)"
        href={desktop.fallback}
        imageSrcSet={desktop.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(max-width:760px)"
        href={mobile.fallback}
        imageSrcSet={mobile.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <picture>
        <source
          media="(max-width:760px)"
          type="image/webp"
          srcSet={mobile.srcSet}
          sizes="100vw"
          width={mobile.width}
          height={mobile.height}
        />
        <source
          type="image/webp"
          srcSet={desktop.srcSet}
          sizes="100vw"
          width={desktop.width}
          height={desktop.height}
        />
        <img
          src={desktop.fallback}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </>
  );
}
