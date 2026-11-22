# Final focused navigation corrections — 22 November 2026

No redesign, new routes/products or integration. Existing Production and the previous protected Preview are preserved; nothing in this revision has been pushed or deployed.

## Corrections

- Only the shared mega-menu photograph uses Next Image `unoptimized`. Existing local WebPs are served directly; width/height, alt text, lazy loading and responsive CSS remain. Global optimization and official logo behavior are unchanged. Original sizes: 36,898 / 168,442 / 64,658 bytes.
- Mobile is icon-only in EN/SW, retaining accessible labels and native details expanded/collapsed state. A 44 px minimum target and legible opening icon preserve touch usability. Back, Close and quotation access remain.
- A real post-idle connection failure revealed a narrower reliability bug: pg can throw an uncoded `Connection terminated due to connection timeout`, with a `Connection terminated unexpectedly` cause. The old code-only classifier let it escape and return HTTP 500. The new bounded classifier handles only known transport codes and these exact observed messages, including wrapped causes. Authentication, permission, database-identity and unrelated SQL failures remain hard failures. No raw driver message is logged; no automatic query/write retry was added.
- Fallback continues to omit all service-dependent destinations, preserving a visible notice and independent Services, Equipment, Company, Contact and quotation access. Startup identity guards stay outside this boundary and are unchanged.

## Final local verification

- Final guarded production-mode build and TypeScript passed; 278 automated tests passed; targeted ESLint passed. An earlier final-build attempt stopped correctly at the read-only identity preflight and remains recorded.
- The corrected standard production-mode local server subsequently passed guarded startup, first reads and eight bounded requests with at most three concurrent requests (maximum 3,534 ms in that sample).
- Actual production-mode Next application: 12 EN/SW layouts at 1920, 1440, 820, 390, 375 and 320 px; all five groups, direct loading of all three menu photos, keyboard/touch/focus behavior and automated navigation accessibility passed. Eight native no-JavaScript/reduced-motion combinations passed.
- Six production-mode long mobile menu cases passed, including Kiswahili sticky Back, Close and quotation reachability. Desktop/mobile recordings and screenshots come from this actual app, not a static harness.
- 84 menu link/anchor cases and 142 EN/SW model routes passed in the actual development app with correct single breadcrumbs. Existing-service smoke checks completed across both languages after one PA client read exceeded 30 seconds; remaining reads used a finite 45-second test-client deadline. Database/application budgets did not change.
- Four EN/SW contact and survey context cases passed, with zero submissions. No records were created or cleanup required.

## Reliability limits

An actual publication-query ETIMEDOUT produced HTTP 200 with safe fallback. A later uncoded pg timeout produced HTTP 500, was traced to the navigation boundary, and is covered by the focused correction and regression tests above. Authentication/permission and unknown failures still throw; subsequent requests may recover without cached invented publication status.

Earlier local production starts failed the enforced database guard. Non-disclosing timings captured connection/authentication and identity-query timeouts, including a sample where DNS/TCP/TLS completed promptly before later stages stalled. Direct identity checks and the compiled instrumentation hook also succeeded independently. The latest complete build and standard production-server checks passed, but this does not establish a permanent transport fix.

An independent control against the unchanged existing hosted Preview found Node fetch timing out before connection while Chrome returned HTTP 200. That establishes a test-driver/transport component for that control; it does not explain every prior reset or erase the separate reproduced navigation defect.

Final quiet-window results and detailed external evidence are recorded outside this runtime archive. Hosted acceptance must repeat guarded startup, first/post-idle requests and bounded concurrency. Actual Neon suspension is not assumed. No database/compute/network/credential setting, schema, provider or timeout was changed. Diagnostic preloads are not included in the source/runtime package.

## Approval boundary

The local corrections are ready for a separately authorized protected Preview, with the above transport uncertainty explicitly retained. Production remains on HOLD pending hosted acceptance and separate release approval. Any build/startup/identity failure must stop the attempt; do not retry deployment or bypass guards. No push, merge, deployment or promotion is authorized by this preparation.
