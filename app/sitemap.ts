import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { districts } from "@/lib/data/districts";
import { services } from "@/lib/data/services";
import { posts } from "@/lib/blog/registry";
import { enPosts } from "@/lib/blog/posts-en";
import { arPosts } from "@/lib/blog/posts-ar";

export const dynamic = "force-static";

const BUILD_DATE = new Date();

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Segment 1: statik kurumsal sayfalar + hizmet sayfaları + bölge sayfaları */
function buildStaticPageEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    { url: `${SITE.url}/`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/hakkimizda`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/iletisim`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/sss`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/fiyatlandirma`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/kvkk`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/gizlilik-politikasi`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/hizmetler`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/bolgeler`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/bolgeler/anadolu-yakasi`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/bolgeler/avrupa-yakasi`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/en`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/ar`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/en/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE.url}/ar/blog`, lastModified: BUILD_DATE, changeFrequency: "daily", priority: 0.7 },
  ];

  const serviceRoutes: SitemapEntry[] = services.map((s) => ({
    url: `${SITE.url}/hizmetler/${s.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const districtRoutes: SitemapEntry[] = districts.map((d) => ({
    url: `${SITE.url}/bolgeler/${d.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
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
  }));
}

/** Segment 3: çok dilli blog yazıları (EN/AR bağımsız registry'ler) */
function buildMultilingualBlogPostEntries(): SitemapEntry[] {
  const en: SitemapEntry[] = enPosts.map((p) => ({
    url: `${SITE.url}/en/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.category === "cornerstone" ? 0.9 : 0.6,
  }));
  const ar: SitemapEntry[] = arPosts.map((p) => ({
    url: `${SITE.url}/ar/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: p.category === "cornerstone" ? 0.9 : 0.6,
  }));
  return [...en, ...ar];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...buildStaticPageEntries(), ...buildBlogPostEntries(), ...buildMultilingualBlogPostEntries()];
}
