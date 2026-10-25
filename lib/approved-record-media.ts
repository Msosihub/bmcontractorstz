import approvals from "@/data/approved-record-media.json";
export type MediaApproval = {
  kind: "product" | "project" | "service";
  recordId: string;
  imageUrl: string;
  altEn: string;
  altSw: string;
  rightsEvidence: string;
  approvedBy: string;
  approvedAt: string;
  width: number;
  height: number;
};
/** A published record is not proof of image rights. Never fetch arbitrary CMS URLs. */
export function approvedRecordMedia(
  kind: MediaApproval["kind"],
  record: { id: string; imageUrl?: string | null; isPublished: boolean },
  registry: readonly MediaApproval[] = approvals,
) {
  if (!record.isPublished || !record.imageUrl) return null;
  const url = record.imageUrl;
  if (!/^\/media\/[a-zA-Z0-9/_-]+\.(webp|avif|png|jpe?g)$/.test(url))
    return null;
  return (
    registry.find(
      (a) =>
        a.kind === kind &&
        a.recordId === record.id &&
        a.imageUrl === url &&
        a.altEn.trim() &&
        a.altSw.trim() &&
        a.rightsEvidence.trim() &&
        a.approvedBy.trim() &&
        Number.isFinite(Date.parse(a.approvedAt)) &&
        Number.isInteger(a.width) &&
        Number.isInteger(a.height) &&
        a.width > 0 &&
        a.height > 0,
    ) || null
  );
}
