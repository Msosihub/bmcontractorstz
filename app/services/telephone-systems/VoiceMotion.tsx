"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
/** CSS/SVG only: no frame loop, canvas, WebGL or animation dependency. SSR is static. */
export function VoiceMotion({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false,
      paused = false;
    const update = () => {
      node.dataset.motion =
        visible && !document.hidden && !reduced.matches && !paused
          ? "running"
          : "static";
      node.dataset.reason = document.hidden
        ? "hidden"
        : !visible
          ? "offscreen"
          : reduced.matches
            ? "reduced"
            : paused
              ? "manual"
              : "visible";
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              update();
            },
            { threshold: 0.08 },
          );
    observer?.observe(node);
    if (!observer) visible = true;
    const key = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "p") {
        paused = !paused;
        update();
        e.preventDefault();
      }
    };
    document.addEventListener("visibilitychange", update);
    document.addEventListener("keydown", key);
    reduced.addEventListener("change", update);
    update();
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("keydown", key);
      reduced.removeEventListener("change", update);
      node.dataset.motion = "static";
    };
  }, []);
  return (
    <div ref={ref} className={className} data-motion="static">
      {children}
    </div>
  );
}
export function VoiceRibbons() {
  return (
    <VoiceMotion className="tp-voice-field">
      <svg
        viewBox="0 0 1100 680"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="tp-voice-gold" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#80c5bd" stopOpacity="0" />
            <stop offset=".28" stopColor="#6ca7a6" />
            <stop offset=".56" stopColor="#f0cf9b" />
            <stop offset=".78" stopColor="#d4b080" />
            <stop offset="1" stopColor="#6d9bad" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tp-voice-edge">
            <stop stopColor="#e7c697" stopOpacity="0" />
            <stop offset=".5" stopColor="#f9e3bf" />
            <stop offset="1" stopColor="#8cc7c3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#tp-voice-gold)" className="tp-silk">
          <path d="M-80 600 C170 210 350 700 570 390 S900 430 1180 120" />
          <path d="M-80 615 C150 250 360 680 580 410 S930 460 1180 140" />
          <path d="M-80 625 C145 295 365 650 595 435 S930 470 1180 170" />
        </g>
        <g
          fill="none"
          stroke="url(#tp-voice-edge)"
          strokeWidth="1.3"
          className="tp-voice-trace"
        >
          <path d="M-80 600 C170 210 350 700 570 390 S900 430 1180 120" />
          <path d="M-80 625 C145 295 365 650 595 435 S930 470 1180 170" />
        </g>
      </svg>
    </VoiceMotion>
  );
}
