import Image from "next/image";
import {
  approvedRecordMedia,
  type MediaApproval,
} from "@/lib/approved-record-media";
import type { Language } from "@/lib/i18n/config";
export function RecordImage({
  kind,
  record,
  lang,
}: {
  kind: MediaApproval["kind"];
  record: { id: string; imageUrl?: string | null; isPublished: boolean };
  lang: Language;
}) {
  const image = approvedRecordMedia(kind, record);
  if (!image) return null;
  return (
    <figure className="record-image">
      <Image
        src={image.imageUrl}
        width={image.width}
        height={image.height}
        sizes="(max-width:760px) 100vw, 45vw"
        alt={lang === "sw" ? image.altSw : image.altEn}
      />
    </figure>
  );
}
