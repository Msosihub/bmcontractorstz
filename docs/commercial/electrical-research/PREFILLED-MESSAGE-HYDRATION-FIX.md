# Prefilled enquiry message — focused local correction

20 November 2026. This is a correctness fix discovered during the single authorized hosted electrical Preview acceptance, not a design change. The hosted deployment and its frozen source remain unchanged. No second deployment is authorized or performed.

## Confirmed issue

Hosted candidate `532a304e6d45e672fd126f0d4e145c324b1de48b`, deployment `dpl_Es3c293MGGDJFmYVUCiGetqzYUTC`, can overwrite an edit to the nonempty prefilled message when an immediate interaction triggers hydration. One synthetic save contained only the initial brief. Read-only diagnostics, with every POST blocked before transmission, reproduced a missing appended marker in one of three immediate-submit trials. A fully loaded-page control retained the marker.

An earlier assertion failure concerned normal browser CRLF line-ending serialization, not data loss; that assertion was normalized separately. Both hosted contact fixtures and receipts were removed and independently verified absent. No further hosted contact/survey submissions were made after confirming the hydration race. Hosted EN/SW survey and duplicate-prevention acceptance therefore remain incomplete.

The installed React DOM textarea hydration path assigns a nonempty server default to `.value` in `initTextarea`, overwriting edits that precede hydration. Ordinary empty-message fields do not hit that nonempty-default branch. This explains why the new prefilled electrical brief exposed the problem. Reference behaviour: https://react.dev/reference/react-dom/components/textarea and https://react.dev/reference/react-dom/components/form . The actual reproduction and installed source were used; no generic upstream issue is claimed as proof of this specific installation.

## Minimal correction

`EnquiryMessage` remains an uncontrolled native textarea. It renders the bounded initial text on the server for no-JavaScript users; the client hydration prop avoids the nonempty-default `.value` assignment. A layout commit restores only the native `.defaultValue`, preserving the browser's dirty-value flag and customer edits, including an intentional empty value. Native reset defaults remain correct.

No new form endpoint, state store, schema, dependency, credential, notification behaviour or styling. Existing required/max-length fields, escaping, server actions, authentication and duplicate prevention remain intact. The current hosted candidate is not silently represented as fixed.

## Verification

- Guarded local production-mode build and TypeScript PASS; focused ESLint PASS; 244 automated tests PASS.
- Real Chrome regression holds application scripts before hydration, then releases them after edits: 16 cases across Contact/Site Survey × EN/SW × untouched/append/replace/clear PASS. Native reset defaults also PASS.
- Four real JavaScript-disabled form-route/language prefills PASS. All POSTs blocked during these regression checks.
- Local corrected-app synthetic EN/SW contact/survey persistence and duplicate-prevention tests are tracked separately with exact fixture cleanup; final results and IDs are recorded in the workspace acceptance report, not claimed from a local DOM-only test.

Reproduce against an already guarded local app using `tests/browser/enquiry-hydration.mjs`. Supply BM_PLAYWRIGHT_MODULE if Playwright is in the approved external runtime, BM_CHROME_PATH for an installed browser, BM_LOCAL_BASE_URL for a 127.0.0.1 HTTP origin, and optionally BM_HYDRATION_RESULTS. The regression refuses non-local origins and blocks every POST. It does not start a server, load credentials or modify a database.

## Release boundary

The current hosted Preview is NO-GO for Production because of the confirmed message-loss race. This correction is prepared locally only. Push/update of draft PR #8 and exactly one corrected protected Preview require separate owner authorization. Keep main, Production, all prior deployments and databases unchanged. Repeat hosted customer-form acceptance on the corrected artifact before recommending publication.
