"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useEnquiryDraftValue } from "./EnquiryForm";
import { enquiryEvent } from "@/lib/enquiries/funnel";
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { EnquiryForm } from "./EnquiryForm";
import { EnquiryMessage } from "./EnquiryMessage";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { Language } from "@/lib/i18n/config";
import type { EnquiryState } from "@/lib/enquiries/validation";
import { purposeOptions, decodeEnquiryDraft } from "@/lib/enquiries/journey";
import "./enquiry-journey.css";

type Props = {
  lang: Language;
  survey?: boolean;
  action: (s: EnquiryState, f: FormData) => Promise<EnquiryState>;
  service?: string;
  product?: string;
  selectedPackage?: string;
  initialMessage?: string;
};
const fields = [
  "phone",
  "email",
  "fullName",
  "purpose",
  "subject",
  "location",
  "serviceType",
  "selectedProduct",
  "selectedPackage",
  "propertyType",
  "urgency",
  "budgetRange",
  "preferredContactMethod",
  "message",
];
function contextKey(p: Props) {
  const text = [
    p.survey,
    p.service,
    p.product,
    p.selectedPackage,
    p.initialMessage,
  ].join("|");
  let hash = 2166136261;
  for (const c of text) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  return `bm-enquiry-v1:${p.survey ? "survey" : "contact"}:${hash >>> 0}`;
}

