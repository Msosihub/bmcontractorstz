"use client";
import { useActionState } from "react";
import type { Language } from "@/lib/i18n/config";
import type { EnquiryState } from "@/lib/enquiries/validation";

const errors = {
 en: { invalid: "Please check the required fields and provide a valid phone number or email. Keep your message under 3,000 characters.", rate: "You have sent several enquiries. Please wait ten minutes or contact us directly.", unavailable: "We could not save your enquiry. Please try again or contact us directly." },
 sw: { invalid: "Tafadhali kagua sehemu zinazohitajika na uweke namba ya simu au barua pepe sahihi. Ujumbe usizidi herufi 3,000.", rate: "Umetuma maombi kadhaa. Tafadhali subiri dakika kumi au wasiliana nasi moja kwa moja.", unavailable: "Hatukuweza kuhifadhi ombi lako. Tafadhali jaribu tena au wasiliana nasi moja kwa moja." }
};
export function EnquiryForm({ action, lang, children, className }: {
 action: (state: EnquiryState, form: FormData) => Promise<EnquiryState>;
 lang: Language; children: React.ReactNode; className?: string;
}) {
 const [state, formAction] = useActionState(action, {});
 return <form action={formAction} className={className}>
  {state.error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">{errors[lang][state.error]}</p>}
  <div aria-hidden="true" className="hidden"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
  {children}
 </form>;
}
