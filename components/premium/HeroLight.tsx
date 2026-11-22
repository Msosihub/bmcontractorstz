"use client";

import { useEffect, useRef } from "react";
import "./hero-light.css";

/** Decorative only. All content, imagery and links remain server rendered. */
export function HeroLight({ lang }: { lang: "en" | "sw" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false,
      paused = false,
      dispose: (() => void) | undefined,
      idle: number | undefined;
    const start = () => {
      if (ref.current) ref.current.dataset.motionState = "scheduled";
      idle = window.requestIdleCallback(
        async () => {
          try {
            const { mountHeroLight } = await import("./hero-light");
            if (cancelled || !ref.current) return;
            ref.current.dataset.motionState = "initializing";
            dispose = mountHeroLight(ref.current);
            if (paused)
              ref.current.dispatchEvent(
                new CustomEvent("bm:hero-pause", { detail: true }),
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
    const pauseShortcut = (event: KeyboardEvent) => {
      if (
        !event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.code !== "KeyP"
      )
        return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("input,textarea,select,[contenteditable=true]")
      )
        return;
      event.preventDefault();
      if (event.repeat) return;
      paused = !paused;
      ref.current?.dispatchEvent(
        new CustomEvent("bm:hero-pause", { detail: paused }),
      );
    };
    window.addEventListener("keydown", pauseShortcut);
    return () => {
      cancelled = true;
      if (idle !== undefined) cancelIdleCallback(idle);
      dispose?.();
      window.removeEventListener("keydown", pauseShortcut);
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
      <span id="bm-hero-motion-help" className="bm-hero-motion-help">
        {lang === "sw"
          ? "Bonyeza Alt+P kusitisha au kuendeleza mwendo wa mwanga."
          : "Press Alt+P to pause or resume the light animation."}
      </span>
    </>
  );
}
