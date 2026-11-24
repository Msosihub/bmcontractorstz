import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import imagery from "@/data/service-imagery.json";
import services from "@/data/premium-services.json";
export function Photo({
  asset,
  lang,
  className = "",
  alt,
  caption,
  sizes = "(max-width:760px) 100vw, 60vw",
}: {
  asset: string;
  lang: Language;
  className?: string;
  alt?: string;
  caption?: string;
  sizes?: string;
}) {
  return (
    <figure className={"photo " + className}>
      <Image
        src={"/assets/" + asset + "-1440.webp"}
        alt={
          alt ||
          Object.values(imagery).find((x) => x.asset === asset)?.[lang] ||
          (lang === "sw"
            ? "Mazingira ya jengo na vifaa vya uhandisi"
            : "A building and engineering equipment setting")
        }
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
export function EnquiryLink({
  lang,
  subject,
  trade = false,
  product,
  packageSlug,
}: {
  lang: Language;
  subject: string;
  trade?: boolean;
  product?: string;
  packageSlug?: string;
}) {
  return (
    <a
      className="button dark"
      href={
        "/request-site-survey?lang=" +
        lang +
        "&service=" +
        encodeURIComponent(
          (
            (trade ? (lang === "sw" ? "Jumla — " : "Wholesale — ") : "") +
            subject
          ).slice(0, 100),
        ) +
        (product ? "&product=" + encodeURIComponent(product) : "") +
        (packageSlug ? "&package=" + encodeURIComponent(packageSlug) : "")
      }
    >
      {trade
        ? lang === "sw"
          ? "Ulizia bei ya jumla"
          : "Trade & wholesale enquiry"
        : lang === "sw"
          ? "Jadili mahitaji yako"
          : "Discuss your requirements"}{" "}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function ServiceDirectory({ lang }: { lang: Language }) {
  return (
    <div className="directory">
      {services.map((s, i) => (
        <a href={"/services/" + s.slug + "?lang=" + lang} key={s.slug}>
          <span className="index">{String(i + 1).padStart(2, "0")}</span>
          <span>{s[lang].name}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
