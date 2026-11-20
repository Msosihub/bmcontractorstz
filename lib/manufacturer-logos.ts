import { prisma } from "@/lib/prisma";

const prefix = "homepage-manufacturer-logo-";
export const logoSlots = Array.from({ length: 10 }, (_, index) => index + 1);

export function logoKey(slot: string) {
  return /^(?:[1-9]|10)$/.test(slot) ? prefix + slot : null;
}

export async function getManufacturerLogos() {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: logoSlots.map((slot) => prefix + slot) } },
    select: { key: true, value: true, updatedAt: true },
  });
  return logoSlots.map((slot) => {
    const row = rows.find((item) => item.key === prefix + slot);
    return {
      slot,
      name: row?.value ?? "",
      version: row?.updatedAt.getTime() ?? 0,
    };
  });
}
