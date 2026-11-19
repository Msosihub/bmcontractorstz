import Image from "next/image";
import type { CSSProperties } from "react";
import type { Language } from "@/lib/i18n/config";
import { manufacturerBrands } from "@/data/manufacturer-brands";
import { getManufacturerLogos, logoSlots } from "@/lib/manufacturer-logos";

export async function ManufacturerBelts({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  // Local, official artwork is the dependable default. Enable managed overrides
  // only after the existing upload journey has passed its separate release gate.
  const overrides =
    process.env.BM_HOMEPAGE_LOGO_OVERRIDES === "1"
      ? await getManufacturerLogos().catch(() => [])
      : [];
  const items = logoSlots.flatMap((slot) => {
    const brand = manufacturerBrands[slot - 1];
    const override = overrides.find(
      (item) => item.slot === slot && item.name && item.version,
    );
    if (!brand && !override) return [];
    return [
      {
        slot,
        name: override?.name ?? brand.name,
        dark: !override && brand?.name === "ZKTeco",
        src: override
          ? `/manufacturer-logo/${slot}?v=${override.version}`
          : `/images/brands/${brand.image}`,
        width: brand?.width ?? 145,
        cardWidth: brand?.cardWidth ?? 215,
      },
    ];
  });
  return (
    <section className="bm-logos" aria-labelledby="bm-logo-title" data-bm-belt>
      <div className="bm-wrap">
        <div className="bm-logos-heading">
          <div>
            <p className="bm-label">
              {sw
                ? "TEKNOLOJIA TUNAZOFANYIA KAZI"
                : "FAMILIAR TECHNOLOGY. THOUGHTFULLY SELECTED."}
            </p>
            <h2 id="bm-logo-title">
              {sw
                ? "Chapa za vifaa tunavyofunga na kusambaza."
                : "Equipment brands we work with."}
            </h2>
          </div>
          <div className="bm-logo-control">
            <input
              className="bm-logo-pause"
              id="bm-logo-pause"
              type="checkbox"
            />
            <label htmlFor="bm-logo-pause">
              {sw ? "Sitisha mwendo" : "Pause motion"}
            </label>
          </div>
        </div>
        <div className="bm-logo-rows">
          {[items.slice(0, 5), items.slice(5)].map((row, i) => (
            <div
              className="bm-logo-window"
              key={i}
              role="region"
              aria-label={
                sw ? `Safu ya chapa ${i + 1}` : `Equipment brand row ${i + 1}`
              }
              tabIndex={0}
            >
              <div className="bm-logo-track">
                {[false, true].map((copy) => (
                  <ul
                    key={String(copy)}
                    aria-hidden={copy || undefined}
                    inert={copy || undefined}
                  >
                    {[...row, ...row].map((item, j) => (
                      <li
                        data-bm-logo-dark={item.dark || undefined}
                        key={`${item.slot}-${j}`}
                        aria-hidden={j >= row.length || undefined}
                        style={
                          {
                            "--logo-width": `${item.width}px`,
                            "--logo-card-width": `${item.cardWidth}px`,
                          } as CSSProperties
                        }
                      >
                        <Image
                          src={item.src}
                          alt={item.name}
                          width={item.width}
                          height={58}
                          unoptimized
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
