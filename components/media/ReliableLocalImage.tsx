import Image, { type ImageProps } from "next/image";
import { directProductImage, responsiveLocalScene } from "@/lib/local-image-policy.mjs";

/** Static delivery only for the reviewed local product and architectural families. */
export default function ReliableLocalImage(props: ImageProps) {
  const scene = responsiveLocalScene(props.src);
  if (!scene) {
    return <Image {...props} alt={props.alt} unoptimized={props.unoptimized || directProductImage(props.src)} />;
  }
  const { preload, priority, ...imageProps } = props;
  // Native markup is discoverable even when this server-rendered scene arrives
  // after the document head has streamed and JavaScript is disabled.
  return (
    <>
      {(preload || priority) && (
        <link rel="preload" as="image" href={scene.fallback} imageSrcSet={scene.srcSet} imageSizes={props.sizes || "100vw"} fetchPriority="high" />
      )}
    <picture>
      <source width={scene.width} height={scene.height} type="image/webp" srcSet={scene.srcSet} sizes={props.sizes || "100vw"} />
      <Image {...imageProps} alt={props.alt} src={scene.fallback} width={props.fill ? undefined : scene.width} height={props.fill ? undefined : scene.height} unoptimized loading={preload || priority ? "eager" : props.loading} />
    </picture>
    </>
  );
}
