"use client";
import { enquiryEvent } from "@/lib/enquiries/funnel";
import { useEffect } from "react";
export function ClearEnquiryDraft({
  survey,
  id,
}: {
  survey: boolean;
  id: string;
}) {
  useEffect(() => {
    try {
      const kind = survey ? "survey" : "contact",
        receiptKey = "bm-enquiry-confirmed:" + kind;
      const prior = JSON.parse(sessionStorage.getItem(receiptKey) || "null");
      if (prior?.id !== id || Date.now() - prior.at > 30 * 60 * 1000) {
        enquiryEvent(kind, "server_confirmed_success");
        sessionStorage.setItem(
          receiptKey,
          JSON.stringify({ id, at: Date.now() }),
        );
      }
      const prefix = `bm-enquiry-v1:${kind}:`;
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i);
        if (key?.startsWith(prefix)) sessionStorage.removeItem(key);
      }
    } catch {}
  }, [survey, id]);
  return null;
}
