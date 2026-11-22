import { PreviewNotice } from "./PreviewNotice";
import { destinationById } from "@/lib/navigation/resolve";
import { navigationSnapshot } from "@/lib/navigation/server";
import { NavigationHeader } from "@/components/navigation/NavigationHeader";
import type { Language } from "@/lib/i18n/config";
/** Publication is resolved on the server, including when JavaScript is disabled. */
export async function Header({lang}:{lang:Language}) {
  const {groups,degraded}=await navigationSnapshot();
  return <><a className="skip" href="#main">{lang==="sw"?"Nenda kwenye maudhui":"Skip to content"}</a><PreviewNotice lang={lang}/><NavigationHeader lang={lang} groups={groups} degraded={degraded} quotation={destinationById.get("quotation")!}/></>;
}
