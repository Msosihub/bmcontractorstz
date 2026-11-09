import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { getManufacturerLogos, logoSlots } from "@/lib/manufacturer-logos";

export async function ManufacturerBelts({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const items = await getManufacturerLogos().catch(() =>
    logoSlots.map((slot) => ({ slot, name: "", version: 0 })),
  );
  const placeholders = items.some((item) => !item.name);
  return (
    <section className="bm-logos" aria-labelledby="bm-logo-title" data-bm-belt>
      <div className="bm-wrap">
        <p className="bm-label">
          {sw ? "NEMBO ZA WATENGENEZAJI" : "MANUFACTURER LOGOS"}
        </p>
        <h2 id="bm-logo-title">
          {sw ? "Chapa za vifaa." : "Equipment brands."}
        </h2>
        {placeholders && (
          <p>
            {sw
              ? "Nafasi za mfano zitaonyesha nembo zilizoidhinishwa baada ya kupakiwa."
              : "Illustrative slots show where approved artwork will appear."}
          </p>
        )}
        <input className="bm-logo-pause" id="bm-logo-pause" type="checkbox" />
        <label htmlFor="bm-logo-pause">
          {sw ? "Sitisha mwendo" : "Pause logo movement"}
        </label>
        <div className="bm-logo-rows">
          {[items.slice(0, 5), items.slice(5)].map((row, i) => (
            <div
              className="bm-logo-window"
              key={i}
              role="region"
              aria-label={sw ? `Safu ya nembo ${i + 1}` : `Logo row ${i + 1}`}
              tabIndex={0}
            >
              <div className="bm-logo-track">
                {[false, true].map((copy) => (
                  <ul
                    key={String(copy)}
                    aria-hidden={copy || undefined}
                    inert={copy || undefined}
                  >
                    {row.map((item) => (
                      <li key={item.slot}>
                        {item.name && item.version ? (
                          <Image
                            src={`/manufacturer-logo/${item.slot}?v=${item.version}`}
                            alt={item.name}
                            width={155}
                            height={58}
                            unoptimized
                          />
                        ) : (
                          <span
                            className="bm-logo-placeholder"
                            role="img"
                            aria-label={
                              sw
                                ? "Nafasi ya mfano ya nembo"
                                : "Logo placeholder"
                            }
                          >
                            <span />
                            <span />
                            <span />
                          </span>
                        )}
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
