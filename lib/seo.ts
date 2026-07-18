import type { Metadata } from "next";
import { SITE } from "./config";
import { getTowImages } from "./data/images";

/**
 * Her sayfa kendi og:url ve og:image/twitter:image değerini bu yardımcılardan üretir.
 * DİKKAT: app/layout.tsx'teki openGraph.url sadece varsayılan/fallback'tir — hiçbir alt
 * sayfa bunu miras almamalı, aksi halde og:url her sayfada anasayfaya işaret eder (bkz.
 * daha önce tespit edilen bug). Bu yüzden her generateMetadata/metadata bloğu openGraph.url
 * alanını KENDİ canonical path'iyle açıkça set etmelidir.
 */

function absoluteImage(seed: string, keyword: string, locale: "tr" | "en" | "ar" = "tr"): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  const img = getTowImages(seed, keyword, 1, locale)[0];
  return { url: `${SITE.url}${img.file}`, width: img.width, height: img.height, alt: img.alt };
}

/**
 * Bir sayfanın openGraph + twitter meta bloklarını üretir. `path` canonical ile birebir
 * aynı olmalı (ör. "/hizmetler/oto-cekici-hizmeti"). `seed`/`keyword` görsel rotasyonu ve
 * alt-text için — genelde o sayfanın TowImageGallery çağrısıyla aynı değerler kullanılır.
 */
const OG_LOCALE: Record<"tr" | "en" | "ar", string> = {
  tr: "tr_TR",
  en: "en_US",
  ar: "ar_AR",
};

/**
 * Bir blog/hizmet sayfasının `sections` dizisinde numaralı adım listesi (ör. "1. **X**: ...")
 * içeren İLK bölümü bulur — HowTo şeması için kullanılır. Her ilçe/marka/otoyol/araç-tipi/hizmet
 * sayfasında zaten en az bir numaralı süreç/güvenlik bölümü var; bunu ayrıca yazmaya gerek yok,
 * mevcut içerikten programatik olarak çıkarılır.
 */
export function findHowToSection<T extends { heading: string; paragraphs: string[] }>(
  sections: T[]
): T | undefined {
  return sections.find((s) => {
    const numbered = s.paragraphs.filter((p) => /^\s*\d+\.\s/.test(p));
    return numbered.length >= 3 && numbered.length === s.paragraphs.length;
  });
}

export function socialMeta(
  path: string,
  seed: string,
  keyword: string,
  opts: {
    locale?: "tr" | "en" | "ar";
    title?: string;
    description?: string;
    type?: "website" | "article";
  } = {}
): Pick<Metadata, "openGraph" | "twitter"> {
  const locale = opts.locale ?? "tr";
  const image = absoluteImage(seed, keyword, locale);
  const url = `${SITE.url}${path}`;
  return {
    openGraph: {
      type: opts.type ?? "website",
      locale: OG_LOCALE[locale],
      siteName: SITE.name,
      url,
      title: opts.title,
      description: opts.description,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image.url],
    },
  };
}
