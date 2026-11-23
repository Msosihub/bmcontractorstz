"use client";
import { useEffect, useRef, useState } from "react";
export function EngineeringMotionControl({ lang }: { lang: "en" | "sw" }) {
  const button = useRef<HTMLButtonElement>(null),
    [ready, setReady] = useState(false),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = button.current?.closest<HTMLElement>(".engineering-motion");
    if (!root || !("IntersectionObserver" in window)) return;
    let visible = false,
      manual = false;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)"),
      connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
    const update = () =>
      root.toggleAttribute(
        "data-em-active",
        visible &&
          !document.hidden &&
          !reduce.matches &&
          !connection?.saveData &&
          !manual,
      );
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        update();
      },
      { threshold: 0.15 },
    );
    observer.observe(root);
    setReady(true);
    const toggle = () => {
      manual = !manual;
      setPaused(manual);
      update();
    };
    const key = (e: KeyboardEvent) => {
      if (
        e.altKey &&
        e.key.toLowerCase() === "p" &&
        visible &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        toggle();
      }
    };
    const b = button.current;
    b?.addEventListener("click", toggle);
    document.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    return () => {
      observer.disconnect();
      b?.removeEventListener("click", toggle);
      document.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
      root.removeAttribute("data-em-active");
    };
  }, []);
  return (
    <button
      type="button"
      ref={button}
      hidden={!ready}
      aria-label={
        lang === "sw"
          ? paused
            ? "Endelea na mchoro"
            : "Sitisha mwendo wa mchoro"
          : paused
            ? "Resume illustration"
            : "Pause illustration"
      }
      aria-pressed={paused}
      aria-keyshortcuts="Alt+P"
      title={
        lang === "sw" ? "Sitisha / endelea · Alt+P" : "Pause / resume · Alt+P"
      }
    >
      {paused ? (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3L12 8L5 13Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3V13M11 3V13" />
        </svg>
      )}
    </button>
  );
}
