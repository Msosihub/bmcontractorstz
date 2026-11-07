# Final attendance-page review — 4 November 2026

## Result

Local page refinement is complete for owner review. No publication or Production operation was performed.

- Removed the entire opening hero: the ZKTeco logo panel, previous headline, workplace photograph and device overlay. Original assets remain preserved locally and are still available where used by the journal/catalogue.
- The business-choice section now leads the page, with one clear bilingual H1. Office, hotel/lodge and multi-branch enquiry paths remain prominent.
- Preserved BioTime presentation, fictional sample report, equipment catalogue, software/licensing details, enquiry actions, journal links, BM identity and corporate styling.
- Moved the attendance workflow out of the collapsed FAQ into a visible section between the sample report and equipment choices.
- Added lightweight native SVG/CSS motion showing terminal → network → BioTime → authorized manager → report. Play is user-initiated, pauses, can replay and ends automatically. All five descriptions remain visible; no business data or actual employee records enter the animation.
- Added restrained card hover/focus feedback. No animation dependency, heavy video or new integration.
- Reduced-motion users get static visuals and manual step buttons. Playback stops offscreen and the component retains its document-visibility stop handler.

## Verification

Evidence: workspace `outputs/access-control-final-20261104/`.

| Check | Result |
| --- | --- |
| Guarded production-mode local build | Passed with restricted synthetic Preview identity and notification suppression; TypeScript and complete build passed. |
| Automated regressions | 231 passed, 0 failed. |
| Scoped ESLint / whitespace | Passed. |
| EN/SW desktop/mobile | Passed at 1440 × 1000 and 390 × 844. |
| Opening section removal | Hero and logo panel absent; one H1 and one visible workflow. |
| Accessibility | Zero WCAG A/AA scan violations in four tested layouts; keyboard manual-step selection passed. Automated scans are not a full assistive-technology audit. |
| Motion | Normal playback advances; keyboard pause holds position; offscreen stop, replay and finite completion passed. Reduced-motion play is disabled and manual selection has no movement transition. |
| Responsive output | No horizontal overflow or broken images in tested layouts. |
| SEO | EN/SW self canonicals and reciprocal hreflang preserved; Preview noindex remains active. |
| Enquiry links | Language and quotation/site-survey context retained. No form writes, live provider requests or OTP tests. |

The initial sandboxed build could not resolve DNS. The same guarded build passed with authorized network access. This sandbox restriction is distinct from the database timeout below.

The first local runtime attempt then failed its startup database identity check with `connection-timeout` and returned HTTP 500. Safeguards correctly blocked the app. One bounded restart, without any credential, database or timeout changes, passed the identity check and all four real-browser layout/motion checks. Preserve `runtime.log` and `browser.log` as failure evidence, and `runtime-recheck.log`, `browser-recheck.log` and `results.json` as the subsequent acceptance evidence. This does not establish long-term database reliability.

## Screenshots

- `top-en-desktop.png` / `top-en-mobile.png`
- `top-sw-desktop.png` / `top-sw-mobile.png`
- `workflow-en-desktop.png` / `workflow-en-mobile.png`
- `workflow-sw-desktop.png` / `workflow-sw-mobile.png`
- Full-page EN/SW desktop/mobile screenshots: `page-*.png`.

Local review: http://127.0.0.1:3022/services/access-control/time-attendance?lang=en
Kiswahili: http://127.0.0.1:3022/services/access-control/time-attendance?lang=sw

## Release status and next step

Work remains on `codex/commercial-access-control-01`; last committed HEAD is `fd7407e7185c71c3ac286b39cc4c3b432fd143a6`. The accumulated attendance/catalogue/journal refinements are local working-tree changes, not a new frozen release commit or hosted artifact. No GitHub push, merge, Vercel/environment change, deployment, migration, notification activation or Payload change occurred.

Remaining release matters:

1. Intermittent restricted Preview database connectivity remains unresolved; a successful restart is not a correction.
2. The previously documented JavaScript-disabled initial-loading limitation remains open and was not changed or newly passed in this task.
3. Prices, stock, supplied software licences and exact LL-03/FR1500S revisions still require supplier/business confirmation; no prices or availability were invented.
4. Next: freeze the reviewed local source into a clean candidate, update the focused PR, and perform protected hosted acceptance under separate release authorization. Mandatory repository safeguards and CI limitations must be checked at release time. Production publication is not authorized by this page-review request.

**Recommendation:** approve the page design/content for the next controlled release-preparation step; retain the above technical release checks. Do not promote the current local working tree directly to Production.
