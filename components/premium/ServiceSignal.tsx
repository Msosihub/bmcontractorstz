/** Shared, original linework. Illustrative interaction, never a live system status. */
export function ServiceSignal({ kind }: { kind: string }) {
  return (
    <svg
      className={"bm-service-signal bm-service-signal-" + kind}
      viewBox="0 0 104 52"
      fill="none"
      aria-hidden="true"
    >
      <path className="signal-wire" d="M2 39H27L39 27H102" />
      <path
        className="signal-current"
        d="M2 39H27L39 27H102"
        pathLength="100"
      />
      {kind === "cctv" && (
        <>
          <path d="m35 14 23 6-6 12-22-7Z M56 23l10-2-3 13-9-6 M38 28l-3 9h17" />
          <path
            className="signal-action"
            d="M67 10q20 14 0 30 M73 16q10 9 0 17"
          />
        </>
      )}
      {kind === "fencing" && (
        <>
          <path d="M31 8v32m18-32v32m18-32v32M27 16h45M27 26h45" />
          <path className="signal-action" d="M30 16h38M30 26h38" />
        </>
      )}
      {kind === "gates" && (
        <>
          <path d="M25 8v34m54-34v34M25 38h54" />
          <path
            className="signal-gate"
            d="M29 13h43v23H29zM37 15v19m9-19v19m9-19v19m9-19v19"
          />
        </>
      )}
      {kind === "access" && (
        <>
          <rect x="35" y="7" width="27" height="35" rx="5" />
          <path d="M43 17c9-9 15 6 6 14m-7-7c-4-8 11-12 9 2m-6-6c3-2 5 2 2 6" />
          <circle className="signal-recognition" cx="48" cy="24" r="20" />
        </>
      )}
      {kind === "electrical" && (
        <>
          <path d="M25 12h50v29H25zM30 34h40M40 12v9h18v13" />
          <path className="signal-action" d="m53 10-9 13h9l-9 14" />
        </>
      )}
      {kind === "power" && (
        <>
          <path d="M21 19h24v18H21zM26 14v5m13-5v5M62 20h17v17H62zM79 26h4v5h-4M45 28h17" />
          <path className="signal-action" d="m54 17-7 12h9l-7 12" />
        </>
      )}
      {kind === "connectivity" && (
        <>
          <path d="M29 13h18v21h25M47 24h25" />
          <g className="signal-action">
            <circle cx="29" cy="13" r="5" />
            <circle cx="72" cy="24" r="5" />
            <circle cx="72" cy="34" r="5" />
          </g>
        </>
      )}
      {kind === "telephones" && (
        <>
          <path d="M30 12q-3 21 22 29l8-9-10-6-5 6q-7-5-8-10l6-4-5-9Z" />
          <path
            className="signal-action"
            d="M58 11q17 4 18 21M58 18q10 2 11 13M59 25q3 1 3 5"
          />
        </>
      )}
    </svg>
  );
}
