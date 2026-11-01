import type { Language } from "@/lib/i18n/config";
/** Customer requirements, never fabricated reviews or ratings. */
export default function TestimonialsSection({ lang }: { lang: Language }) {
 const copy = lang === "sw" ? { title: "Mambo muhimu kabla ya kuchagua mfumo", items: ["Ushauri kuhusu vifaa vinavyofaa kwa eneo lako.", "Makadirio ya gharama yanayoeleza vifaa na kazi.", "Mpango wa ufungaji, majaribio na msaada baada ya kazi."] } : { title: "What to consider before choosing a system", items: ["Guidance on equipment suited to your site.", "A quotation that explains equipment and installation work.", "A clear plan for installation, testing and after-sales support."] };
 return <section className="bg-slate-900 px-4 py-16 text-white sm:px-6"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-black">{copy.title}</h2><ul className="mt-8 grid gap-6 md:grid-cols-3">{copy.items.map(item => <li key={item} className="rounded-3xl border border-white/10 p-6 text-slate-200">{item}</li>)}</ul></div></section>;
}
