import { previewPgOptions } from "./preview-pg-options.mjs";
import { reportPreviewDatabaseFailure } from "./database-diagnostics.mjs";
import pg from "pg";
import { assertPreviewEnvironment, isPreview } from "./preview-safety.mjs";

export function assertRestrictedIdentity(row, env = process.env) {
  if (
    !row ||
    row.database !== env.BM_PREVIEW_DB_NAME ||
    row.role !== env.BM_PREVIEW_DB_ROLE ||
    row.rolsuper ||
    row.rolcreatedb ||
    row.rolcreaterole ||
    row.rolbypassrls ||
    row.member ||
    row.ddl
  )
    throw Error("Preview database identity or privileges rejected.");
}

// Read-only identity preflight, never migrations, fixtures or customer queries.
export async function verifyPreviewDatabase(env = process.env) {
  if (!isPreview(env)) return;
  assertPreviewEnvironment(env);
  const client = new pg.Client({
    connectionString: env.DATABASE_URL,
    ...previewPgOptions(env),
    query_timeout: 10000,
  });
  try {
    await client.connect();
    const result = await client.query(
      `SELECT current_database() AS database,current_user AS role,rolsuper,rolcreatedb,rolcreaterole,rolbypassrls,EXISTS(SELECT 1 FROM pg_auth_members WHERE member=pg_roles.oid) AS member,has_schema_privilege(current_user,'public','CREATE') AS ddl FROM pg_roles WHERE rolname=current_user`,
    );
    assertRestrictedIdentity(result.rows[0], env);
  } catch (error) {
    reportPreviewDatabaseFailure(error, "startup", env);
    // Do not forward pg errors, connection strings, passwords or query results to build logs.
    throw Error(
      "Preview database verification failed; application startup/build blocked.",
    );
  } finally {
    await client.end().catch(() => {});
  }
}
