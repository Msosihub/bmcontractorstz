import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import type { ReferenceProduct } from "@/lib/catalogue/reference-types";
import { referenceStatus } from "@/lib/catalogue/reference-types";
import { solutionLinks } from "./links";
export function ReferenceCard({
  p,
  lang,
  namespace,
}: {
  p: ReferenceProduct;
  lang: Language;
  namespace: string;
}) {
  const sw = lang === "sw";
  return (
    <article className="rc-card">
      <a href={`${namespace}/${p.slug}?lang=${lang}`} className="rc-photo">
        <Image
          src={p.images[0].src}
          width={640}
          height={640}
          sizes="(max-width:650px) 85vw, (max-width:1000px) 42vw, 28vw"
          alt={p.images[0].alt}
        />
        <span aria-hidden="true">↗</span>
      </a>
      <div className="rc-card-copy">
        <p className="eyebrow">{referenceStatus[p.classification][lang]}</p>
        <h3>
          <a href={`${namespace}/${p.slug}?lang=${lang}`}>{p.name}</a>
        </h3>
        <p>{p.summary[lang]}</p>
        <a
          className="ac-textlink"
          href={
            solutionLinks(
              lang,
              p.brand +
                " " +
                p.name +
                (p.category === "software"
                  ? sw
                    ? " — leseni na usanidi"
                    : " — licence & deployment"
                  : sw
                    ? " — bei ya vifaa"
                    : " — equipment price"),
            ).quote
          }
        >
          {sw ? "Omba bei ya sasa" : "Request Current Price"} ↗
        </a>
      </div>
    </article>
  );
}
