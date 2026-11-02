import "server-only";
import reference from "@/data/centurion-reference.json";
import type { CatalogueProduct } from "./types";

/** Reviewed read-only manufacturer reference. No CMS, network or inventory dependency. */
export async function centurionProducts(): Promise<CatalogueProduct[]> {
  return structuredClone(reference);
}
