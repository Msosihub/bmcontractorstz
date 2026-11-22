"use client";

import { useEffect, useRef, useState } from "react";
import "./hero-light.css";

/** Decorative only. All content, imagery and links remain server rendered. */
export function HeroLight({ lang }: { lang: "en" | "sw" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false,
      dispose: (() => void) | undefined,
      idle: number | undefined;
    const start = () => {
      if (ref.current) ref.current.dataset.motionState = "scheduled";
      idle = window.requestIdleCallback(
        async () => {
          try {
            const { mountHeroLight } = await import("./hero-light");
            if (cancelled || !ref.current) return;
            const review =
              process.env.NODE_ENV === "development" &&
              new URLSearchParams(location.search).get("heroMotion") ===
                "canopy";
            ref.current.dataset.motionState = "initializing";
            dispose = mountHeroLight(
              ref.current,
              review ? "canopy" : "ribbons",
            );
          } catch {
            if (!cancelled && ref.current)
              ref.current.dataset.motionState = "static";
          }
        },
        { timeout: 1800 },
      );
    };
    const image = ref.current
      ?.closest(".bm-hero")
      ?.querySelector("picture img") as HTMLImageElement | undefined;
    if ("requestIdleCallback" in window) {
      if (image)
        image
          .decode()
          .catch(() => {})
          .then(() => {
            if (!cancelled) start();
          });
      else start();
    }
    return () => {
      cancelled = true;
      if (idle !== undefined) cancelIdleCallback(idle);
      dispose?.();
    };
  }, []);
  return (
    <>
      <div className="bm-hero-light" aria-hidden="true">
        <svg
          className="bm-hero-light-static"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id="bm-light-metal" x1="0" x2="1" y1="0" y2=".5">
              <stop stopColor="#267d78" />
              <stop offset=".3" stopColor="#b99663" />
              <stop offset=".58" stopColor="#f3debb" />
              <stop offset=".75" stopColor="#8e683c" />
              <stop offset="1" stopColor="#214b59" />
            </linearGradient>
          </defs>
          <path
            d="M1200 -80 C930 170 1500 390 1250 640 S1260 930 1530 1040 L1630 1020 C1310 800 1390 800 1410 620 S1140 220 1350 -70Z"
            fill="url(#bm-light-metal)"
            opacity=".56"
          />
          <path
            d="M1350 -90 C1120 220 1570 390 1410 740"
            fill="none"
            stroke="#79b7b5"
            strokeWidth="3"
            opacity=".35"
          />
        </svg>
        <canvas
          ref={ref}
          className="bm-hero-light-canvas"
          data-motion-state="static"
        />
      </div>
      <button
        className="bm-hero-light-toggle"
        type="button"
        aria-pressed={paused}
        aria-label={
          lang === "sw"
            ? "Sitisha mwendo wa mwanga"
            : "Pause hero light animation"
        }
        onClick={() => {
          const next = !paused;
          setPaused(next);
          ref.current?.dispatchEvent(
            new CustomEvent("bm:hero-pause", { detail: next }),
          );
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          {paused ? (
            <path d="M5 3 12 8 5 13Z" fill="currentColor" />
          ) : (
            <path d="M5 3V13M11 3V13" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>
    </>
  );
}
