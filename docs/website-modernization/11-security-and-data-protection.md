# Security review
Static review; no production exploit attempts, forms, OTPs, SMS or database operations.

## SEC-01/P1: missing mutation authorization
Evidence: exported actions in admin protected products/services/packages/projects/support/messages/site-surveys lack session guards. Only group layout checks session. Installed Next.js use-server guide requires operation-level authentication/authorization.
Impact: sensitive write boundary missing; live exploitability not demonstrated.
Recommendation: shared requireAdmin before every sensitive action; validate active allowlist/role and bounded input.
Dependency: role/session policy and isolated test DB.
Risk: unauthorized writes.
Acceptance: no-session/expired/revoked direct action tests cause zero writes; authorized preview writes succeed.
Management: role and first-milestone scope review.

## SEC-02/P2: OTP/session hardening
Evidence: request cooldown and OTP attempts use read-then-write; OTP consume and session create separate; getCurrentAdminSession does not recheck phone allowlist.
Recommendation: atomic one-use OTP consumption, concurrency-safe limits, bounded issuance, revocation and cleanup.
Acceptance: simultaneous use succeeds once, attempts cannot race, revoked admin loses access. Use mocked SMS only.
Dependencies: auth schema reconciliation and policy.

## OPS-01/P2: public intake abuse
Evidence: contact/survey trim inputs but lack explicit max lengths, robust contact validation, idempotency/rate limits.
Recommendation: server bounds, accessible errors, deduplication and deployment-appropriate abuse controls.
Acceptance: invalid/oversized/repeated fixtures cannot create excess rows or notifications.

## PRIV-01/P2: logging/retention
Evidence: lib/africasTalking.ts logs provider response and allSettled results, potentially containing recipient/delivery data.
Recommendation: reference/status-only redacted logging; verify real logs privately and set retention/access.
Do not claim an actual leak without evidence. Privacy policy exists; processors/retention need management validation.

Positive foundations: crypto-generated OTP/token, stored hashes, HTTP-only secure-in-production sameSite=lax cookie, Prisma ORM queries. No unrestricted upload endpoint found.
Unverified: historical Git secrets, advisory scan, live DB privileges, restore, CSP/full XSS/CSRF and infrastructure controls. No credentials printed; no blanket security certification.
