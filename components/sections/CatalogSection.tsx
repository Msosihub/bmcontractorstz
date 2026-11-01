import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import { formatCataloguePrice, type CatalogueProduct, type CataloguePackage } from "@/lib/catalogue";
type Copy = { packagesLabel: string; packagesTitle: string; productsLabel: string; productsTitle: string; productsText: string; viewAll: string };
export default function CatalogSection({ lang, t, packages, products }: { lang: Language; t: Copy; packages: CataloguePackage[]; products: CatalogueProduct[] }) {
 return <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 sm:py-24"><div className="mx-auto max-w-7xl">
 <div className="border-b border-slate-100 pb-16"><p className="text-xs font-black uppercase tracking-widest text-red-600">{t.packagesLabel}</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">{t.packagesTitle}</h2>
 <Link className="mt-5 inline-flex font-bold" href={`/cctv-packages?lang=${lang}`}>{t.viewAll}</Link>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{packages.slice(0,3).map(pkg => <article key={pkg.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
 <p className="text-sm font-bold">{pkg.cameras} {lang === "sw" ? "kamera" : "cameras"}</p><h3 className="mt-3 text-xl font-bold">{lang === "sw" ? pkg.titleSw || pkg.titleEn : pkg.titleEn}</h3>
 <p className="mt-3 text-sm text-slate-600">{lang === "sw" ? pkg.descriptionSw || pkg.descriptionEn : pkg.descriptionEn}</p><p className="mt-6 font-bold">{formatCataloguePrice(pkg.priceFrom,lang)}</p>
 <Link href={`/cctv-packages/${pkg.slug}?lang=${lang}`} className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">{lang === "sw" ? "Angalia kifurushi" : "View package"}</Link></article>)}</div></div>
 <div className="mt-16"><p className="text-xs font-black uppercase tracking-widest text-red-600">{t.productsLabel}</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">{t.productsTitle}</h2><p className="mt-4 max-w-2xl text-slate-600">{t.productsText}</p>
 <Link className="mt-5 inline-flex font-bold" href={`/products?lang=${lang}`}>{t.viewAll}</Link>
 {!products.length && <p className="mt-8">{lang === "sw" ? "Bidhaa zinaandaliwa. Wasiliana nasi kuhusu mahitaji yako." : "Products are being prepared. Contact us about your requirements."}</p>}
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0,3).map(product => <article key={product.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
 {product.imageUrl && <img src={product.imageUrl} alt={product.name} width={480} height={360} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-contain" />}
 {product.brand && <p className="mt-3 text-sm font-bold">{product.brand}</p>}
 <p className="mt-3 text-xs text-slate-600">{lang === "sw" ? product.category?.nameSw || product.category?.nameEn : product.category?.nameEn}</p><h3 className="mt-2 text-xl font-bold">{product.name}</h3>
 {lang === "sw" && product.description && <p className="mt-2 text-xs text-slate-600">Maelezo ya bidhaa hii bado yako kwa Kiingereza.</p>}<p lang="en" className="mt-3 text-sm text-slate-600">{product.description}</p>
 <p className="mt-6 font-bold">{formatCataloguePrice(product.price,lang)}</p><Link href={`/products/${product.slug}?lang=${lang}`} className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">{lang === "sw" ? "Angalia bidhaa" : "View product"}</Link></article>)}</div></div>
 </div></section>;
}
