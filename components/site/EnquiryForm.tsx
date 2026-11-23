"use client";
import { createContext, useContext, useEffect, useActionState } from "react";
import type { Language } from "@/lib/i18n/config";
import type { EnquiryState } from "@/lib/enquiries/validation";

const FormDraft = createContext<Record<string, string>>({});
export function useEnquiryDraftValue(name: string, fallback = "") {
  return useContext(FormDraft)[name] ?? fallback;
}

const errors = {
  en: {
    invalid:
      "Please check the required fields and provide a valid phone number or email. Keep your message under 3,000 characters.",
    rate: "You have sent several enquiries. Please wait ten minutes or contact us directly.",
    unavailable:
      "We could not confirm that your enquiry was saved. Please contact us before sending it again.",
  },
  sw: {
    invalid:
      "Tafadhali kagua sehemu zinazohitajika na uweke namba ya simu au barua pepe sahihi. Ujumbe usizidi herufi 3,000.",
    rate: "Umetuma maombi kadhaa. Tafadhali subiri dakika kumi au wasiliana nasi moja kwa moja.",
    unavailable:
      "Hatukuweza kuthibitisha kama ombi limehifadhiwa. Tafadhali wasiliana nasi kabla ya kulituma tena.",
  },
};
export function EnquiryForm({
  action,
  lang,
  children,
  className,
  onSubmit,
  onReset,
  onFailure,
}: {
  action: (state: EnquiryState, form: FormData) => Promise<EnquiryState>;
  lang: Language;
  children: React.ReactNode;
  className?: string;
  onFailure?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onReset?: React.FormEventHandler<HTMLFormElement>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => {
    if (state.error) onFailure?.();
  }, [state, onFailure]);
  return (
    <FormDraft.Provider value={state.draft || {}}>
      <form
        data-pending={pending ? "true" : undefined}
        action={formAction}
        className={className}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {state.error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"
          >
            {errors[lang][state.error]}
          </p>
        )}
        <div aria-hidden="true" className="hidden">
          <label>
            Leave empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {children}
      </form>
    </FormDraft.Provider>
  );
}
