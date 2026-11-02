import { RecordImage } from "@/components/premium/RecordImage";
import { specificationEntries } from "@/lib/product-specifications.mjs";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo, EnquiryLink } from "@/components/premium/Frame";
import { prisma } from "@/lib/prisma";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    q?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const p = await searchParams;
  const lang = p.lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const q = (p.q || "").trim().slice(0, 100);
  const category = (p.category || "").slice(0, 100);
  const page = Math.max(
    1,
    Math.min(1000, Number.parseInt(p.page || "1", 10) || 1),
  );
  const categories = await prisma.productCategory.findMany({
    where: { products: { some: { isPublished: true } } },
    orderBy: { nameEn: "asc" },
  });
  const records = await prisma.product.findMany({
    where: {
      isPublished: true,
      ...(category ? { category: { slug: category } } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { brand: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 51,
    skip: (page - 1) * 50,
  });
  const products = records.slice(0, 50);
  const pageLink = (n: number) =>
    "/products?" +
    new URLSearchParams({ lang, q, category, page: String(n) }).toString();
  const guides = sw
    ? [
        [
          "CCTV na ulinzi",
          "cctv",
          "Modeli halisi, ubora wa picha, lenzi, IP/analogi, PoE, uwezo wa DVR/NVR na muda wa kuhifadhi rekodi.",
        ],
        [
          "Umeme na nishati",
          "generator",
          "kW/kVA, volti, awamu, uwezo wa betri, uoanifu wa inverter na vifaa vya kinga.",
        ],
        [
          "Mitandao na simu",
          "network",
          "Idadi ya sehemu za kuunganisha, uwezo wa PoE, Wi-Fi, SIP, namba za ndani na uoanifu wa mfumo uliopo.",
        ],
      ]
    : [
        [
          "Security & surveillance",
          "cctv",
          "Exact model, resolution, lens, IP/analog format, PoE, recorder compatibility and storage requirements.",
        ],
        [
          "Electrical & power",
          "generator",
          "kW/kVA, voltage, phase, usable battery energy, inverter compatibility and protective devices.",
        ],
        [
          "Networks & telephones",
          "network",
          "Port count, PoE budget, Wi-Fi coverage, SIP, extensions, codecs and existing-system compatibility.",
        ],
      ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <section className="catalogue-intro section">
          <p className="eyebrow">
            {sw ? "VIFAA / REJAREJA NA JUMLA" : "EQUIPMENT / RETAIL & TRADE"}
          </p>
          <h1>
            {sw
              ? "Chagua kwa mahitaji.\nThibitisha kwa vipimo."
              : "Specified with care.\nSelected for your site."}
          </h1>
          <p className="lead">
            {sw
              ? "Modeli na vipimo vina maana vinapolingana na matumizi yako. Ulizia upatikanaji, dhamana na bei kabla ya kuagiza."
              : "Model numbers matter when they match the requirement. Confirm availability, warranty terms and a current quotation before ordering."}
          </p>
          <form className="catalogue-search" action="/products">
            <input type="hidden" name="lang" value={lang} />
            <label htmlFor="equipment-search">
              {sw
                ? "Tafuta jina, chapa au modeli"
                : "Search name, brand or model"}
            </label>
            <div>
              <input
                id="equipment-search"
                name="q"
                maxLength={100}
                defaultValue={q}
              />
              <button className="button dark">
                {sw ? "Tafuta" : "Search"} ↗
              </button>
            </div>
            <div className="catalogue-filters">
              <label htmlFor="equipment-category">
                {sw ? "Kundi la vifaa" : "Equipment category"}
              </label>
              <select
                id="equipment-category"
                name="category"
                defaultValue={category}
              >
                <option value="">
                  {sw ? "Makundi yote" : "All categories"}
                </option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {sw ? c.nameSw || c.nameEn : c.nameEn}
                  </option>
                ))}
              </select>
              {(q || category) && (
                <a href={"/products?lang=" + lang}>
                  {sw ? "Ondoa vichujio" : "Clear filters"}
                </a>
              )}
            </div>
          </form>
        </section>
        <section className="section catalogue-records">
          <p className="eyebrow">CENTURION / {sw ? "MILANGO YA KIOTOMATIKI" : "GATE AUTOMATION"}</p>
          <p><a className="button dark" href={`/catalogue/centurion?lang=${lang}`}>{sw ? "Chunguza modeli, vifaa na nukuu za CENTURION" : "Explore CENTURION models, accessories & quotations"} ↗</a></p>
          <p>{sw ? "Mwongozo wa vifaa vya mtengenezaji. Bei na upatikanaji vithibitishwe kwenye nukuu." : "Manufacturer equipment guide. Current prices and availability are confirmed on quotation."}</p>
          <div className="section-heading">
            <h2>{sw ? "Bidhaa zilizochapishwa" : "Published equipment"}</h2>
            <p>
              {sw ? "Ukurasa" : "Page"} {page} · {products.length}
              {records.length > 50 ? "+" : ""} {sw ? "matokeo" : "results"}
            </p>
          </div>
          {products.length ? (
            <div className="record-grid">
              {products.map((x) => (
                <article key={x.id}>
                  <RecordImage kind="product" record={x} lang={lang} />
                  <p className="eyebrow">
                    {(sw
                      ? x.category?.nameSw || x.category?.nameEn
                      : x.category?.nameEn) || (sw ? "VIFAA" : "EQUIPMENT")}
                  </p>
                  <h3>
                    <a href={"/products/" + x.slug + "?lang=" + lang}>
                      {x.name} ↗
                    </a>
                  </h3>
                  <p>
                    {x.brand ||
                      (sw ? "Chapa ithibitishwe" : "Brand to be confirmed")}
                  </p>
                  {sw && x.description && (
                    <p className="scope-note">
                      Maelezo ya bidhaa hii bado yako kwa Kiingereza.
                    </p>
                  )}
                  <p>{x.description}</p>
                  {specificationEntries(x.specifications).length > 0 && (
                    <ul className="record-specs">
                      {specificationEntries(x.specifications)
                        .slice(0, 3)
                        .map(([k, v], i) => (
                          <li key={k + i}>
                            {k}: {v}
                          </li>
                        ))}
                    </ul>
                  )}
                  <div className="record-bottom">
                    <strong>
                      {x.price !== null
                        ? "TZS " + x.price.toLocaleString("en-US")
                        : sw
                          ? "Omba nukuu ya bei"
                          : "Request a quotation"}
                    </strong>
                    <a href={"/products/" + x.slug + "?lang=" + lang}>
                      {sw ? "Maelezo" : "Details"} ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalogue-empty">
              <h3>
                {sw
                  ? "Tuanzie kwenye orodha yako ya vifaa."
                  : "Start with your equipment schedule."}
              </h3>
              <p>
                {sw
                  ? "Hakuna rekodi ya bidhaa inayolingana iliyochapishwa hapa kwa sasa. Tuma modeli au vipimo unavyohitaji; hatujaweka bidhaa, bei au madai ya stock yasiyothibitishwa."
                  : "No matching product record is currently published here. Send the model or specification you need; unverified products, prices and stock claims are not listed."}
              </p>
              <EnquiryLink
                lang={lang}
                subject={q || "Equipment specification"}
              />
            </div>
          )}
        </section>
        {(page > 1 || records.length > 50) && (
          <nav
            className="section catalogue-pagination"
            aria-label={sw ? "Kurasa za bidhaa" : "Catalogue pages"}
          >
            {page > 1 && (
              <a href={pageLink(page - 1)}>
                ← {sw ? "Uliotangulia" : "Previous"}
              </a>
            )}
            {records.length > 50 && (
              <a href={pageLink(page + 1)}>{sw ? "Unaofuata" : "Next"} →</a>
            )}
          </nav>
        )}
        <section className="section equipment">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {sw ? "MWONGOZO WA MAOMBI" : "A MORE USEFUL EQUIPMENT ENQUIRY"}
              </p>
              <h2>
                {sw
                  ? "Taarifa sahihi.\nUchaguzi unaofaa."
                  : "The details behind\na better selection."}
              </h2>
            </div>
            <p className="section-intro">
              {sw
                ? "Haya ni makundi ya mahitaji, si modeli zinazodaiwa kuwa dukani."
                : "These are specification guides, not product listings or stock claims."}
            </p>
          </div>
          <div className="equipment-grid">
            {guides.map(([title, asset, body]) => (
              <article key={title}>
                <Photo asset={asset} lang={lang} />
                <div className="equipment-caption">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="brief-band">
          <div>
            <p className="eyebrow">
              {sw ? "REJAREJA / JUMLA" : "RETAIL / WHOLESALE"}
            </p>
            <h2>
              {sw
                ? "Kifaa kimoja.\nAu orodha nzima."
                : "One item.\nOr the whole schedule."}
            </h2>
          </div>
          <div>
            <p>
              {sw
                ? "Kwa rejareja, tuma modeli na idadi. Kwa jumla au taasisi, ongeza BOQ, ratiba na eneo la uwasilishaji. Bei na masharti huandaliwa kwa ombi husika."
                : "For retail, share the model and quantity. For trade or institutions, include your BOQ, required date and delivery location. Pricing and terms are specific to the enquiry."}
            </p>
            <div className="enquiry-pair">
              <EnquiryLink lang={lang} subject="Retail equipment" />
              <EnquiryLink lang={lang} subject="Equipment schedule" trade />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
