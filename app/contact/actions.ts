"use server";
import { reportPreviewDatabaseFailure } from "@/lib/database-diagnostics.mjs";
import { redirect } from "next/navigation";
import { notifyBmOffice } from "@/lib/africasTalking";
import {
  parseEnquiry,
  EnquiryValidationError,
  type EnquiryState,
} from "@/lib/enquiries/validation";
import { persistEnquiry, EnquiryRateError } from "@/lib/enquiries/store";
export async function createContactMessage(
  _state: EnquiryState,
  form: FormData,
): Promise<EnquiryState> {
  const lang = form.get("lang") === "sw" ? "sw" : "en";
  try {
    const input = parseEnquiry(form, "contact");
    const result = await persistEnquiry("contact", input);
    if (result.isNew) {
      // At most one attempt per accepted submission. Failure does not undo a saved enquiry.
      await notifyBmOffice("BM WEBSITE MESSAGE\nRef: " + result.id).catch(
        () => {},
      );
    }
  } catch (error) {
    if (
      !(error instanceof EnquiryValidationError) &&
      !(error instanceof EnquiryRateError)
    )
      reportPreviewDatabaseFailure(error, "contact");
    return {
      error:
        error instanceof EnquiryValidationError
          ? "invalid"
          : error instanceof EnquiryRateError
            ? "rate"
            : "unavailable",
    };
  }
  redirect("/contact/success?lang=" + lang);
}
