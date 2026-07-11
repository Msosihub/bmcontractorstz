import { ShieldCheck, Eye, Wrench, Headphones } from "lucide-react";

export default function WhyChooseBM({ lang }: { lang: string }) {
  const icons = [ShieldCheck, Eye, Wrench, Headphones];

  const features = [
    {
      title: lang === "sw" ? "Bidhaa halisi" : "Genuine products",
      text:
        lang === "sw"
          ? "Hikvision, Tiandy na bidhaa nyingine za security kulingana na mahitaji ya project."
          : "Hikvision, Tiandy and other security products depending on project needs.",
    },
    {
      title: lang === "sw" ? "Site survey kwanza" : "Site survey first",
      text:
        lang === "sw"
          ? "Tunashauri baada ya kuelewa site, coverage na materials zinazohitajika."
          : "We recommend after understanding the site, coverage and required materials.",
    },
    {
      title:
        lang === "sw"
          ? "Installation ya kitaalamu"
          : "Professional installation",
      text:
        lang === "sw"
          ? "Mpangilio wa camera, cabling, setup na testing kwa umakini."
          : "Camera positioning, cabling, setup and testing done properly.",
    },
    {
      title: lang === "sw" ? "Support" : "Support",
      text:
        lang === "sw"
          ? "Msaada baada ya kazi kwa matumizi, troubleshooting na maintenance."
          : "After-sales help for usage, troubleshooting and maintenance.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-24">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header split layout */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-500">
              <span className="h-1.5 w-6 rounded-full bg-red-500" />
              {lang === "sw" ? "Kwa nini BM" : "Why Choose BM"}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.15]">
              {lang === "sw" ? (
                <>
                  Ushauri sahihi,{" "}
                  <span className="text-red-500">bidhaa bora</span> na
                  installation ya kueleweka
                </>
              ) : (
                <>
                  Practical guidance,{" "}
                  <span className="text-red-500">reliable products</span> and
                  professional installation
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-slate-400 lg:border-l-2 lg:border-slate-700 lg:pl-6">
              {lang === "sw"
                ? "Tunahakikisha usalama wako hauna mashaka kwa kutumia vifaa vya kisasa vinavyodumu na mafundi wenye uzoefu wa hali ya juu."
                : "We ensure your security remains absolute by deploying durable modern hardware alongside highly experienced technicians."}
            </p>
          </div>
        </div>

        {/* Content: Showcase Frame Image + Glassmorphic Cards Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:mt-16">
          {/* Visual Showcase Card using absolute root directory routing */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-2xl lg:col-span-4 lg:flex lg:flex-col lg:justify-between min-h-[320px] lg:min-h-full">
            {/* CORRECTED URL ROUTE PATH REFERENCE */}
            <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity bg-[url('/images/whyus.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />

            <div className="relative z-20">
              <span className="inline-flex items-center rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm animate-pulse">
                Live Feed
              </span>
            </div>

            <div className="relative z-20 mt-auto">
              <h4 className="text-lg font-black text-white tracking-wide">
                {lang === "sw" ? "Ulinzi wa Masaa 24" : "24/7 Premium Security"}
              </h4>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {lang === "sw"
                  ? "Mifumo thabiti inayokupa amani ya moyo popote ulipo duniani."
                  : "Uncompromising systems built to provide absolute peace of mind everywhere."}
              </p>
            </div>
          </div>

          {/* Premium Glassmorphic Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {features.map((item, index) => {
              const IconComponent = icons[index];
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/30 group-hover:bg-red-500/10 group-hover:text-red-500">
                    <IconComponent className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.text}
                  </p>

                  <span className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
