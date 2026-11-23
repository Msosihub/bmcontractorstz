/** Privacy-safe integration hooks only. No tracker, storage, network request or conversion claim. */
export function enquiryEvent(
  kind: "contact" | "survey",
  event:
    | "page_view"
    | "stage_complete"
    | "stage_reached"
    | "validation_error"
    | "submit_attempt"
    | "submission_failure"
    | "server_confirmed_success"
    | "direct_call"
    | "direct_whatsapp",
  stage?: number,
) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("bm:enquiry-funnel", {
        detail: {
          version: "three-stage-v1",
          kind,
          event,
          ...(stage ? { stage } : {}),
        },
      }),
    );
}
