export type Localized = { en: string; sw: string };
export type CatalogueProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  generation: string;
  images: { src: string; alt: string }[];
  summary: Localized;
  specs: { label: Localized; value: Localized }[];
  variants: string[];
  source: string;
  documents: { label: Localized; url: string }[];
  related: string[];
  price: null;
  availability: string;
};
export const categoryNames: Record<string, Localized> = {
  sliding: { en: "Sliding gates", sw: "Geti za kuteleza" },
  swing: { en: "Swing gates", sw: "Geti za bawaba" },
  garage: { en: "Garage & roller doors", sw: "Gereji na shutter" },
  barrier: { en: "Traffic barriers", sw: "Vizuizi vya magari" },
  accessories: { en: "Accessories", sw: "Vifaa vya ziada" },
};
