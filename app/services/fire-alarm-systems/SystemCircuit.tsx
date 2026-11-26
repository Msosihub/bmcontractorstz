/** Concept diagrams only, not installation/wiring drawings. Text remains available without JS. */
export function SystemCircuit({
  addressable,
  sw,
}: {
  addressable: boolean;
  sw: boolean;
}) {
  const t = (en: string, ki: string) => (sw ? ki : en);
  return (
    <svg
      className="fs-system-svg"
      viewBox="0 0 460 190"
      role="img"
      aria-label={
        addressable
          ? t(
              "Addressable loop: individually identified detectors and a compatible interface; topology and isolators follow the panel manual.",
              "Loop ya addressable: vitambuzi vyenye anwani na moduli inayooana; mpangilio na isolator hufuata mwongozo.",
            )
          : t(
              "Conventional panel: separate supervised smoke/heat and manual call-point zones, with separate sounder output.",
              "Paneli conventional: kanda tofauti zinazofuatiliwa za moshi/joto na kitufe, pamoja na njia tofauti ya king’ora.",
            )
      }
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity=".7">
        <rect x="5" y="48" width="70" height="96" rx="3" />
        <rect x="17" y="63" width="46" height="13" />
        {addressable ? (
          <>
            <path d="M75 67H435V143H75" />
            <path d="M75 160H210V178H410" />
          </>
        ) : (
          <>
            <path d="M75 65H114V35H434" />
            <path d="M75 95H130V90H434" />
            <path d="M75 126H145V148H410" />
          </>
        )}
      </g>
      <g fill="#314b49" stroke="#e0c89c" strokeWidth="1.3">
        {addressable ? (
          <>
            <circle cx="200" cy="67" r="11" />
            <circle cx="344" cy="67" r="11" />
            <rect x="311" y="132" width="22" height="22" rx="2" />
          </>
        ) : (
          <>
            <circle cx="222" cy="35" r="10" />
            <circle cx="337" cy="35" r="10" />
            <rect x="227" y="80" width="22" height="21" rx="2" />
            <rect x="425" y="29" width="10" height="12" />
            <rect x="425" y="84" width="10" height="12" />
          </>
        )}
        <path
          d={
            addressable
              ? "M382 171v-9a9 9 0 0 1 18 0v9l4 5h-26z"
              : "M382 148v-9a9 9 0 0 1 18 0v9l4 5h-26z"
          }
        />
      </g>
      <g fill="#f7edda" fontSize="11" fontFamily="Arial, sans-serif">
        <text x="17" y="103">
          {t("PANEL", "PANELI")}
        </text>
        {addressable ? (
          <>
            <text x="177" y="46">
              A001
            </text>
            <text x="321" y="46">
              A002
            </text>
            <text x="260" y="123">
              {t("Compatible I/O", "Moduli inayooana")}
            </text>
            <text x="175" y="173">
              24 V*
            </text>
            <text x="365" y="189">
              {t("Sounder", "King’ora")}
            </text>
            <text x="245" y="96">
              {t("SUPERVISED LOOP", "LOOP INAYOFUATILIWA")}
            </text>
          </>
        ) : (
          <>
            <text x="151" y="16">
              {t("ZONE 1 · SMOKE / HEAT", "KANDA 1 · MOSHI / JOTO")}
            </text>
            <text x="155" y="72">
              {t("ZONE 2 · CALL POINT", "KANDA 2 · KITUFE")}
            </text>
            <text x="330" y="127">
              {t("SOUNDER CIRCUIT", "LAINI YA KING’ORA")}
            </text>
            <text x="412" y="55">
              EOL
            </text>
            <text x="412" y="112">
              EOL
            </text>
          </>
        )}
      </g>
    </svg>
  );
}
