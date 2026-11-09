import { prisma } from "@/lib/prisma";
import { logoKey } from "@/lib/manufacturer-logos";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slot: string }> },
) {
  const key = logoKey((await params).slot);
  if (!key) return new Response(null, { status: 404 });
  const row = await prisma.siteSetting.findUnique({
    where: { key },
    select: { valueJson: true, updatedAt: true },
  });
  if (typeof row?.valueJson !== "string" || row.valueJson.length > 64_000)
    return new Response(null, { status: 404 });
  const bytes = Buffer.from(row.valueJson, "base64");
  if (
    bytes.toString("ascii", 0, 4) !== "RIFF" ||
    bytes.toString("ascii", 8, 12) !== "WEBP"
  )
    return new Response(null, { status: 404 });
  const versioned =
    new URL(request.url).searchParams.get("v") ===
    String(row.updatedAt.getTime());
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/webp",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": versioned ? "public, max-age=86400" : "no-store",
    },
  });
}
