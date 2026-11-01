/** Fixed classifications only: never log driver messages, SQL, URLs, contacts or credentials. */
const categories = new Map([
  ["ENOTFOUND", "dns"],
  ["EAI_AGAIN", "dns"],
  ["ETIMEDOUT", "connection-timeout"],
  ["ECONNRESET", "connection-reset"],
  ["ECONNREFUSED", "connection-refused"],
  ["P1001", "connection-unavailable"],
  ["P1002", "connection-timeout"],
  ["P2024", "pool-timeout"],
  ["P2028", "transaction-failure"],
  ["P2034", "transaction-conflict"],
  ["53300", "connection-limit"],
  ["57014", "query-cancelled"],
  ["55P03", "lock-unavailable"],
  ["40001", "transaction-conflict"],
  ["40P01", "transaction-conflict"],
  ["42501", "permission"],
  ["28P01", "authentication"],
  ["3D000", "database-missing"],
]);
export function databaseFailureCategory(error) {
  const seen = new Set();
  let current = error;
  for (
    let depth = 0;
    depth < 6 && current && typeof current === "object" && !seen.has(current);
    depth++
  ) {
    seen.add(current);
    if (categories.has(current.code)) return categories.get(current.code);
    current = current.cause || current.originalError;
  }
  return "unclassified";
}
export function reportPreviewDatabaseFailure(
  error,
  stage,
  env = process.env,
  write = console.warn,
) {
  if (env.BM_ISOLATED_PREVIEW !== "1") return;
  const safeStage = ["startup", "contact", "survey"].includes(stage)
    ? stage
    : "unknown";
  write(
    JSON.stringify({
      event: "preview-database-failure",
      stage: safeStage,
      category: databaseFailureCategory(error),
    }),
  );
}
