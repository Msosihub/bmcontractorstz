import { responsiveLocalScene } from "@/lib/local-image-policy.mjs";

/** Native art direction keeps safety equipment in the mobile crop without JS or optimizer requests. */
export function FireHeroImage({ alt }: { alt: string }) {
  const desktop = responsiveLocalScene(
    "/images/fire-safety/protected-building-v2.webp",
  );
  const mobile = responsiveLocalScene(
    "/images/fire-safety/protected-building-mobile-v2.webp",
  );
  if (!desktop || !mobile)
    throw new Error("Fire hero image renditions are missing.");
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
        imageSizes="600px"
        fetchPriority="high"
      />
      <picture>
        <source
          media="(max-width:760px)"
          type="image/webp"
          srcSet={mobile.srcSet}
          sizes="600px"
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
        {/* Native art direction uses bounded local WebP sources and matching responsive preload hints. */}
        <img
          src="/images/fire-safety/protected-building-v2.webp"
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="fs-hero-image fs-hero-equipment-image"
        />
      </picture>
    </>
  );
}
