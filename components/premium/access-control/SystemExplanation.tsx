"use client";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n/config";
/** Finite, opt-in sequence. Static labels and manual steps remain usable without motion. */
export function SystemExplanation({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    ref = useRef<HTMLElement>(null),
    [step, setStep] = useState(0),
    [playing, setPlaying] = useState(false),
    [reduced, setReduced] = useState(false),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    change();
    media.addEventListener("change", change);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setPlaying(false);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    const hide = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      media.removeEventListener("change", change);
      observer.disconnect();
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = setTimeout(() => {
      if (step === 3) setPlaying(false);
      else setStep(step + 1);
    }, 2200);
    return () => clearTimeout(timer);
  }, [playing, reduced, visible, step]);
  const labels = sw
    ? ["Tambua mtu", "Hakiki ruhusa", "Ruhusu mlango", "Hifadhi tukio"]
    : ["Identify", "Check permission", "Release the door", "Record the event"];
  const descriptions = sw
    ? [
        "Kadi, PIN au biometriki inayokubalika hutambulisha mtumiaji.",
        "Controller au terminal yenye controller ya ndani huangalia ruhusa na ratiba.",
        "Kufuli huruhusu kuingia kwa kanuni zilizowekwa. Kutoka dharura kuna mpango wake.",
        "Sensor hutoa hali ya mlango. Matukio hutumwa kwa programu inayooana; si malipo ya mshahara.",
      ]
    : [
        "A supported card, PIN or biometric identifies the user.",
        "A protected controller—or a standalone terminal with an internal controller—checks permissions and schedules.",
        "The specified lock releases according to the approved rules. Emergency exit has its own planned release arrangement.",
        "The door sensor reports status. Events reach compatible management software; this is not automatic payroll processing.",
      ];
  return (
    <section
      ref={ref}
      className="ac-section ac-system"
      aria-labelledby="ac-system-title"
    >
      <div className="ac-heading">
        <div>
          <p className="eyebrow">
            {sw
              ? "MFUMO MZIMA, KWA UANGALIFU"
              : "THE COMPLETE SYSTEM, CONSIDERED"}
          </p>
          <h2 id="ac-system-title">
            {sw ? "Zaidi ya kifaa mlangoni." : "More than a device on a door."}
          </h2>
        </div>
        <p>
          {sw
            ? "Fuata hatua za kuingia. Huu ni mchoro wa kuelewa mfumo, si maelekezo ya kuunganisha nyaya."
            : "Follow one arrival. This is a system explanation, not a wiring or life-safety installation plan."}
        </p>
      </div>
      <div
        className="ac-diagram"
        tabIndex={0}
        role="region"
        aria-label={
          sw ? "Mchoro na hatua za mfumo" : "System diagram and steps"
        }
        data-step={step}
        data-playing={playing && !reduced}
      >
        <svg
          viewBox="0 0 1000 360"
          role="img"
          aria-labelledby="ac-diagram-title ac-diagram-desc"
        >
          <title id="ac-diagram-title">
            {sw
              ? "Mpangilio wa udhibiti wa mlango"
              : "Door access system architecture"}
          </title>
          <desc id="ac-diagram-desc">
            {sw
              ? "Reader huwasiliana na controller, ambayo hudhibiti kufuli. Sensor na exit button hutoa taarifa kwa controller. Umeme wa akiba hulisha vifaa; mtandao huunganisha programu."
              : "Reader communicates with controller; controller operates lock. Door sensor and exit button are inputs to controller. Backup power supplies equipment and network connects software."}
          </desc>
          <g
            className="ac-wires"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M230 120H370M530 120H720M450 170V235M800 235V210H565V145H530" />
            <path
              d="M150 235V190H800V170M450 190V170M150 190V170"
              strokeDasharray="6 7"
            />
          </g>
          <g className="ac-node" data-active={step === 0}>
            <rect x="70" y="70" width="160" height="100" rx="8" />
            <rect x="126" y="84" width="48" height="40" rx="4" />
            <text x="150" y="151" textAnchor="middle">
              {sw ? "Reader / terminal" : "Reader / terminal"}
            </text>
          </g>
          <g className="ac-node" data-active={step === 1}>
            <rect x="370" y="70" width="160" height="100" rx="8" />
            <path d="M418 90h64v38h-64zM428 84v12m12-12v12m12-12v12m12-12v12M428 122v12m12-12v12m12-12v12m12-12v12" />
            <text x="450" y="151" textAnchor="middle">
              Controller
            </text>
          </g>
          <g className="ac-node" data-active={step === 2}>
            <rect x="720" y="70" width="160" height="100" rx="8" />
            <path d="M780 130V85h42v45m-8-23h-5" />
            <text x="800" y="151" textAnchor="middle">
              {sw ? "Kufuli" : "Electric lock"}
            </text>
          </g>
          <g className="ac-node">
            <rect x="70" y="235" width="160" height="70" rx="8" />
            <text x="150" y="264" textAnchor="middle">
              {sw ? "Umeme + backup" : "Power + backup"}
            </text>
            <text x="150" y="286" textAnchor="middle" className="ac-small">
              {sw ? "vifaa vinavyofaa" : "sized for the system"}
            </text>
          </g>
          <g className="ac-node" data-active={step === 3}>
            <rect x="370" y="235" width="160" height="70" rx="8" />
            <text x="450" y="264" textAnchor="middle">
              {sw ? "Mtandao / programu" : "Network / software"}
            </text>
            <text x="450" y="286" textAnchor="middle" className="ac-small">
              {sw ? "usimamizi na matukio" : "management & events"}
            </text>
          </g>
          <g className="ac-node">
            <rect x="720" y="235" width="160" height="70" rx="8" />
            <text x="800" y="264" textAnchor="middle">
              {sw ? "Sensor + exit button" : "Sensor + exit button"}
            </text>
            <text x="800" y="286" textAnchor="middle" className="ac-small">
              {sw ? "taarifa kwa controller" : "inputs to controller"}
            </text>
          </g>
          <circle
            className="ac-signal"
            r="5"
            cx="0"
            cy="0"
            fill="#dceac5"
            aria-hidden="true"
            key={step}
          />
        </svg>
        <div className="ac-mobile-system">
          <ol
            className="ac-mobile-flow"
            aria-label={sw ? "Njia ya kuingia" : "Entry sequence"}
          >
            {[
              sw ? "Reader / terminal" : "Reader / terminal",
              "Controller",
              sw ? "Kufuli" : "Electric lock",
            ].map((label, i) => (
              <li data-active={step === i} key={label}>
                <span>0{i + 1}</span>
                <b>{label}</b>
                {i < 2 && <i aria-hidden="true">↓</i>}
              </li>
            ))}
          </ol>
          <div className="ac-mobile-inputs">
            <div>
              <b>{sw ? "Umeme + backup" : "Power + backup"}</b>
              <p>
                {sw
                  ? "Hulisha vifaa vinavyofaa."
                  : "Supplies the specified equipment."}
              </p>
            </div>
            <div>
              <b>{sw ? "Sensor + exit button" : "Sensor + exit button"}</b>
              <p>
                {sw
                  ? "Hutuma taarifa kwa controller."
                  : "Send inputs to the controller."}
              </p>
            </div>
            <div data-active={step === 3}>
              <b>{sw ? "Mtandao + programu" : "Network + software"}</b>
              <p>
                {sw ? "Usimamizi na matukio." : "Management and event records."}
              </p>
            </div>
          </div>
        </div>

        <div
          className="ac-step-buttons"
          role="group"
          aria-label={sw ? "Hatua za mfumo" : "System steps"}
        >
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={i === step}
              onClick={() => {
                setPlaying(false);
                setStep(i);
              }}
            >
              <span>0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <noscript>
          <ol>
            {labels.map((label, i) => (
              <li key={label}>
                <strong>{label}</strong>: {descriptions[i]}
              </li>
            ))}
          </ol>
        </noscript>
        <p className="ac-step-copy" aria-live="polite" aria-atomic="true">
          {descriptions[step]}
        </p>
        <button
          type="button"
          className="button dark"
          disabled={reduced}
          onClick={() => {
            if (playing) setPlaying(false);
            else {
              if (step === 3) setStep(0);
              setPlaying(true);
            }
          }}
        >
          {reduced
            ? sw
              ? "Tumia hatua hapo juu"
              : "Use the steps above"
            : playing
              ? sw
                ? "Sitisha maelezo"
                : "Pause explanation"
              : sw
                ? "Onyesha hatua"
                : "Play explanation"}{" "}
          {!reduced && (playing ? "Ⅱ" : "▷")}
        </button>
      </div>
      <p className="ac-note">
        {sw
          ? "Magnetic lock au electric strike huchaguliwa kwa mlango husika. Exit button, emergency release, moto na namna ya kufuli kufanya kazi umeme ukikatika hutathminiwa kabla ya ufungaji."
          : "Magnetic locks and electric strikes are selected for the door. Exit buttons, emergency release, fire-alarm interfaces and fail-safe/fail-secure behaviour require a site-specific assessment."}
      </p>
    </section>
  );
}
