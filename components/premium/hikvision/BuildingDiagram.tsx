"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n/config";
import { diagram } from "./content";

export function BuildingDiagram({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCanPlay(!motion.matches);
      if (motion.matches || document.hidden) setPlaying(false);
    };
    sync();
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    if (region.current) observer.observe(region.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active === diagram.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 1750);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  return (
    <div className="hv-diagram" ref={region}>
      <svg viewBox="0 0 550 270" aria-hidden="true" focusable="false">
        <path
          className="hv-building"
          d="M55 244H495 M92 244V99L274 36L458 99V244 M117 93V237 M432 93V237 M118 105H432 M118 192H432 M194 105V192 M354 105V192 M212 244V111H336V244 M246 244V196H303V244 M127 222H180V202H127Z M369 222H420V202H369Z"
        />
        {diagram.map((item, index) => (
          <g key={item.path} data-active={active === index}>
            <path className="hv-signal" d={item.path} pathLength="100" />
            <circle cx={item.point[0]} cy={item.point[1]} r="12" />
            <text x={item.point[0]} y={item.point[1] + 4} textAnchor="middle">
              {index + 1}
            </text>
            {active === index && playing && (
              <path
                key={active}
                className="hv-pulse"
                d={item.path}
                pathLength="100"
              />
            )}
          </g>
        ))}
      </svg>
      <div className="hv-steps">
        {diagram.map((item, index) => (
          <div key={item.path}>
            <button
              type="button"
              aria-pressed={index === active}
              onClick={() => {
                setPlaying(false);
                setActive(index);
              }}
            >
              {index + 1}. {item.name[lang]}
            </button>
            <p>{item.detail[lang]}</p>
          </div>
        ))}
      </div>
      {canPlay && (
        <button
          className="hv-play"
          type="button"
          onClick={() => {
            if (playing) setPlaying(false);
            else {
              setActive(0);
              setPlaying(true);
            }
          }}
        >
          {playing
            ? sw
              ? "Sitisha onyesho"
              : "Pause walkthrough"
            : sw
              ? "Cheza onyesho la mfumo"
              : "Play system walkthrough"}
        </button>
      )}
    </div>
  );
}