function JourneyInput(
  p: InputHTMLAttributes<HTMLInputElement> & { name: string },
) {
  const value = useEnquiryDraftValue(p.name, String(p.defaultValue || ""));
  return p.value !== undefined ? (
    <input {...p} />
  ) : (
    <input {...p} defaultValue={value} />
  );
}
function JourneySelect(
  p: SelectHTMLAttributes<HTMLSelectElement> & { name: string },
) {
  const value = useEnquiryDraftValue(p.name, String(p.defaultValue || ""));
  return <select {...p} defaultValue={value} />;
}
export function EnquiryJourney(props: Props) {
  const {
    lang,
    survey = false,
    action,
    service = "",
    product = "",
    selectedPackage = "",
    initialMessage = "",
  } = props;
  const sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en);
  const root = useRef<HTMLDivElement>(null),
    sent = useRef(false),
    [step, setStep] = useState<number | null>(null),
    [summary, setSummary] = useState<[string, string][]>([]),
    [purpose, setPurpose] = useState(""),
    [error, setError] = useState(""),
    [generation, setGeneration] = useState(0),
    [selection, setSelection] = useState(
      [product, selectedPackage].filter(Boolean).join(" · "),
    );
  const key = contextKey(props),
    steps = survey
      ? [
          t("Your contact", "Mawasiliano"),
          t("Your site", "Eneo lako"),
          t("Your requirements", "Mahitaji yako"),
        ]
      : [
          t("Your contact", "Mawasiliano"),
          t("Your details", "Taarifa zako"),
          t("Let’s talk", "Mahitaji yako"),
        ];
  const form = () => root.current?.querySelector<HTMLFormElement>("form");
  const snapshot = () => {
    const f = form();
    return Object.fromEntries(
      fields.map((name) => [
        name,
        String(
          (f?.elements.namedItem(name) as HTMLInputElement | null)?.value || "",
        ),
      ]),
    );
  };
  const save = (stage = step || 1) => {
    try {
      const data = snapshot();
      sessionStorage.setItem(
        key,
        JSON.stringify({ at: Date.now(), stage, data }),
      );
    } catch {
      /* Storage is optional; the native form remains usable. */
    }
  };
  const refreshSummary = () => {
    const f = form();
    if (!f) return;
    const rows: [string, string][] = [];
    for (const name of fields) {
      const e = f.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLSelectElement
        | null;
      if (!e?.value || name === "purpose") continue;
      const label =
        e.closest("label")?.querySelector("span")?.textContent || name;
      const value =
        e instanceof HTMLSelectElement
          ? e.selectedOptions[0]?.textContent || e.value
          : e.value;
      rows.push([label, value]);
    }
    const purposeName = purposeOptions.find(
      (x) =>
        x.value ===
        (f.elements.namedItem("purpose") as HTMLSelectElement)?.value,
    );
    if (purposeName)
      rows.unshift([t("Enquiry purpose", "Sababu ya ombi"), purposeName[lang]]);
    setSummary(rows);
    setSelection(
      ["selectedProduct", "selectedPackage"]
        .map(
          (name) =>
            (f.elements.namedItem(name) as HTMLInputElement)?.value || "",
        )
        .filter(Boolean)
        .join(" · "),
    );
  };
  const move = (next: number, history = true) => {
    setError("");
    enquiryEvent(survey ? "survey" : "contact", "stage_reached", next);
    if (next > (step || 1))
      enquiryEvent(survey ? "survey" : "contact", "stage_complete", step || 1);
    setStep(next);
    save(next);
    if (history)
      window.history.pushState(
        {
          ...window.history.state,
          bmEnquiry: { kind: survey ? "survey" : "contact", step: next },
        },
        "",
        window.location.href,
      );
    requestAnimationFrame(() => {
      root.current?.scrollIntoView({ block: "start", behavior: "auto" });
      root.current
        ?.querySelector<HTMLElement>(`[data-stage="${next}"] h2`)
        ?.focus({ preventScroll: true });
    });
    refreshSummary();
  };
  useLayoutEffect(() => {
    const f = form();
    if (!f) return;
    let stage = 1;
    // A native edit made before hydration always takes precedence over a stored draft.
    const dirty = fields.some((name) => {
      const e = f.elements.namedItem(name);
      return (
        (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) &&
        e.value !== e.defaultValue
      );
    });
    try {
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const k = sessionStorage.key(i);
        if (!k?.startsWith("bm-enquiry-v1:")) continue;
        try {
          if (!decodeEnquiryDraft(sessionStorage.getItem(k)))
            sessionStorage.removeItem(k);
        } catch {
          sessionStorage.removeItem(k);
        }
      }
      const d = decodeEnquiryDraft(sessionStorage.getItem(key));
      if (!dirty && d) {
        for (const name of fields) {
          const e = f.elements.namedItem(name);
          if (
            (e instanceof HTMLInputElement ||
              e instanceof HTMLTextAreaElement ||
              e instanceof HTMLSelectElement) &&
            typeof d.data?.[name] === "string" &&
            d.data[name].length <= 3000
          )
            e.value = d.data[name];
        }
        stage = Math.max(1, Math.min(3, Number(d.stage) || 1));
      }
    } catch {}
    if (dirty) {
      const active =
        document.activeElement?.closest<HTMLElement>("[data-stage]");
      if (active && root.current?.contains(active))
        stage = Number(active.dataset.stage) || 1;
    }
    // One pre-paint restoration prevents a flash of the full no-JS form; input values stay native.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPurpose(
      (f.elements.namedItem("purpose") as HTMLSelectElement)?.value || "",
    );
    setStep(stage);
    f.noValidate = true;
    window.history.replaceState(
      {
        ...window.history.state,
        bmEnquiry: { kind: survey ? "survey" : "contact", step: stage },
      },
      "",
      window.location.href,
    );
    refreshSummary();
    // Context-key changes represent a different enquiry. Language is deliberately not part of the key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    enquiryEvent(survey ? "survey" : "contact", "page_view", 1);
  }, [survey]);
  useEffect(() => {
    const pop = () => {
      const state = window.history.state?.bmEnquiry;
      if (state?.kind === (survey ? "survey" : "contact"))
        move(Math.max(1, Math.min(3, state.step)), false);
    };
    const leaving = () => save();
    const language = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const u = new URL(a.href, location.href);
      if (a.closest(".enquiry-experience") && u.protocol === "tel:")
        enquiryEvent(survey ? "survey" : "contact", "direct_call");
      if (a.closest(".enquiry-experience") && u.pathname === "/whatsapp")
        enquiryEvent(survey ? "survey" : "contact", "direct_whatsapp");
      if (
        u.origin === location.origin &&
        u.pathname === location.pathname &&
        u.searchParams.get("lang") !== lang
      )
        save();
    };
    window.addEventListener("popstate", pop);
    window.addEventListener("pagehide", leaving);
    document.addEventListener("click", language);
    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("pagehide", leaving);
      document.removeEventListener("click", language);
    };
    // The handlers capture the current stage; no global draft or personal analytics state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, key, lang]);
  function valid(stage: number) {
    const f = form();
    if (!f) return false;
    const phone = f.elements.namedItem("phone") as HTMLInputElement,
      email = f.elements.namedItem("email") as HTMLInputElement;
    phone.setCustomValidity("");
    email.setCustomValidity("");
    const preferred = (
      f.elements.namedItem("preferredContactMethod") as HTMLSelectElement
    ).value;
    if (stage === 1) {
      if (
        (survey && !phone.value.trim()) ||
        (!phone.value.trim() && !email.value.trim())
      )
        phone.setCustomValidity(
          t(
            survey
              ? "Enter a telephone number."
              : "Enter a phone number or email address.",
            survey
              ? "Weka namba ya simu."
              : "Weka namba ya simu au barua pepe.",
          ),
        );
      else if (phone.value && !/^\+?[\d ()-]{7,30}$/.test(phone.value.trim()))
        phone.setCustomValidity(
          t("Check this telephone number.", "Kagua namba hii ya simu."),
        );
    }
    if (
      stage === 1 &&
      email.value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
    )
      email.setCustomValidity(
        t("Check this email address.", "Kagua barua pepe hii."),
      );
    if (stage === 1 && preferred === "Email" && !email.value.trim())
      email.setCustomValidity(
        t(
          "Add an email address for this contact preference.",
          "Weka barua pepe kwa njia uliyochagua.",
        ),
      );
    if (
      stage === 1 &&
      ["Phone", "WhatsApp"].includes(preferred) &&
      !phone.value.trim()
    )
      phone.setCustomValidity(
        t(
          "Add a telephone number for this contact preference.",
          "Weka namba ya simu kwa njia uliyochagua.",
        ),
      );
    const nodes = Array.from(
      f.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >(
        `[data-stage="${stage}"] input,[data-stage="${stage}"] select,[data-stage="${stage}"] textarea`,
      ),
    );
    const invalid = nodes.find((e) => !e.checkValidity());
    if (invalid) {
      invalid.setAttribute("aria-invalid", "true");
      invalid.setAttribute("aria-errormessage", "journey-validation");
      setStep(stage);
      enquiryEvent(survey ? "survey" : "contact", "validation_error", stage);
      setError(
        t(
          "Please check the highlighted field before continuing.",
          "Tafadhali kagua sehemu iliyoainishwa kabla ya kuendelea.",
        ),
      );
      requestAnimationFrame(() => {
        invalid.focus();
        invalid.reportValidity();
      });
      return false;
    }
    return true;
  }
  const hint =
    purpose === "equipment"
      ? t(
          "Product or model, quantity, and supply only or installed. It is fine if you are still choosing.",
          "Bidhaa au modeli, idadi, na kama unahitaji ugavi pekee au ufungaji. Si lazima uwe umechagua kila kitu.",
        )
      : purpose === "maintenance"
        ? t(
            "Tell us the system, what is happening and where it is installed. Add the model if you know it.",
            "Tueleze mfumo, tatizo na eneo ulipofungwa. Ongeza modeli kama unaifahamu.",
          )
        : t(
            "Describe your site and the result you need. Technical ratings and model numbers are optional.",
            "Eleza eneo lako na unachohitaji. Si lazima ujue vipimo vya kiufundi au namba za modeli.",
          );
  return (
    <div
      className="enquiry-journey"
      ref={root}
      data-enhanced={step !== null ? "true" : undefined}
      data-current-step={step || undefined}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          step !== null &&
          step < 3 &&
          e.target instanceof HTMLInputElement
        ) {
          e.preventDefault();
          if (valid(step)) move(step + 1);
        }
      }}
      onInput={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          target.removeAttribute("aria-invalid");
          target.removeAttribute("aria-errormessage");
          target.setCustomValidity("");
        }
        if (form()?.dataset.pending !== "true") sent.current = false;
        setError("");
        refreshSummary();
        save();
      }}
    >
      <ol
        className="journey-progress"
        aria-label={t("Enquiry progress", "Hatua za ombi")}
      >
        {steps.map((label, i) => (
          <li
            key={i}
            aria-current={step === i + 1 ? "step" : undefined}
            data-complete={step !== null && step > i + 1}
          >
            <span>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <EnquiryForm
        key={generation}
        action={action}
        lang={lang}
        className="premium-form journey-form"
        onFailure={() => {
          sent.current = false;
          enquiryEvent(
            survey ? "survey" : "contact",
            "submission_failure",
            step || 1,
          );
        }}
        onSubmit={(e) => {
          if (form()?.dataset.pending === "true") {
            e.preventDefault();
            return;
          }
          if (step === null) return;
          if (step < 3) {
            e.preventDefault();
            if (valid(step)) move(step + 1);
            return;
          }
          for (let n = 1; n <= 3; n++)
            if (!valid(n)) {
              e.preventDefault();
              return;
            }
          if (sent.current) {
            e.preventDefault();
            return;
          }
          sent.current = true;
          enquiryEvent(survey ? "survey" : "contact", "submit_attempt", 3);
          save();
        }}
        onReset={(e) => {
          if (sent.current) {
            e.preventDefault();
            return;
          }
          try {
            sessionStorage.removeItem(key);
          } catch {}
          setError("");
          setPurpose("");
          setGeneration((n) => n + 1);
          if (step !== null) setStep(1);
          setTimeout(refreshSummary, 0);
        }}
      >
        <JourneyInput type="hidden" name="lang" value={lang} />
        {error && (
          <p id="journey-validation" className="journey-error" role="alert">
            {error}
          </p>
        )}
        <fieldset data-stage="1" hidden={step !== null && step !== 1}>
          <legend className="sr-only">{steps[0]}</legend>
          <header>
            <p className="eyebrow">01 / {steps[0]}</p>
            <h2 tabIndex={-1}>
              {t(
                "Let’s get you to the right team.",
                "Tukuelekeze kwa timu inayofaa.",
              )}
            </h2>
            <p>
              {t(
                "Tell us how we can reach you.",
                "Tueleze namna ya kuwasiliana nawe.",
              )}
            </p>
          </header>
          <label>
            <span>
              {t("Phone / WhatsApp number", "Namba ya simu / WhatsApp")}
              {survey ? " *" : ""}
            </span>
            <JourneyInput
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required={survey}
              maxLength={30}
              aria-describedby="journey-contact-rule"
              placeholder="07… / +255…"
            />
          </label>
          <div className="journey-or">
            {survey
              ? t("Email is optional", "Barua pepe si lazima")
              : t("or", "au")}
          </div>
          <label>
            <span>{t("Email address", "Barua pepe")}</span>
            <JourneyInput
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder={t(
                "Your personal or business email",
                "Barua pepe binafsi au ya biashara",
              )}
            />
          </label>
          <p id="journey-contact-rule" className="journey-hint">
            {t(
              survey
                ? "A telephone number is required for site coordination. Email is optional."
                : "Use a phone number or an email address. You do not need a business email.",
              survey
                ? "Namba ya simu inahitajika kuratibu tathmini ya eneo. Barua pepe si lazima."
                : "Weka namba ya simu au barua pepe. Si lazima iwe barua pepe ya kampuni.",
            )}
          </p>
          <label>
            <span>
              {t(
                "Preferred contact method (optional)",
                "Namna ya kuwasiliana (si lazima)",
              )}
            </span>
            <JourneySelect name="preferredContactMethod">
              <option value="">{t("No preference", "Njia yoyote")}</option>
              <option value="Phone">{t("Phone call", "Simu")}</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">{t("Email", "Barua pepe")}</option>
            </JourneySelect>
          </label>
        </fieldset>
        <fieldset data-stage="2" hidden={step !== null && step !== 2}>
          <legend className="sr-only">{steps[1]}</legend>
          <header>
            <p className="eyebrow">02 / {steps[1]}</p>
            <h2 tabIndex={-1}>
              {survey
                ? t("Tell us about your site.", "Tueleze kuhusu eneo lako.")
                : t("A little about you.", "Tufahamu kidogo.")}
            </h2>
            <p>
              {t(
                "A home, a business or an institution. Everyone is welcome.",
                "Iwe ni nyumbani, biashara au taasisi, tupo kwa ajili yako.",
              )}
            </p>
          </header>
          <label>
            <span>
              {t("Your name or organization", "Jina lako au la taasisi")} *
            </span>
            <JourneyInput
              name="fullName"
              autoComplete="name"
              required
              maxLength={120}
            />
          </label>
          <label>
            <span>{t("What can we help with?", "Tukusaidie nini?")}</span>
            <JourneySelect
              name="purpose"
              defaultValue=""
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="">
                {t("Choose your enquiry", "Chagua sababu ya ombi")}
              </option>
              {purposeOptions.map((p) => (
                <option key={p.value} value={p.value}>
                  {p[lang]}
                </option>
              ))}
            </JourneySelect>
          </label>
          <label>
            <span>
              {t(
                survey ? "Site location" : "City / area (optional)",
                survey ? "Eneo la kazi" : "Mji / eneo (si lazima)",
              )}
              {survey ? " *" : ""}
            </span>
            <JourneyInput
              name="location"
              required={survey}
              maxLength={200}
              autoComplete="address-level2"
              placeholder={t("Town and area", "Mji na eneo")}
            />
          </label>
          <label>
            <span>
              {survey
                ? t("Service / system", "Huduma / mfumo")
                : t("Enquiry subject", "Kichwa cha ombi")}
            </span>
            <JourneyInput
              name={survey ? "serviceType" : "subject"}
              defaultValue={service}
              maxLength={survey ? 100 : 200}
            />
          </label>
          <details className="journey-context">
            <summary>
              {t(
                "Equipment & site details (optional)",
                "Vifaa na taarifa za eneo (si lazima)",
              )}
              {selection && (
                <small className="journey-selected-context">
                  {selection.length > 90
                    ? selection.slice(0, 90) + "…"
                    : selection}
                </small>
              )}
            </summary>
            <label>
              <span>{t("Product / model", "Bidhaa / modeli")}</span>
              <JourneyInput
                name="selectedProduct"
                defaultValue={product}
                maxLength={200}
              />
            </label>
            <label>
              <span>{t("Package / solution", "Kifurushi / suluhisho")}</span>
              <JourneyInput
                name="selectedPackage"
                defaultValue={selectedPackage}
                maxLength={200}
              />
            </label>
            <label>
              <span>{t("Property type", "Aina ya eneo")}</span>
              <JourneySelect name="propertyType">
                <option value="">
                  {t("Choose if helpful", "Chagua ukihitaji")}
                </option>
                {[
                  ["Residential", "Makazi"],
                  ["Office", "Ofisi"],
                  ["Retail", "Duka"],
                  ["Hotel", "Hoteli / lodge"],
                  ["Institution", "Taasisi"],
                  ["Industrial", "Kiwanda"],
                  ["Other", "Nyingine"],
                ].map(([en, ki]) => (
                  <option key={en} value={en}>
                    {sw ? ki : en}
                  </option>
                ))}
              </JourneySelect>
            </label>
          </details>
        </fieldset>
        <fieldset data-stage="3" hidden={step !== null && step !== 3}>
          <legend className="sr-only">{steps[2]}</legend>
          <header>
            <p className="eyebrow">03 / {steps[2]}</p>
            <h2 tabIndex={-1}>
              {t("Tell us what you need.", "Tueleze mahitaji yako.")}
            </h2>
            <p>{hint}</p>
          </header>
          <label>
            <span>
              {t("Your requirements", "Maelezo ya mahitaji")}
              {!survey ? " *" : ""}
            </span>
            <EnquiryMessage initialValue={initialMessage} required={!survey} />
          </label>
          <details className="journey-context">
            <summary>
              {t("Timing & budget (optional)", "Muda na bajeti (si lazima)")}
            </summary>
            <label>
              <span>{t("Timeframe", "Muda wa utekelezaji")}</span>
              <JourneySelect name="urgency">
                <option value="">{t("Not decided", "Bado sijapanga")}</option>
                <option value="Planning">
                  {t("Planning stage", "Ninapanga")}
                </option>
                <option value="This month">
                  {t("This month", "Mwezi huu")}
                </option>
                <option value="Urgent">
                  {t("Urgent assessment", "Tathmini ya haraka")}
                </option>
              </JourneySelect>
            </label>
            <label>
              <span>{t("Planned budget", "Bajeti uliyopanga")}</span>
              <JourneyInput name="budgetRange" maxLength={100} />
            </label>
          </details>
          {step === 3 && (
            <section
              className="journey-review"
              aria-label={t("Review before sending", "Kagua kabla ya kutuma")}
            >
              <div>
                <h3>
                  {t("Your brief, at a glance.", "Ombi lako kwa kifupi.")}
                </h3>
                <button type="button" onClick={() => move(1)}>
                  {t("Edit details", "Badili taarifa")} ↖
                </button>
              </div>
              <dl>
                {summary.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <p className="scope-note">
            {t(
              "Please leave out passwords, account details and sensitive information.",
              "Tafadhali usiweke nywila, taarifa za akaunti au taarifa nyeti.",
            )}{" "}
            <a href={"/privacy-policy?lang=" + lang}>
              {t("Privacy policy", "Sera ya faragha")} ↗
            </a>
          </p>
        </fieldset>
        <div className="journey-actions">
          {step !== null && step > 1 && (
            <button
              type="button"
              className="journey-back"
              onClick={() => move(step - 1)}
            >
              ← {t("Back", "Rudi")}
            </button>
          )}
          {step !== null && step < 3 ? (
            <button
              className="journey-next"
              type="button"
              onClick={() => {
                if (valid(step)) move(step + 1);
              }}
            >
              {t("Continue", "Endelea")} →
            </button>
          ) : (
            <SubmitButton
              className="premium-submit"
              loadingText={t("Saving your enquiry…", "Ombi linahifadhiwa…")}
            >
              {t(
                survey ? "Send survey request" : "Send enquiry",
                survey ? "Tuma ombi la tathmini" : "Tuma ombi",
              )}{" "}
              ↗
            </SubmitButton>
          )}
        </div>
        <div className="journey-draft">
          <p>
            {step !== null
              ? t(
                  "Draft stays in this tab for up to 30 minutes. It is cleared after your request is saved.",
                  "Rasimu huhifadhiwa kwenye kichupo hiki kwa hadi dakika 30. Huondolewa ombi linapohifadhiwa.",
                )
              : t(
                  "Complete the fields above to send your request.",
                  "Jaza taarifa hapo juu ili kutuma ombi.",
                )}
          </p>
          <button
            type="reset"
            onClick={() => {
              sent.current = false;
            }}
          >
            {t("Reset form", "Anza upya")}
          </button>
        </div>
      </EnquiryForm>
    </div>
  );
}
