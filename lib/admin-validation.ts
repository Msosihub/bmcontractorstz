/** Boundary validation shared by existing admin forms. Never silently coerce a bad price. */
export function validateAdminForm(form: FormData) {
  let total = 0;
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") throw new Error("File uploads are not supported.");
    total += value.length;
    const limit = /content|features|specifications|includedItems/i.test(key) ? 20000 : /description|summary/i.test(key) ? 5000 : 500;
    if (value.length > limit || total > 100000) throw new Error("Input exceeds the permitted length.");
    if (key.endsWith("Id") && (!value.trim() || !/^[a-zA-Z0-9_-]{1,128}$/.test(value))) throw new Error("Invalid record ID.");
    if (key === "nextValue" && !["true", "false"].includes(value)) throw new Error("Invalid publication status.");
    if (["price", "priceFrom", "cameras"].includes(key) && value.trim()) {
      const number = Number(value.replace(/,/g, ""));
      if (!Number.isSafeInteger(number) || number < 0 || number > 2147483647) throw new Error("Invalid numeric value.");
      if (key === "cameras" && (number < 1 || number > 512)) throw new Error("Invalid camera count.");
    }
    if (key === "imageUrl" && value.trim() && !/^\/(?!\/)|^https:\/\//.test(value.trim())) throw new Error("Images must use a local path or HTTPS URL.");
  }
}
