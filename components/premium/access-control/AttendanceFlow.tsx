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
      data-playing={playing && visible && !reduced}
      aria-labelledby="attendance-flow-title"
    >
      <p className="eyebrow">
        {sw ? "KUTOKA MASHINENI HADI RIPOTI" : "FROM A PUNCH TO A REPORT"}
      </p>
      <h2 id="attendance-flow-title">
        {sw ? "Fuata rekodi moja." : "Follow one attendance record."}
      </h2>
      <p className="ac-flow-intro">
        {sw
          ? "Kutoka mashineni hadi kwa msimamizi. Bonyeza kuonyesha mtiririko au chagua hatua yoyote."
          : "From the attendance machine to your manager. Play the sequence or choose any step."}
      </p>
      <svg
        className="ac-flow-diagram"
        viewBox="0 0 720 130"
        aria-hidden="true"
        focusable="false"
      >
        <path className="ac-flow-track" d="M74 111H646" />
        <path className="ac-flow-progress" d={`M74 111H${74 + step * 143}`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g
            key={i}
            transform={`translate(${74 + i * 143} 65)`}
            data-active={i === step}
          >
            <circle className="ac-flow-halo" r="43" />
            <circle className="ac-flow-node" r="32" />
            <g
              className="ac-flow-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {i === 0 && (
                <>
                  <rect x="-14" y="-20" width="28" height="40" rx="4" />
                  <path d="M-7-12H7M-5 2a5 5 0 0 1 10 0v7M-2 1v9M2 13v-6" />
                </>
              )}
              {i === 1 && (
                <>
                  <path d="M-21-7a30 30 0 0 1 42 0M-14 1a20 20 0 0 1 28 0M-6 9a9 9 0 0 1 12 0" />
                  <circle cy="17" r="1" />
                </>
              )}
              {i === 2 && (
                <>
                  <rect x="-18" y="-19" width="36" height="16" rx="3" />
                  <rect x="-18" y="3" width="36" height="16" rx="3" />
                  <path d="M-10-11h1M-4-11H9M-10 11h1M-4 11H9" />
                </>
              )}
              {i === 3 && (
                <>
                  <rect x="-21" y="-16" width="42" height="28" rx="3" />
                  <path d="M0 12v8M-10 20h20M-8-2l5 5 11-11" />
                </>
              )}
              {i === 4 && (
                <>
                  <path d="M-14-21H7l9 9v33h-30zM7-21v10h9M-7 12V5M0 12V-2M7 12V1" />
                </>
              )}
            </g>
          </g>
        ))}
        <circle
          className="ac-flow-packet"
          r="5"
          cy="111"
          cx="74"
          style={{ transform: `translateX(${step * 143}px)` }}
        />
      </svg>
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
          aria-pressed={playing}
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
