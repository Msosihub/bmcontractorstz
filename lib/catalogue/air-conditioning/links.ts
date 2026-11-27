import type { Language } from "@/lib/i18n/config";
/** Reuses validated intake fields. No new API, schema or provider integration. */
export function climateLinks(lang: Language, scope: string, product = "") {
  const sw = lang === "sw";
  const brief = sw
    ? `Hitaji: ${scope}\nEneo la ufungaji:\nNyumba / hoteli / ofisi / taasisi:\nIdadi ya vyumba au maeneo:\nVipimo vya vyumba (ikijulikana):\nAC iliyopo au ufungaji mpya:\nChapa / modeli / aina unayopendelea: ${product}\nSaa za matumizi na idadi ya watu:\nVifaa pekee / ufungaji / matengenezo:\nMaelezo ya ziada:`
    : `Requirement: ${scope}\nInstallation location:\nHome / hotel / office / institution:\nNumber of rooms or areas:\nRoom dimensions (if known):\nExisting AC or new installation:\nPreferred brand / model / type: ${product}\nOperating hours and occupancy:\nEquipment only / installation / maintenance:\nAdditional project information:`;
  return {
    quote:
      "/contact?" +
      new URLSearchParams({
        lang,
        subject: ((sw ? "Viyoyozi — " : "Air conditioning — ") + scope).slice(
          0,
          120,
        ),
        product,
        brief,
      }),
    survey:
      "/request-site-survey?" +
      new URLSearchParams({
        lang,
        service: sw
          ? "Tathmini ya mfumo wa viyoyozi"
          : "Air conditioning system assessment",
        product,
        brief,
      }),
    whatsapp:
      "/whatsapp?" +
      new URLSearchParams({
        text:
          (sw
            ? "Habari BM, naomba ushauri kuhusu "
            : "Hello BM, please advise on ") +
          scope +
          (product ? " — " + product : "") +
          (sw ? ". Eneo: " : ". Site: "),
      }),
    call: "tel:+255760111880",
  };
}
