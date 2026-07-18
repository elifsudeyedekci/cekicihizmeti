import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { districts } from "@/lib/data/districts";
import { services } from "@/lib/data/services";
import { posts } from "@/lib/blog/registry";
import { enPosts } from "@/lib/blog/posts-en";
import { arPosts } from "@/lib/blog/posts-ar";
import { getTowImages } from "@/lib/data/images";

export const dynamic = "force-static";

const BUILD_DATE = new Date();

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Aynı sayfa şablonlarının kullandığı seed/keyword ile (bkz. TowImageGallery kullanımları) resim sitemap URL'leri üretir. */
function towImageUrls(seed: string, keyword: string, count = 2): string[] {
  return getTowImages(seed, keyword, count).map((img) => `${SITE.url}${img.file}`);
}

/** Segment 1: statik kurumsal sayfalar + hizmet sayfaları + bölge sayfaları */
function buildStaticPageEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    { url: `${SITE.url}/`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1, images: towImageUrls("home", "İstanbul 7/24 oto çekici hizmeti", 3) },
    { url: `${SITE.url}/hakkimizda`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5, images: towImageUrls("hakkimizda", "Çekici Hizmeti İstanbul ekibi") },
    { url: `${SITE.url}/iletisim`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5, images: towImageUrls("iletisim", "Çekici Hizmeti İstanbul iletişim") },
    { url: `${SITE.url}/sss`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6, images: towImageUrls("sss", "çekici hizmeti sıkça sorulan sorular") },
    { url: `${SITE.url}/fiyatlandirma`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6, images: towImageUrls("fiyatlandirma", "çekici hizmeti fiyat") },
    { url: `${SITE.url}/kvkk`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/gizlilik-politikasi`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/hizmetler`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9, images: towImageUrls("hizmetler", "çekici hizmetleri") },
    { url: `${SITE.url}/bolgeler`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9, images: towImageUrls("bolgeler", "İstanbul ilçeleri çekici hizmeti") },
    { url: `${SITE.url}/bolgeler/anadolu-yakasi`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8, images: towImageUrls("anadolu-yakasi", "Anadolu Yakası çekici hizmeti") },
    { url: `${SITE.url}/bolgeler/avrupa-yakasi`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8, images: towImageUrls("avrupa-yakasi", "Avrupa Yakası çekici hizmeti") },
    { url: `${SITE.url}/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.9, images: towImageUrls("blog", "çekici hizmeti rehberleri") },
    { url: `${SITE.url}/en`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8, images: towImageUrls("en-home", "Istanbul tow truck service", 3) },
    { url: `${SITE.url}/ar`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8, images: towImageUrls("ar-home", "خدمة سطحة سحب السيارات في إسطنبول", 3) },
    { url: `${SITE.url}/en/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.7, images: towImageUrls("en-blog", "Istanbul tow truck guides") },
    { url: `${SITE.url}/ar/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.7, images: towImageUrls("ar-blog", "أدلة سطحة سحب السيارات في إسطنبول") },
    // AI/GEO botları için — llms.txt standardı ve AI içerik kullanım politikası (bkz. /robots.txt AI bot izinleri)
    { url: `${SITE.url}/llms.txt`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/ai.txt`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.3 },
  ];

  const serviceRoutes: SitemapEntry[] = services.map((s) => ({
    url: `${SITE.url}/hizmetler/${s.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    images: towImageUrls(s.slug, s.name),
  }));

  const districtRoutes: SitemapEntry[] = districts.map((d) => ({
    url: `${SITE.url}/bolgeler/${d.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    images: towImageUrls(d.slug, `${d.name} çekici hizmeti`),
  }));

  return [...staticRoutes, ...serviceRoutes, ...districtRoutes];
}

/** Segment 2: blog yazıları (ilçe, marka, otoyol, araç tipi, bilgilendirici, kök kelime, yaka…) */
function buildBlogPostEntries(): SitemapEntry[] {
  return posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.category === "cornerstone" ? 1 : 0.7,
    images: towImageUrls(p.slug, p.title),
  }));
}

/** Segment 3: çok dilli blog yazıları (EN/AR bağımsız registry'ler) */
function buildMultilingualBlogPostEntries(): SitemapEntry[] {
  const en: SitemapEntry[] = enPosts.map((p) => ({
    url: `${SITE.url}/en/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.category === "cornerstone" ? 0.9 : 0.6,
    images: towImageUrls(`${p.slug}-en`, p.title),
  }));
  const ar: SitemapEntry[] = arPosts.map((p) => ({
    url: `${SITE.url}/ar/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.category === "cornerstone" ? 0.9 : 0.6,
    images: towImageUrls(`${p.slug}-ar`, p.title),
  }));
  return [...en, ...ar];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...buildStaticPageEntries(), ...buildBlogPostEntries(), ...buildMultilingualBlogPostEntries()];
}
