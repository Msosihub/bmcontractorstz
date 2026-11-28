"use client";
import { useEffect, useRef } from "react";
import Image from "@/components/media/ReliableLocalImage";
/** Photographic campus exploration; native controls work without JS. A bounded highlight stops offscreen/hidden. */
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
        <div className="sc-campus-photo">
          <div className="sc-campus-scene">
            <Image
              src="/images/schools/campus-overview-v2.webp"
              width={1536}
              height={1024}
              sizes="(max-width:760px) 89vw, 43vw"
              alt={
                sw
                  ? "Mandhari ya shule yenye lango, majengo ya madarasa na jengo la bweni"
                  : "School campus with an entrance, classroom buildings and a boarding wing"
              }
            />
            <div className="sc-campus-pins" aria-hidden="true">
              <span className="sc-pin sc-pin-arrival">
                <b>01</b>
                <span>{sw ? "Geti" : "Entrance"}</span>
              </span>
              <span className="sc-pin sc-pin-learning">
                <b>02</b>
                <span>{sw ? "Madarasa" : "Classrooms"}</span>
              </span>
              <span className="sc-pin sc-pin-boarding">
                <b>03</b>
                <span>{sw ? "Bweni" : "Boarding"}</span>
              </span>
            </div>
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
          ? "Kila mfumo hutathminiwa kivyake. Miunganisho huthibitishwa wakati wa usanifu."
          : "Each system is assessed separately. Interfaces are confirmed during design."}
      </p>
    </div>
  );
}
