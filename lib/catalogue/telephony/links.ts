import type { Language } from "@/lib/i18n/config";
/** Existing validated enquiry routes only. Never starts a call or provider request. */
export function telephonyLinks(lang: Language, scope: string, product = "") {
  const sw = lang === "sw";
  const brief = sw
    ? `Hitaji: ${scope}\nEneo:\nHoteli / ofisi / taasisi:\nChapa na modeli ya mfumo uliopo, ikijulikana:\nIdadi ya vyumba / extension:\nSimu za analogue au IP zilizopo:\nIdadi na aina ya laini za nje:\nTatizo au maboresho yanayohitajika:\nVifaa / ufungaji / matengenezo:\nMuda unaolengwa:`
    : `Requirement: ${scope}\nSite location:\nHotel / office / institution:\nExisting system brand/model, if known:\nNumber of rooms/extensions:\nExisting analogue or IP phones:\nNumber and type of external lines:\nMain fault or intended improvement:\nEquipment supply / installation / maintenance:\nTimeframe:`;
  return {
    quote:
      "/contact?" +
      new URLSearchParams({
        lang,
        subject: (
          (sw ? "Mifumo ya simu — " : "Business telephony — ") + scope
        ).slice(0, 120),
        product,
        brief,
      }),
    survey:
      "/request-site-survey?" +
      new URLSearchParams({
        lang,
        service: sw
          ? "Tathmini ya mfumo wa simu"
          : "Business telephone system assessment",
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
