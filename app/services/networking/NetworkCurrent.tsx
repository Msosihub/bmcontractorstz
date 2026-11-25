"use client";
import { useEffect, useRef } from "react";
import type { Language } from "@/lib/i18n/config";

/** A small native SVG enhancement: no canvas, animation dependency or frame loop. */
export function NetworkCurrent({ lang }: { lang: Language }) {
  const root = useRef<HTMLDivElement>(null);
  const sw = lang === "sw";
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      const running =
        inView &&
        !document.hidden &&
        !preference.matches &&
        node.dataset.paused !== "true";
      node.dataset.motion = running ? "running" : "static";
      node.dataset.reason = document.hidden
        ? "hidden"
        : !inView
          ? "offscreen"
          : preference.matches
            ? "reduced"
            : node.dataset.paused === "true"
              ? "manual"
              : "visible";
    };
    node.dataset.enhanced = "true";
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              update();
            },
            { threshold: 0.12 },
          );
    observer?.observe(node);
    if (!observer) inView = true;
    const toggle = () => {
      const paused = node.dataset.paused !== "true";
      node.dataset.paused = String(paused);
      const button = node.querySelector("button");
      button?.setAttribute("aria-pressed", String(paused));
      button?.setAttribute(
        "aria-label",
        paused
          ? sw
            ? "Endeleza mwendo wa mchoro"
            : "Resume network illustration"
          : sw
            ? "Sitisha mwendo wa mchoro"
            : "Pause network illustration",
      );
      update();
    };
    const button = node.querySelector("button");
    button?.addEventListener("click", toggle);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    update();
    return () => {
      observer?.disconnect();
      button?.removeEventListener("click", toggle);
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", update);
      delete node.dataset.enhanced;
      node.dataset.motion = "static";
    };
  }, [sw]);
  return (
    <div
      ref={root}
      className="nf-current"
      data-motion="static"
      data-paused="false"
    >
      <svg
        className="nf-lightfield"
        viewBox="0 0 900 650"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="nf-light-line" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#a3d5c8" stopOpacity="0" />
            <stop offset=".35" stopColor="#9fc8be" />
            <stop offset=".6" stopColor="#f3d1a1" />
            <stop offset=".82" stopColor="#86b4d9" />
            <stop offset="1" stopColor="#b8dde2" stopOpacity="0" />
          </linearGradient>
          <filter id="nf-light-soft">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g
          fill="none"
          stroke="url(#nf-light-line)"
          className="nf-light-silk"
          filter="url(#nf-light-soft)"
          strokeWidth="16"
        >
          <path d="M-80 635 C160 380 420 700 584 360 S760 235 980 -50" />
          <path d="M-90 620 C145 345 433 652 590 328 S785 190 970 -80" />
          <path d="M-70 655 C205 445 388 708 576 395 S734 260 1000 -15" />
        </g>
        <g
          fill="none"
          stroke="url(#nf-light-line)"
          className="nf-light-edge"
          strokeWidth="1.5"
        >
          <path d="M-80 635 C160 380 420 700 584 360 S760 235 980 -50" />
          <path d="M-90 620 C145 345 433 652 590 328 S785 190 970 -80" />
          <path d="M-70 655 C205 445 388 708 576 395 S734 260 1000 -15" />
        </g>
      </svg>
      <div className="nf-current-heading">
        <span>
          {sw ? "MIUNDOMBINU INAYOUNGANISHA" : "THE CONNECTION BEHIND IT ALL"}
        </span>
        <button
          type="button"
          aria-label={
            sw ? "Sitisha mwendo wa mchoro" : "Pause network illustration"
          }
          aria-pressed="false"
        >
          <span className="nf-pause-symbol" aria-hidden="true">
            Ⅱ
          </span>
          <span className="nf-play-symbol" aria-hidden="true">
            ▷
          </span>
        </button>
      </div>
      <svg
        className="nf-current-desktop"
        viewBox="0 0 680 220"
        role="img"
        aria-labelledby="nf-current-title nf-current-desc"
      >
        <title id="nf-current-title">
          {sw
            ? "Router, swichi na njia za mtandao"
            : "Router, switch and network paths"}
        </title>
        <desc id="nf-current-desc">
          {sw
            ? "Router huunganisha mtandao. Swichi husambaza miunganisho ya nyaya kwenda ofisini, kwenye access point na fibre ya jengo jingine. Fibre hubeba data, si umeme. Mchoro unaonyesha mpangilio tu; si ramani ya ufungaji."
            : "A router connects to a switch. Separate wired paths serve office devices, a Wi-Fi access point and a fibre link to another building. Fibre carries data, not electrical power. This is a conceptual topology, not an installation drawing."}
        </desc>
        <defs>
          <linearGradient id="nf-copper">
            <stop stopColor="#d2ab76" />
            <stop offset=".5" stopColor="#fff0bf" />
            <stop offset="1" stopColor="#82c3bb" />
          </linearGradient>
          <linearGradient id="nf-fibre">
            <stop stopColor="#7bbdb7" />
            <stop offset=".55" stopColor="#dbffff" />
            <stop offset="1" stopColor="#6d99d5" />
          </linearGradient>
          <filter id="nf-soft">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <g
          className="nf-current-rails"
          fill="none"
          stroke="url(#nf-copper)"
          strokeWidth="1.3"
          opacity=".45"
        >
          <path d="M76 110 C130 110 157 110 220 110" />
          <path d="M270 110 C330 110 341 42 416 42 L567 42" />
          <path d="M270 110 C355 110 386 114 567 114" />
          <path d="M270 110 C338 110 346 185 430 185 L567 185" />
        </g>
        <g
          className="nf-current-silk"
          fill="none"
          stroke="url(#nf-fibre)"
          strokeWidth="8"
          opacity=".18"
          filter="url(#nf-soft)"
        >
          <path d="M76 110 C130 110 157 110 220 110" />
          <path d="M270 110 C330 110 341 42 416 42 L567 42" />
          <path d="M270 110 C355 110 386 114 567 114" />
          <path d="M270 110 C338 110 346 185 430 185 L567 185" />
        </g>
        <g
          className="nf-current-stream"
          fill="none"
          stroke="url(#nf-copper)"
          strokeLinecap="round"
          strokeWidth="3"
        >
          <path d="M76 110 C130 110 157 110 220 110" />
          <path d="M270 110 C330 110 341 42 416 42 L567 42" />
          <path d="M270 110 C355 110 386 114 567 114" />
          <path d="M270 110 C338 110 346 185 430 185 L567 185" />
        </g>
        <g className="nf-current-nodes">
          <rect x="15" y="84" width="100" height="52" rx="10" />
          <rect x="193" y="84" width="100" height="52" rx="10" />
          <rect x="548" y="17" width="116" height="49" rx="10" />
          <rect x="548" y="89" width="116" height="49" rx="10" />
          <rect x="548" y="160" width="116" height="49" rx="10" />
        </g>
        <g className="nf-current-labels">
          <text x="65" y="115">
            Router
          </text>
          <text x="243" y="115">
            {sw ? "Swichi" : "Switch"}
          </text>
          <text x="606" y="47">
            {sw ? "Ofisi · CAT6" : "Office · CAT6"}
          </text>
          <text x="606" y="119">
            Wi-Fi · AP
          </text>
          <text x="606" y="190">
            {sw ? "Jengo · Fibre" : "Building · Fibre"}
          </text>
        </g>
        <text className="nf-current-note" x="333" y="213">
          {sw
            ? "Data kupitia fibre · umeme hupangwa kando"
            : "Fibre carries data · power is planned separately"}
        </text>
      </svg>
      <svg
        className="nf-current-mobile"
        viewBox="0 0 360 240"
        role="img"
        aria-labelledby="nf-mobile-title nf-mobile-desc"
      >
        <title id="nf-mobile-title">
          {sw
            ? "Njia za data za ofisi, Wi-Fi na fibre"
            : "Office, Wi-Fi and fibre data paths"}
        </title>
        <desc id="nf-mobile-desc">
          {sw
            ? "Router inaunganisha swichi; njia tofauti huenda ofisini, kwenye AP na jengo jingine. Fibre haisafirishi umeme."
            : "The router connects to a switch; separate paths serve an office, access point and another building. Fibre does not carry electrical power."}
        </desc>
        <defs>
          <linearGradient id="nf-mobile-copper">
            <stop stopColor="#d2ab76" />
            <stop offset=".5" stopColor="#fff0bf" />
            <stop offset="1" stopColor="#82c3bb" />
          </linearGradient>
          <linearGradient id="nf-mobile-fibre">
            <stop stopColor="#8acdc2" />
            <stop offset="1" stopColor="#98bbe3" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke="url(#nf-mobile-copper)"
          strokeWidth="1"
          opacity=".45"
        >
          <path d="M54 55 L154 55" />
          <path d="M174 55 C201 55 211 31 252 31 L306 31" />
          <path d="M174 55 C215 55 207 115 254 115 L306 115" />
          <path d="M174 55 C216 55 190 197 254 197 L306 197" />
        </g>
        <g
          className="nf-current-stream"
          fill="none"
          stroke="url(#nf-mobile-copper)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M54 55 L154 55" />
          <path d="M174 55 C201 55 211 31 252 31 L306 31" />
          <path d="M174 55 C215 55 207 115 254 115 L306 115" />
          <path d="M174 55 C216 55 190 197 254 197 L306 197" />
        </g>
        <g className="nf-current-nodes">
          <rect x="3" y="35" width="79" height="40" rx="8" />
          <rect x="117" y="35" width="79" height="40" rx="8" />
          <rect x="241" y="11" width="115" height="40" rx="8" />
          <rect x="241" y="95" width="115" height="40" rx="8" />
          <rect x="241" y="177" width="115" height="40" rx="8" />
        </g>
        <g className="nf-current-labels">
          <text x="42" y="60">
            Router
          </text>
          <text x="156" y="60">
            {sw ? "Swichi" : "Switch"}
          </text>
          <text x="298" y="36">
            {sw ? "Ofisi · CAT6" : "Office · CAT6"}
          </text>
          <text x="298" y="120">
            Wi-Fi · AP
          </text>
          <text x="298" y="202">
            {sw ? "Jengo · Fibre" : "Building · Fibre"}
          </text>
        </g>
        <text className="nf-current-note" x="178" y="237">
          {sw
            ? "Fibre: data · panga umeme kando"
            : "Fibre: data · plan endpoint power separately"}
        </text>
      </svg>
    </div>
  );
}
