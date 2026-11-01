import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import type { BeltCustomer } from "@/lib/customer-belt-policy";
export function CustomerBelt({
  items,
  lang,
}: {
  items: BeltCustomer[];
  lang: Language;
}) {
  const customers = items.filter((x) => x.enabled && x.approved);
  if (!customers.length) return null;
  const sw = lang === "sw";
  return (
    <section className="cctv-customers" aria-labelledby="cctv-customers-title">
      <div className="cctv-customer-heading">
        <div>
          <p className="eyebrow">
            {sw
              ? "BAADHI YA WATEJA WA BM CONTRACTORS"
              : "SOME OF BM CONTRACTORS’ CUSTOMERS"}
          </p>
          <h2 id="cctv-customers-title">
            {sw ? "Tunathamini imani yao." : "We value their trust."}
          </h2>
        </div>
      </div>
      <input
        type="checkbox"
        id="cctv-customers-pause"
        className="belt-pause-input"
      />
      <label htmlFor="cctv-customers-pause" className="belt-pause-control">
        <span className="belt-pause-label">
          {sw ? "Sitisha mwendo" : "Pause movement"}
        </span>
        <span className="belt-resume-label">
          {sw ? "Endelea na mwendo" : "Resume movement"}
        </span>
      </label>
      <div className="cctv-customer-window">
        <div className="cctv-customer-track">
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
              inert={duplicate || undefined}
            >
              {customers.map((x) => (
                <li key={x.id}>
                  {x.imagePath ? (
                    <Image
                      src={x.imagePath}
                      alt=""
                      width={120}
                      height={64}
                      sizes="120px"
                    />
                  ) : (
                    <span className="cctv-customer-initial" aria-hidden="true">
                      {x.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                  <span>{x.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
