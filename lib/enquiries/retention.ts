/** Rate-limit receipts are temporary abuse controls, separate from customer enquiries. */
export const RECEIPT_RETENTION_MS = 24 * 60 * 60 * 1000;
export const RECEIPT_CLEANUP_BATCH = 500;
export function receiptExpiry(now = new Date()) {
 return new Date(now.getTime() - RECEIPT_RETENTION_MS);
}
