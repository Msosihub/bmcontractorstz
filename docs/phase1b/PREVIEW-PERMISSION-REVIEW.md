# Preview database permissions — read-only review and proposed hardening

27 October 2026. No ACL, credential, role, database data or Production setting was changed.

## Verified access

Approved project `calm-bar-57598453`, validation branch `br-ancient-mountain-abvb2bco`, endpoint `ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech`. Runtime identity `bm_preview_runtime_20261025`; intended database `bm_preview_20261025`.

The owner authorized catalog-only inspection of inherited database/table access. Queries ran explicitly as the runtime role, including a connection to the inherited **branch copy** `neondb` to inspect catalogs. No customer rows, table contents, auth hashes, credentials or Production database were read.

| Capability                                              | Synthetic database                | Inherited `neondb` copy                              |
| ------------------------------------------------------- | --------------------------------- | ---------------------------------------------------- |
| CONNECT                                                 | Yes                               | Yes, via PUBLIC                                      |
| TEMPORARY                                               | No                                | Yes, via PUBLIC                                      |
| Database/schema CREATE                                  | No                                | No                                                   |
| Existing application-table SELECT/INSERT/UPDATE/DELETE  | Yes, 17 tables                    | **No, all 17 relations** including migration history |
| Column privileges / REFERENCES / TRIGGER                | Runtime app grants as appropriate | None found                                           |
| Accessible sequences                                    | App grants retained               | None                                                 |
| Custom public-schema functions                          | Not needed for this review        | None                                                 |
| Foreign servers / large objects                         | Not used by app                   | None found                                           |
| Role superuser/createDB/createRole/bypassRLS/membership | All false                         | Same role, all false                                 |

The prior uncertainty about inherited application-table privileges is resolved: catalog checks deny those privileges. Successful catalog access is not customer-table access. This is a point-in-time permission review, not a guarantee about future grants or every PostgreSQL capability. Application URL/server identity checks remain fail-closed and reject inherited `neondb`.

## Minimum optional hardening plan — NOT EXECUTED

PostgreSQL grants are additive. Revoking CONNECT only from the runtime role would not override PUBLIC. The smallest effective change is to remove **PUBLIC CONNECT and TEMPORARY on only the inherited copy's database object**, retaining its existing explicit owner and neon_superuser grants. It affects other roles relying solely on PUBLIC on that copy, so separate exact approval is required.

Scope must be confirmed with Neon metadata before executing any statement: project and branch above, database `neondb`, privileged owner `neondb_owner`. Never use the default/main branch or live Production endpoint. Keep the owner connection open; do not terminate sessions or change credentials.

Preflight:

1. Re-read current database ACL and role membership inventory; abort on drift from the evidence below.
2. Confirm owner and neon_superuser retain explicit CONNECT/CREATE/TEMPORARY. The branch lists owner, unused `bm_preview_app_20261025`, and runtime role. Internal Neon roles also exist. Confirm no approved operator/job depends on PUBLIC-only access to this inherited copy.
3. Reconfirm both accepted Preview and candidate use `bm_preview_20261025`, never inherited `neondb`. No variable changes.
4. Record the exact current ACL in a private operational record; no secret values needed.

Proposed transaction, only after separate approval:

```sql
BEGIN;
REVOKE CONNECT, TEMPORARY ON DATABASE neondb FROM PUBLIC;
-- Read pg_database ACL and has_database_privilege for runtime and owner.
-- COMMIT only if runtime CONNECT/TEMP are false and owner CONNECT remains true.
COMMIT;
```

If assertions fail before commit, ROLLBACK. After commit, use a fresh runtime-role connection attempt to this exact inherited copy: it must be denied. Recheck synthetic identity/preflight/read and both app paths; existing sessions may survive a CONNECT revocation, so do not claim it terminates sessions. No session termination is proposed.

Exact ACL rollback, if separately authorized after a committed change:

```sql
GRANT CONNECT, TEMPORARY ON DATABASE neondb TO PUBLIC;
```

This restores the two observed PUBLIC grants (neither had grant option). No table/row change, cascade, role deletion, data deletion, PUBLIC schema changes or default privilege expansion. The unused privileged `bm_preview_app_20261025` remains reserved for manual owner cleanup, as previously instructed.

No immediate table-access correction is required by the observed application ACLs. The remaining CONNECT/TEMP exposure should be accepted explicitly as a bounded Preview risk or hardened through the separately approved plan. Production release remains separate.

Evidence from worktree root: `../../outputs/phase1b-final-candidate-20261027/acl-{bm_preview_20261025,neondb,details}.json`, `database-acl.json`. Catalog evidence is not a customer-data dump.

Primary references: [PostgreSQL privileges](https://www.postgresql.org/docs/current/ddl-priv.html), [REVOKE and additive PUBLIC privileges](https://www.postgresql.org/docs/current/sql-revoke.html).
