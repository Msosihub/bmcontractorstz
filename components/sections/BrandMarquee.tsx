// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BrandMarquee({ lang, t }: { lang: string; t: any }) {
  // Triple copy for extra safe continuous infinite wrap on huge viewports
  const marqueeItems = [...t.brandNames, ...t.brandNames, ...t.brandNames];

  return (
    <section className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-slate-900/60 py-6 backdrop-blur-md">
      {/* High-end Masking Layers: Fades text away near screen bounds flawlessly on mobile */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-32" />

      {/* Scroller Frame Container */}
      <div className="flex overflow-hidden">
        {/* Track Wrap: Runs loop continuously */}
        <div className="flex w-max shrink-0 animate-marquee items-center gap-4 pr-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3.5 transition duration-200 hover:border-red-500/30 hover:bg-white/[0.04]"
            >
              {/* Active pulsing technical state badge */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>

              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-200 sm:text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
