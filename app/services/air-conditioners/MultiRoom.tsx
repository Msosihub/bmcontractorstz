"use client";
import { useEffect, useRef } from "react";
import Image from "@/components/media/ReliableLocalImage";
/** Native radio controls remain useful without JS. A single bounded flow sequence enhances the diagram. */
export function MultiRoom({ sw }: { sw: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false,
      finished = false,
      timer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      const running =
        visible && !document.hidden && !reduced.matches && !finished;
      el.dataset.running = String(running);
      if (running && !timer)
        timer = setTimeout(() => {
          finished = true;
          el.dataset.running = "false";
        }, 4600);
      if (!running && timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <div ref={ref} className="hv-multi-demo" data-running="false">
      <fieldset className="hv-room-controls">
        <legend>
          {sw ? "Tazama matumizi ya vyumba" : "Explore room-by-room use"}
        </legend>
        <input
          className="hv-native-radio"
          id="hv-all"
          type="radio"
          name="climate-zones"
          defaultChecked
        />
        <label htmlFor="hv-all">{sw ? "Vyumba vyote" : "All rooms"}</label>
        <input
          className="hv-native-radio"
          id="hv-evening"
          type="radio"
          name="climate-zones"
        />
        <label htmlFor="hv-evening">
          {sw ? "Wakati wa kupumzika" : "Evening"}
        </label>
        <input
          className="hv-native-radio"
          id="hv-work"
          type="radio"
          name="climate-zones"
        />
        <label htmlFor="hv-work">{sw ? "Wakati wa kazi" : "Workday"}</label>
      </fieldset>
      <div className="hv-building">
        <Image
          src="/images/air-conditioning/multiroom.webp"
          alt={
            sw
              ? "Mfano wa nyumba yenye vyumba vinne, vifaa vinne vya ndani na kifaa kimoja cha nje"
              : "Four-room building concept with four indoor units and one outdoor unit"
          }
          width={1672}
          height={941}
          sizes="(max-width:760px) 94vw, 90vw"
        />
        <svg
          viewBox="0 0 1200 675"
          aria-hidden="true"
          className="hv-connections"
        >
          <defs>
            <linearGradient id="hv-flow">
              <stop stopColor="#b89967" />
              <stop offset="1" stopColor="#458c8a" />
            </linearGradient>
          </defs>
          {[
            ["bed", "M1040 516 C1010 480 1035 350 980 300 S725 290 570 168"],
            ["study", "M1040 516 C1060 420 1020 300 980 250 S865 208 840 154"],
            ["living", "M1040 516 C1000 505 940 470 890 460 S660 430 570 376"],
            ["guest", "M1040 516 C1000 500 960 450 920 435 S885 415 860 395"],
          ].map(([key, d]) => (
            <g className={"hv-zone hv-zone-" + key} key={key}>
              <path className="hv-pipe-underlay" d={d} />
              <path className="hv-flow" d={d} />
            </g>
          ))}
        </svg>
      </div>
      <div
        className="hv-zone-key"
        aria-label={sw ? "Maeneo kwenye mfano" : "Illustrated zones"}
      >
        {[
          sw ? "Chumba kikuu" : "Main bedroom",
          sw ? "Ofisi ya nyumbani" : "Home office",
          sw ? "Sebule" : "Living room",
          sw ? "Chumba cha wageni" : "Guest bedroom",
        ].map((s, i) => (
          <span key={s}>
            <i aria-hidden="true">0{i + 1}</i>
            {s}
          </span>
        ))}
      </div>
      <p className="hv-caption">
        {sw
          ? "Mfano wa maeneo manne—si ramani ya mabomba. Idadi ya vifaa, udhibiti na matumizi ya pamoja hutegemea modeli na mchanganyiko ulioruhusiwa. Maji ya condensate, umeme na ufikivu wa huduma hupangwa tofauti."
          : "Four-zone concept—not a piping plan. Unit count, controls and simultaneous demand depend on the approved model combination. Condensate drainage, electrical supply and service access are designed separately."}
      </p>
    </div>
  );
}
