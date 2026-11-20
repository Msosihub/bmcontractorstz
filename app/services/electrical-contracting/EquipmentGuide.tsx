import Image from "next/image";
import equipment from "@/data/electrical-equipment.json";
import type { Language } from "@/lib/i18n/config";

/** Equipment families, not inventory or unverified model records. */
export function EquipmentGuide({
  lang,
  enquiryUrl,
}: {
  lang: Language;
  enquiryUrl: (scope: string) => string;
}) {
  const sw = lang === "sw",
    l = sw ? 1 : 0;
  return (
    <section
      id="equipment"
      className="ee-equipment"
      aria-labelledby="ee-equipment-title"
    >
      <div className="ee-wrap">
        <div className="ee-equipment-heading">
          <div>
            <p className="ee-eyebrow">
              {sw ? "MWONGOZO WA VIFAA" : "EQUIPMENT GUIDE"}
            </p>
            <h2 id="ee-equipment-title">
              {sw
                ? "Vifaa vinavyofaa. Kwa kazi yako."
                : "The right equipment. For the work ahead."}
            </h2>
          </div>
          <p>
            {sw
              ? "Anza na aina ya kifaa unachohitaji. Omba vifaa pekee au ugavi na ufungaji; vipimo vya mwisho, bei ya sasa na upatikanaji vitathibitishwa kwenye nukuu."
              : "Start with the equipment you need. Request supply only or a complete installation; final specifications, current prices and availability are confirmed in your quotation."}
          </p>
        </div>
        <p className="ee-equipment-hint">
          {sw
            ? "Aina sita za vifaa · kwenye simu, sogeza pembeni kuona zaidi →"
            : "Six equipment families · on mobile, swipe to explore →"}
        </p>
        <ul
          className="ee-equipment-list"
          tabIndex={0}
          aria-label={
            sw ? "Aina za vifaa vya umeme" : "Electrical equipment families"
          }
        >
          {equipment.map((item, index) => (
            <li key={item.id}>
              <article id={`equipment-${item.id}`}>
                <div className="ee-equipment-image">
                  <Image
                    src={`/images/electrical-contracting/${item.image}.webp`}
                    alt={item.name[l]}
                    fill
                    sizes="(max-width:760px) 82vw, (max-width:1000px) 45vw, 28vw"
                  />
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="ee-equipment-copy">
                  <p className="ee-equipment-types">{item.types[l]}</p>
                  <h3>{item.name[l]}</h3>
                  <p>{item.intro[l]}</p>
                  <details className="ee-details">
                    <summary>
                      {sw ? "Taarifa za kuandaa" : "What to specify"}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <ul>
                      {item.selection.map((point, i) => (
                        <li key={i}>{point[l]}</li>
                      ))}
                    </ul>
                  </details>
                  <a className="ee-equipment-related" href={`#${item.service}`}>
                    {sw ? "Huduma inayohusiana" : "Related service scope"} ↗
                  </a>
                  <div className="ee-equipment-actions">
                    <a
                      href={enquiryUrl(
                        `${item.name[l]} — ${sw ? "vifaa pekee" : "equipment only"}`,
                      )}
                    >
                      {sw ? "Vifaa pekee" : "Equipment only"}
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={enquiryUrl(
                        `${item.name[l]} — ${sw ? "ugavi na ufungaji" : "supply & installation"}`,
                      )}
                    >
                      {sw ? "Ugavi na ufungaji" : "Supply & installation"}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="ee-equipment-footnote">
          {sw
            ? "Kwa mifumo iliyopo, taja modeli au tuma taarifa za nameplate kupitia njia ya kushiriki iliyokubaliwa. Uoanifu na wigo wa kazi maalumu huthibitishwa kabla ya kuagiza."
            : "For existing systems, include the model reference or share nameplate details through an agreed channel. Compatibility and any specialist installation scope are confirmed before ordering."}
        </p>
      </div>
    </section>
  );
}
