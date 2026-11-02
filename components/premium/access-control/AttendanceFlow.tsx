"use client";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n/config";
/** Finite, opt-in and manual. Stops offscreen/hidden; no data leaves the browser. */
export function AttendanceFlow({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    ref = useRef<HTMLElement>(null),
    [step, setStep] = useState(0),
    [playing, setPlaying] = useState(false),
    [reduced, setReduced] = useState(false),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReduced(m.matches);
      if (m.matches) setPlaying(false);
    };
    change();
    m.addEventListener("change", change);
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (!e.isIntersecting) setPlaying(false);
      },
      { threshold: 0.15 },
    );
    if (ref.current) io.observe(ref.current);
    const hide = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      m.removeEventListener("change", change);
      io.disconnect();
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = setTimeout(() => {
      if (step === 4) setPlaying(false);
      else setStep(step + 1);
    }, 2200);
    return () => clearTimeout(timer);
  }, [playing, reduced, visible, step]);
  const steps = sw
    ? [
        ["Mashine", "Mfanyakazi anarekodi kwa njia iliyosajiliwa."],
        ["Mtandao", "LAN au muunganisho wa mbali hufikisha rekodi."],
        [
          "Seva ya BioTime",
          "Hukusanya na kuchakata kwa kanuni na zamu zilizowekwa.",
        ],
        ["Kivinjari cha msimamizi", "Mwenye ruhusa hukagua tofauti na idhini."],
        [
          "Ripoti",
          "Toa ripoti au export iliyokubaliwa; si malipo ya moja kwa moja.",
        ],
      ]
    : [
        [
          "Attendance terminal",
          "A staff member records a punch using an enrolled method.",
        ],
        ["Network", "LAN or a configured remote link carries the event."],
        [
          "BioTime server",
          "Collects events and applies configured shifts and rules.",
        ],
        [
          "Manager browser",
          "An authorized manager reviews exceptions and approvals.",
        ],
        ["Reports", "Issue reports or an agreed export; no automatic payment."],
      ];
  return (
    <section
      ref={ref}
      className="ac-section ac-attendance-flow"
      aria-labelledby="attendance-flow-title"
    >
      <p className="eyebrow">
        {sw ? "KUTOKA MASHINENI HADI RIPOTI" : "FROM A PUNCH TO A REPORT"}
      </p>
      <h2 id="attendance-flow-title">
        {sw ? "Fuata rekodi moja." : "Follow one attendance record."}
      </h2>
      <ol className="ac-flow-steps">
        {steps.map(([title, body], i) => (
          <li key={title} data-active={step === i}>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <div className="ac-flow-controls">
        <button
          type="button"
          disabled={reduced}
          onClick={() => {
            if (step === 4) setStep(0);
            setPlaying(!playing);
          }}
        >
          {playing
            ? sw
              ? "Sitisha"
              : "Pause"
            : sw
              ? "Onyesha mtiririko"
              : "Play workflow"}
        </button>
        {steps.map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-current={step === i ? "step" : undefined}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
          >
            {i + 1}. {title}
          </button>
        ))}
      </div>
      <p className="ac-note" aria-live="polite">
        {sw ? "Hatua" : "Step"} {step + 1}: {steps[step][1]}{" "}
        {reduced &&
          (sw
            ? "Mwendo umezimwa kwa mapendeleo yako; tumia hatua kwa mkono."
            : "Motion is disabled by your preference; select steps manually.")}
      </p>
      <noscript>
        <p>
          {sw
            ? "Hatua zote zinaelezwa hapo juu bila uhuishaji."
            : "All five stages are explained above without animation."}
        </p>
      </noscript>
    </section>
  );
}
