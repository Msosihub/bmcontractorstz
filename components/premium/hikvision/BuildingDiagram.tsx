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
      <svg viewBox="0 0 560 285" aria-hidden="true" focusable="false">
        <defs>
          <pattern
            id="hv-drafting"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0H0V20"
              fill="none"
              stroke="#493b36"
              strokeWidth=".65"
            />
          </pattern>
        </defs>
        <rect width="560" height="285" fill="url(#hv-drafting)" />
        <path d="M42 253H522M66 261H493" stroke="#81695d" fill="none" />
        <path
          d="M116 246V106L176 73H349L449 104V246Z"
          fill="#50413a"
          stroke="#b99a86"
        />
        <path d="M176 73H349L449 104H116Z" fill="#836858" stroke="#c5a692" />
        <path d="M157 114H412V243H157Z" fill="#2e2b29" stroke="#a38978" />
        <path
          d="M163 125H249V176H163ZM321 125H404V176H321ZM164 188H218V239H164ZM366 188H404V239H366Z"
          fill="#706052"
          stroke="#ad907c"
        />
        <path d="M250 244V119H320V244Z" fill="#423a35" stroke="#ae8e7b" />
        <path
          d="M263 243V190H308V243ZM285 190V243M176 125V176M190 125V176M389 125V176M376 125V176M163 149H249M321 149H404"
          fill="none"
          stroke="#ad907c"
        />
        <path d="M231 174L285 157L337 174Z" fill="#8d6c59" stroke="#c5a692" />
        {diagram.map((item, index) => (
          <g key={item.path} data-active={active === index}>
            <path className="hv-signal" d={item.path} pathLength="100" />
            <rect
              className="hv-endpoint"
              x={item.end[0] - 4}
              y={item.end[1] - 4}
              width="8"
              height="8"
              rx="2"
            />
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
