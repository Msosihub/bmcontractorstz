import Image from "next/image";
import type { CSSProperties } from "react";
import type { Language } from "@/lib/i18n/config";
import brands from "@/data/generator-brands.json";
import { BrandBeltControl } from "./BrandBeltControl";
import "./generator-brands.css";

export function GeneratorBrandBelts({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  // A second opposing row is useful only when enough distinct approved brands exist.
  const enquiry = (name: string) => `/contact?${new URLSearchParams({
    lang,
    subject: `${sw ? "Ugavi wa vifaa" : "Equipment sourcing"} — ${name}`.slice(0, 120),
    brief: sw
      ? `Chapa: ${name}\nKifaa / modeli / namba ya kipuri:\nHitaji na idadi:\nEneo:\nAina ya jengo au matumizi:\nVifaa pekee / ufungaji / huduma:\nMuda unaohitaji:`
      : `Brand: ${name}\nEquipment / model / part number:\nRequirement and quantity:\nSite / location:\nFacility / application:\nEquipment only / installation / service:\nTimeframe:`,
  })}`;
  const rows = brands.length >= 8
    ? [brands.slice(0, Math.ceil(brands.length / 2)), brands.slice(Math.ceil(brands.length / 2))]
    : [brands];
  return (
    <section className="ge-brand-belt" aria-labelledby="ge-brands-title" data-bm-belt>
      <div className="ge-wrap ge-brand-heading">
        <div>
          <p className="ge-eyebrow">{sw ? "CHAPA TUNAZOSAMBAZA" : "BRANDS WE SOURCE"}</p>
          <h2 id="ge-brands-title">{sw ? "Chapa zinazojulikana. Uchaguzi wa kitaalamu." : "Familiar names. Considered selection."}</h2>
        </div>
        <div className="ge-brand-heading-end">
          <a href="#equipment">{sw ? "Angalia vifaa na vidhibiti" : "Explore equipment & controls"} <span aria-hidden="true">↘</span></a>
          <BrandBeltControl lang={lang} />
        </div>
      </div>
      <div className="ge-brand-rows">
        {rows.map((row, index) => {
          // The visual repeat is wider than a desktop viewport, so the seam never exposes a gap.
          const repeated = Array.from({ length: Math.max(1, Math.ceil(1600 / (row.length * 228))) }, () => row).flat();
          return (
            <div className="ge-brand-window" key={index} tabIndex={0} role="region" aria-label={sw ? `Chapa za vifaa, safu ya ${index + 1}` : `Equipment brands, row ${index + 1}`}>
              <div className="ge-brand-track" style={{ "--ge-brand-direction": index % 2 ? "reverse" : "normal" } as CSSProperties}>
                {[false, true].map((duplicate) => (
                  <ul key={String(duplicate)} aria-hidden={duplicate || undefined} inert={duplicate || undefined}>
                    {repeated.map((brand, itemIndex) => {
                      const decorative = duplicate || itemIndex >= row.length;
                      return (
                        <li key={`${brand.id}-${itemIndex}`} data-ge-brand-id={brand.id} data-ge-brand-dark={brand.dark || undefined} aria-hidden={decorative || undefined} inert={decorative || undefined}>
                          <a href={brand.href === "/contact" ? enquiry(brand.name) : brand.href} aria-label={brand.href === "/contact" ? (sw ? `Ulizia vifaa vya ${brand.name}` : `Enquire about ${brand.name} equipment`) : (sw ? `Angalia vifaa vya ${brand.name}` : `Explore ${brand.name} equipment`)}>
                            <Image src={`/images/generator-engineering/brands/${brand.image}`} alt={brand.name} width={brand.width} height={brand.height} loading="eager" unoptimized />
                            {brand.caption && <span className="ge-brand-card-caption">{brand.caption}</span>}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
