"use client";
import { useEffect, useRef } from "react";
/** Bounded 4.6s path sequence. Native controls and all system meanings work without JavaScript. */
export function CampusFlow({ sw }: { sw: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false,
      finished = false,
      timer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      const run = visible && !document.hidden && !reduce.matches && !finished;
      el.dataset.running = String(run);
      if (run && !timer)
        timer = setTimeout(() => {
          finished = true;
          el.dataset.running = "false";
        }, 4600);
      if (!run && timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };
    const observer = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <div ref={ref} className="sc-flow" data-running="false">
      <fieldset>
        <legend>
          {sw ? "Chagua sehemu ya siku ya shule" : "Explore a school day"}
        </legend>
        {["arrival", "learning", "boarding"].map((id, i) => (
          <span key={id}>
            <input
              type="radio"
              name="school-day"
              id={"sc-" + id}
              defaultChecked={i === 0}
            />
            <label htmlFor={"sc-" + id}>
              {
                (sw
                  ? ["Kuwasili", "Masomo", "Bwenini"]
                  : ["Arrival", "Learning", "Boarding"])[i]
              }
            </label>
          </span>
        ))}
        <div className="sc-campus-drawing">
          <svg
            viewBox="0 0 640 340"
            role="img"
            aria-label={
              sw
                ? "Mchoro wa mifumo huru katika geti, madarasa na bweni"
                : "Independent systems serving the gate, classrooms and boarding block"
            }
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M30 295H610M70 295V188H182V295M212 295V110H420V295M456 295V164H590V295" />
              <path d="M54 188L126 147L196 188M196 110L316 57L436 110M442 164L523 123L604 164" />
              <path d="M98 295V241H151V295M286 295V224H344V295M499 295V240H548V295" />
              {[235, 285, 335, 385].map((x) => (
                <path key={x} d={`M${x} 145h17v27h-17z`} />
              ))}
              <path d="M477 191h23v24h-23zM546 191h23v24h-23zM34 258H70M182 258H212M420 258H456" />
            </g>
            <g fill="none" strokeWidth="3" className="sc-signal">
              <path className="sc-path sc-arrival" d="M34 319V204H126V179" />
              <path className="sc-path sc-learning" d="M316 319V197H385V174" />
              <path
                className="sc-path sc-boarding"
                d="M610 319H567V224H523V190"
              />
            </g>
          </svg>
          <div className="sc-zone-labels">
            <span>{sw ? "Geti" : "Gate"}</span>
            <span>{sw ? "Madarasa" : "Classrooms"}</span>
            <span>{sw ? "Bweni" : "Boarding"}</span>
          </div>
          <div className="sc-state sc-state-arrival">
            <strong>
              {sw ? "Kuingia kwa utaratibu." : "An orderly arrival."}
            </strong>
            <p>
              {sw
                ? "CCTV na intercom husaidia uangalizi; geti huhitaji vihisio na utaratibu salama wa kuingilia."
                : "CCTV and intercoms support supervision; powered gates need appropriate sensors and safe access procedures."}
            </p>
          </div>
          <div className="sc-state sc-state-learning">
            <strong>
              {sw ? "Mtandao na mawasiliano." : "Connected learning."}
            </strong>
            <p>
              {sw
                ? "Wi-Fi, CAT6/fibre, PA na taa hupangwa kulingana na majengo na matumizi halisi."
                : "Wi-Fi, CAT6/fibre, PA and lighting are planned around the buildings and actual use."}
            </p>
          </div>
          <div className="sc-state sc-state-boarding">
            <strong>
              {sw
                ? "Utayari hata baada ya masomo."
                : "Readiness beyond the school day."}
            </strong>
            <p>
              {sw
                ? "Utambuzi na tahadhari ya moto, njia za kutokea na umeme wa akiba hutathminiwa kama mifumo tofauti."
                : "Fire detection and warnings, escape routes and backup power are assessed as separate systems."}
            </p>
          </div>
        </div>
      </fieldset>
      <p className="sc-fine">
        {sw
          ? "Mchoro wa mpangilio. Miunganisho na utangamano huthibitishwa kwa kila mfumo."
          : "Planning diagram. Interfaces and compatibility are verified system by system."}
      </p>
    </div>
  );
}
