"use client";
import { useEffect, useRef, useState } from "react";
/** Motion is enhancement only: all device/response information is server rendered. */
export function SafetyPulse({ sw }: { sw: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      el.dataset.running = String(
        visible && !document.hidden && !media.matches && !paused,
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [paused]);
  return (
    <div ref={root} className="fs-pulse" data-running="false">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="fs-pulse-art"
      >
        <defs>
          <linearGradient id="fs-silk" x1="0" x2="1" y1="0" y2=".5">
            <stop stopColor="#e4bf84" stopOpacity="0" />
            <stop offset=".24" stopColor="#cda269" stopOpacity=".35" />
            <stop offset=".55" stopColor="#fff0c9" />
            <stop offset=".78" stopColor="#f8bd70" stopOpacity=".8" />
            <stop offset="1" stopColor="#ffdba0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fs-exit" x1="0" x2="1">
            <stop stopColor="#9dd6c7" stopOpacity="0" />
            <stop offset=".6" stopColor="#bbe2cf" stopOpacity=".8" />
            <stop offset="1" stopColor="#a2cfbd" stopOpacity="0" />
          </linearGradient>
          <filter id="fs-soft">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <path
            id="fs-signal"
            d="M1290 195 C1210 215 1360 270 1280 320 S1000 360 985 435 C970 480 1120 430 1200 420 S1455 400 1500 440 C1575 500 1460 550 1370 580 S1275 655 1490 690"
          />
        </defs>
        <use
          href="#fs-signal"
          className="fs-silk-halo"
          stroke="url(#fs-silk)"
          strokeWidth="32"
          filter="url(#fs-soft)"
          fill="none"
        />
        <use
          href="#fs-signal"
          className="fs-silk-wide"
          stroke="url(#fs-silk)"
          strokeWidth="12"
          fill="none"
        />
        <use
          href="#fs-signal"
          className="fs-silk-core"
          stroke="url(#fs-silk)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="fs-egress"
          d="M1520 720 C1420 750 1250 715 1160 760 S900 805 780 820"
          stroke="url(#fs-exit)"
          strokeWidth="4"
          fill="none"
        />
        <ellipse
          className="fs-detect-glow"
          cx="1290"
          cy="195"
          rx="34"
          ry="15"
          fill="#ffe2a3"
          opacity=".15"
          filter="url(#fs-soft)"
        />
      </svg>
      <button
        type="button"
        className="fs-motion-control"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {sw
          ? paused
            ? "Endeleza mwanga"
            : "Simamisha mwanga"
          : paused
            ? "Resume light motion"
            : "Pause light motion"}
      </button>
    </div>
  );
}
