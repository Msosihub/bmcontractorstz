# Offline visual review

Local layout aid only; not the application server or hosted acceptance evidence.

From the isolated Phase 1B worktree (without .env files), using its installed Node runtime:

1. `node design-preview/trust-sections/render.mjs`
2. `node design-preview/trust-sections/serve.mjs`
3. Open `http://127.0.0.1:3008/services?lang=en`, `/about?lang=sw` or `/?lang=en`.

This renders actual components with a synthetic empty service-withdrawal fixture, plain image adapter and inert Next navigation adapters. It never imports the real Prisma client or reads database credentials. Existing compiled base CSS is required; current `app/premium.css` is appended. The read-only server binds only 127.0.0.1; CSP blocks scripts/submissions and POST returns 405. Unknown journeys return 404. Language links and native belt pause controls work; React menus/buttons and dynamic data do not.

The ordinary application build/start still requires its unchanged restricted database identity checks. Do not use this harness to bypass a release check, test database behavior or publish production assets. The existing Vercel ignore excludes this whole directory. Outputs live outside the source worktree under `outputs/trust-sections-20261026/visual-review`.
