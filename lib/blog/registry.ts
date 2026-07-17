import type { BlogPost, BlogCategory } from "./types";
import { allGeneratedPosts } from "./generators";
import { yakaPosts } from "./posts-yaka";
import { cornerstonePosts } from "./posts-cornerstone";
import { kokKelimePosts } from "./posts-kok-kelime";
import { bilgilendirici1Posts } from "./posts-bilgilendirici-1";
import { bilgilendirici2Posts } from "./posts-bilgilendirici-2";

export const posts: BlogPost[] = [
  ...yakaPosts,
  ...cornerstonePosts,
  ...kokKelimePosts,
  ...bilgilendirici1Posts,
  ...bilgilendirici2Posts,
  ...allGeneratedPosts(),
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return posts.filter((p) => p.category === category);
}

export const CATEGORY_LABEL: Record<BlogCategory, string> = {
  cornerstone: "Ana Rehber",
  yaka: "Yaka Bazlı",
  "kok-kelime": "Genel Bilgi",
  ilce: "İlçe Bazlı",
  marka: "Marka Bazlı",
  otoyol: "Otoyol / Köprü",
  "arac-tipi": "Araç Tipi",
  bilgilendirici: "Bilgilendirici",
};
