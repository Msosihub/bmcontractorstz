"use client";

import { useEffect, useId, useRef } from "react";

/** Continuous visible airflow; still photograph for reduced motion or no JavaScript. */
export function HeroAirflow() {
  const ref = useRef<HTMLDivElement>(null);
  const gradient = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      const running = visible && !document.hidden && !reduced.matches;
      el.dataset.airflow = running ? "running" : "paused";
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.2 });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={ref} className="hv-hero-air" data-airflow="paused" aria-hidden="true">
      <svg className="hv-air-desktop" viewBox="0 0 1440 760" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id={gradient + "-desktop"} x1="1220" y1="120" x2="830" y2="660" gradientUnits="userSpaceOnUse">
            <stop stopColor="#effbf6" stopOpacity="0.8" />
            <stop offset="0.48" stopColor="#bbe0d7" stopOpacity="0.65" />
            <stop offset="1" stopColor="#a5d1ca" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke={"url(#" + gradient + "-desktop)"} fill="none" strokeLinecap="round">
          <path className="hv-air-haze" d="M1200 136 C1150 185 1120 235 1060 285 S945 386 915 465 S860 570 820 620" />
          {[
            "M1168 141 C1115 184 1097 225 1032 272 S927 366 898 434 S850 525 796 578",
            "M1200 137 C1147 193 1128 241 1061 289 S955 386 927 456 S877 553 826 607",
            "M1232 132 C1176 195 1153 251 1090 304 S985 407 960 477 S912 579 864 635",
            "M1262 126 C1209 193 1188 258 1123 315 S1021 421 996 495 S948 595 903 652",
          ].map((d, i) => <path className={"hv-air-stream hv-air-stream-" + i} pathLength="1" d={d} key={d} />)}
        </g>
      </svg>
      <svg className="hv-air-mobile" viewBox="0 0 390 900" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id={gradient + "-mobile"} x1="260" y1="425" x2="100" y2="790" gradientUnits="userSpaceOnUse">
            <stop stopColor="#effbf6" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#c7e7df" stopOpacity="0.6" />
            <stop offset="1" stopColor="#a5d1ca" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke={"url(#" + gradient + "-mobile)"} fill="none" strokeLinecap="round">
          <path className="hv-air-haze" d="M252 429 C210 469 214 490 167 526 S122 584 106 621 S79 680 60 715" />
          {[
            "M231 433 C196 463 202 489 158 519 S111 575 99 606 S71 658 48 696",
            "M252 429 C216 468 222 495 178 530 S131 588 117 620 S91 676 68 714",
            "M275 425 C239 470 247 502 201 542 S154 602 139 639 S113 694 89 734",
          ].map((d, i) => <path className={"hv-air-stream hv-air-stream-" + i} pathLength="1" d={d} key={d} />)}
        </g>
      </svg>
    </div>
  );
}
