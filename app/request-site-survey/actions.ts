"use server";
import { reportPreviewDatabaseFailure } from "@/lib/database-diagnostics.mjs";
import { setEnquiryReceipt } from "@/lib/enquiries/receipt";
import { redirect } from "next/navigation";
import { notifyBmOffice } from "@/lib/africasTalking";
import {
  parseEnquiry,
  enquiryDraft,
  EnquiryValidationError,
  type EnquiryState,
} from "@/lib/enquiries/validation";
import { persistEnquiry, EnquiryRateError } from "@/lib/enquiries/store";
export async function createSiteSurveyRequest(
  _state: EnquiryState,
  form: FormData,
): Promise<EnquiryState> {
  const lang = form.get("lang") === "sw" ? "sw" : "en";
  let id: string;
  try {
    const input = parseEnquiry(form, "survey");
    const result = await persistEnquiry("survey", input);
    id = result.id;
    await setEnquiryReceipt("survey", result.id);
    if (result.isNew)
      await notifyBmOffice("BM SITE SURVEY REQUEST\nRef: " + id).catch(
        () => {},
      );
  } catch (error) {
    if (
      !(error instanceof EnquiryValidationError) &&
      !(error instanceof EnquiryRateError)
    )
      reportPreviewDatabaseFailure(error, "survey");
    return {
      draft: enquiryDraft(form),
      error:
        error instanceof EnquiryValidationError
          ? "invalid"
          : error instanceof EnquiryRateError
            ? "rate"
            : "unavailable",
    };
  }
  redirect("/request-site-survey/success?lang=" + lang);
}
