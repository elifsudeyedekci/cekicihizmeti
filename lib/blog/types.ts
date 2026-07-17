import type { Faq } from "../data/types";

export type BlogCategory =
  | "cornerstone"
  | "yaka"
  | "kok-kelime"
  | "ilce"
  | "marka"
  | "otoyol"
  | "arac-tipi"
  | "bilgilendirici";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** İlk paragraf — alıntılanabilir direkt cevap (GEO kuralı) */
  intro: string;
  datePublished: string;
  dateModified: string;
  sections: BlogSection[];
  faqs: Faq[];
  /** İç link silosu için ilgili blog slug'ları */
  relatedPostSlugs: string[];
  relatedDistrictSlugs?: string[];
  relatedServiceSlugs?: string[];
  relatedBrandSlugs?: string[];
  /** Bölge sayfaları için ek veri (ilçe bloglarında kullanılır) */
  arrivalTable?: { area: string; minutes: string }[];
}
