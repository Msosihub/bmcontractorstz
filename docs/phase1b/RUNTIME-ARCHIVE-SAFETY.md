# Runtime archive safety correction — 27 October 2026

The prior source allowlist omitted root instrumentation.ts. The existing Next.js register hook is preserved unchanged and is now explicitly included. No visual, business, database schema, dependency or provider configuration is changed.

`scripts/package-runtime.py <new-output-directory>` packages only clean committed HEAD, uses deterministic sorted tar/gzip metadata, rejects credential-bearing source and environment files, requires an independent security entrypoint inventory, extracts the archive and runs that extracted copy's validator against every manifest file hash. Set BM_NODE to the approved Node executable. The output directory must not already exist.

`lib/runtime-archive.mjs` defines required startup, database identity, notification, admin/session, indexing and configuration entrypoints. `scripts/preview-build-preflight.mjs` checks their presence before any database check or Next compilation. `tests/runtime-archive.test.mjs` rejects each required-file omission, source tampering, unreviewed files, environment files and a symlink substitution.

The external release manifest records the exact commit, source archive checksum and upload directory. Validate that clean extracted directory before installing dependencies. Installation/build artifacts are verification evidence, not inputs to a replacement source archive. Regenerate from the same commit to confirm reproducibility.

The final verification report must additionally demonstrate that compiled `.next/server/instrumentation.js` exists and that a real Next production server awaits the restricted SQL identity check before serving requests, and rejects invalid identity/privilege fixtures. Only restricted synthetic credentials may be used. No deployment is authorized by packaging or a successful build.
