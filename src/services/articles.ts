import { articles } from "@/data/platform";

export interface ArticleCard {
  title: string;
  slug?: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  views: number;
  description: string;
  tags: string[];
}

export async function getArticleCards(): Promise<ArticleCard[]> {
  return articles;
}
