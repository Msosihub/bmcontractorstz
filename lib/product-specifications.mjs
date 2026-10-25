/** Read both the admin editor's label/value rows and legacy object specifications. */
export function specificationEntries(value) {
  const scalar = (v) => ["string", "number", "boolean"].includes(typeof v);
  const pairs = Array.isArray(value)
    ? value
        .filter((row) => row && typeof row === "object" && !Array.isArray(row))
        .map((row) => [row.label, row.value])
    : value && typeof value === "object"
      ? Object.entries(value)
      : [];
  return pairs
    .filter(
      ([key, v]) =>
        typeof key === "string" && key.trim() && scalar(v) && String(v).trim(),
    )
    .map(([key, v]) => [key.trim(), String(v)]);
}
