/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRight,
  Box,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

export default function CatalogSection({
  lang,
  t,
  packages,
  products,
  CctvPackageCard,
  ProductCard,
  LoadingLink,
  formatPriceLabel,
}: {
  lang: string;
  t: any;
  packages: any;
  CctvPackageCard: any;
  ProductCard: any;
  formatPriceLabel: any;
  products: any;
  LoadingLink: any;
}) {
  return (
    <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* ========================================================================= */}
        {/* SUBSECTION A: CCTV PACKAGES SHOWCASE BLOCK                                */}
        {/* ========================================================================= */}
        <div className="border-b border-slate-100 pb-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
                <span className="h-1.5 w-6 rounded-full bg-red-600" />
                {t.packagesLabel ||
                  (lang === "sw"
                    ? "Vifurushi Kamili"
                    : "Complete CCTV Packages")}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.15]">
                {t.packagesTitle ||
                  (lang === "sw"
                    ? "Chagua kifurushi sahihi cha ulinzi"
                    : "Turnkey packages designed for bulletproof security")}
              </h2>
            </div>
            <div className="flex lg:col-span-4 lg:justify-end">
              <LoadingLink
                href={`/cctv-packages?lang=${lang}`}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-red-600 shadow-md"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </LoadingLink>
            </div>
          </div>

          {/* CCTV Packages Loop Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages &&
              packages.slice(0, 3).map((pkg: any) => (
                <div
                  key={pkg.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-800 transition-colors group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-100">
                        <Layers className="h-5 w-5 stroke-[1.5]" />
                      </span>
                      <span className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-black text-red-600 uppercase tracking-wide">
                        {pkg.cameras || "4"} CAMERAS
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                      {lang === "sw" ? pkg.titleSw : pkg.titleEn}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                      {lang === "sw" ? pkg.descriptionSw : pkg.descriptionEn}
                    </p>

                    {/* Included Items Structural Token Checklist */}
                    {pkg.includedItems && (
                      <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4">
                        {pkg.includedItems
                          .slice(0, 3)
                          .map((feature: any, idx: any) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-xs font-medium text-slate-600"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200/60 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {lang === "sw" ? "Inaanza kutoka" : "Starting price"}
                      </p>
                      <p className="text-lg font-black text-slate-950">
                        {pkg.priceFrom ? pkg.priceFrom : "TZS ---"}
                      </p>
                    </div>
                    <LoadingLink
                      href={`/cctv-packages/${pkg.slug}?lang=${lang}`}
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-950 px-4 text-xs font-bold text-white transition-colors duration-200 group-hover:bg-red-600"
                    >
                      {lang === "sw" ? "Angalia" : "View Package"}
                    </LoadingLink>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION B: FEATURED TECH PRODUCTS CATALOG                              */}
        {/* ========================================================================= */}
        <div className="mt-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
                <span className="h-1.5 w-6 rounded-full bg-red-600" />
                {t.productsLabel}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.15]">
                {t.productsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {t.productsText}
              </p>
            </div>
            <div className="flex lg:col-span-4 lg:justify-end">
              <LoadingLink
                href={`/products?lang=${lang}`}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-red-600 shadow-md"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </LoadingLink>
            </div>
          </div>

          {/* Premium Hardware Products Loop Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products &&
              products.slice(0, 3).map((product: any) => (
                <div
                  key={product.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
                >
                  <div>
                    {/* Image Display Frame with absolute route fallback asset configuration */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 border border-slate-200/40">
                      <img
                        src={
                          product.imageUrl ||
                          "/images/products/fallback-product.jpg"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                        {product.brand || "Hikvision"}
                      </div>
                    </div>

                    <div className="px-2 pt-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-600">
                        {lang === "sw"
                          ? product?.category?.nameSw ||
                            product?.category?.nameEn ||
                            "Vifaa"
                          : product?.category?.nameEn || "Hardware"}
                      </p>
                      <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950 line-clamp-1 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                        {lang === "sw"
                          ? product.descriptionSw || product.description
                          : product.descriptionEn || product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 px-2 pt-4 flex items-center justify-between">
                    <p className="text-base font-black text-slate-950">
                      {lang === "sw"
                        ? formatPriceLabel(product.price, "sw")
                        : formatPriceLabel(product.price, "en")}
                    </p>
                    <LoadingLink
                      href={`/products/${product.slug}?lang=${lang}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors duration-200 group-hover:bg-red-600"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </LoadingLink>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
