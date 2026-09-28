import { paperCatalog } from "@/data/papers";

export function getStaticPaperSlugs(): string[] {
  return paperCatalog.map((paper) => paper.slug);
}

export async function getPaperReproductionCards() {
  return paperCatalog;
}

export async function getPaperReproductionDetail(slug: string) {
  return paperCatalog.find((paper) => paper.slug === slug);
}
