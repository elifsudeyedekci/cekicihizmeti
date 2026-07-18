import { services } from "./data/services";
import { districts } from "./data/districts";
import { posts, CATEGORY_LABEL } from "./blog/registry";

export interface SearchItem {
  title: string;
  href: string;
  category: string;
}

/**
 * Site genelinde TEK arama veri kaynağı — hem /ara sayfası hem header'daki canlı arama kutusu
 * hem de SiteSearch bileşeni buradan besleniyor. 39 ilçe, 12 hizmet ve tüm blog başlıkları
 * (20 marka + 7 otoyol/köprü + 5 araç tipi + ilçe rehberleri + diğerleri) dahildir.
 *
 * DİKKAT: Marka ve otoyol sayfaları ayrı bir route'a sahip değil — her ikisi de zaten `posts`
 * içinde birer blog yazısı olarak var (bkz. lib/blog/generators.ts). Burada ayrıca
 * `brands`/`highways` üzerinden eklenirlerse `posts`'taki karşılıklarıyla aynı href'e sahip
 * iki ayrı girdi oluşur (React key çakışması + arama sonuçlarında aynı sayfa iki kez görünür).
 */
export const SEARCH_ITEMS: SearchItem[] = [
  ...services.map((s) => ({ title: s.name, href: `/hizmetler/${s.slug}`, category: "Hizmet" })),
  ...districts.map((d) => ({ title: `${d.name} Çekici`, href: `/bolgeler/${d.slug}`, category: "Bölge" })),
  ...posts.map((p) => ({ title: p.title, href: `/blog/${p.slug}`, category: CATEGORY_LABEL[p.category] })),
];

/** Basit, sıralı olmayan alt-dize eşleşmesi — Türkçe locale-aware küçük harfe çevirme ile. */
export function searchSite(query: string, limit = 8): SearchItem[] {
  const needle = query.trim().toLocaleLowerCase("tr");
  if (!needle) return [];
  return SEARCH_ITEMS.filter((it) => it.title.toLocaleLowerCase("tr").includes(needle)).slice(0, limit);
}
