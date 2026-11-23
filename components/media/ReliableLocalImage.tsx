import Image, { type ImageProps } from "next/image";
import { preload as preloadResource } from "react-dom";
import { directProductImage, responsiveLocalScene } from "@/lib/local-image-policy.mjs";

/** Static delivery only for the reviewed local product and architectural families. */
export default function ReliableLocalImage(props: ImageProps) {
  const scene = responsiveLocalScene(props.src);
  if (!scene) {
    return <Image {...props} alt={props.alt} unoptimized={props.unoptimized || directProductImage(props.src)} />;
  }
  const { preload, priority, ...imageProps } = props;
  // Match the picture source exactly, avoiding a second fallback-only preload.
  if (preload || priority) {
    preloadResource(scene.fallback, {
      as: "image",
      imageSrcSet: scene.srcSet,
      imageSizes: props.sizes || "100vw",
      fetchPriority: "high",
    });
  }
  return (
    <picture>
      <source type="image/webp" srcSet={scene.srcSet} sizes={props.sizes || "100vw"} />
      <Image {...imageProps} alt={props.alt} src={scene.fallback} unoptimized loading={preload || priority ? "eager" : props.loading} />
    </picture>
  );
}
