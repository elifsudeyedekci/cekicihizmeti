/**
 * Merkezi görsel veri katmanı — TÜM sayfalar görsellerini SADECE buradan alır.
 * Şu an temsili/geçici görsellerdir (Wikimedia Commons, CC0/CC BY/CC BY-SA lisanslı çekici
 * fotoğrafları). Gerçek araç/ekip fotoğrafları geldiğinde SADECE aşağıdaki `TOW_IMAGES`
 * dizisindeki `file` alanlarını `public/images/cekici/` içindeki yeni dosyalarla değiştirmeniz
 * yeterlidir — hiçbir sayfa kodunu değiştirmeniz gerekmez.
 */

export interface TowImage {
  id: string;
  file: string;
  width: number;
  height: number;
  /** Lisans/kaynak notu — CC BY ve CC BY-SA görseller için atıf zorunludur, bkz. /public/images/cekici/CREDITS.md */
  credit: string;
}

export const TOW_IMAGES: TowImage[] = [
  {
    id: "platform-yukleme",
    file: "/images/cekici/cekici-platform-yukleme-01.webp",
    width: 1600,
    height: 900,
    credit: "Georg Pik, Wikimedia Commons (CC0)",
  },
  {
    id: "otoyol-yol-yardim",
    file: "/images/cekici/otoyol-yol-yardim-cekici-02.webp",
    width: 1600,
    height: 1200,
    credit: "Florida's Turnpike Enterprise, Wikimedia Commons (CC0)",
  },
  {
    id: "flatbed-tasima",
    file: "/images/cekici/flatbed-cekici-arac-tasima-03.webp",
    width: 1600,
    height: 1068,
    credit: "Л.П. Джепко, Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "sehir-ici-cekici",
    file: "/images/cekici/sehir-ici-oto-cekici-04.webp",
    width: 1600,
    height: 887,
    credit: "High Contrast, Wikimedia Commons (CC BY 3.0 DE)",
  },
  {
    id: "agir-vasita-cekici",
    file: "/images/cekici/agir-vasita-cekici-05.webp",
    width: 1600,
    height: 1062,
    credit: "Wikimedia Commons (CC BY 4.0)",
  },
  {
    id: "gece-cekici",
    file: "/images/cekici/gece-cekici-hizmeti-06.webp",
    width: 1600,
    height: 1200,
    credit: "Wikimedia Commons (CC BY 4.0)",
  },
];

/**
 * Alt-text şablonları dile göre ayrılmıştır — sayfa TR/EN/AR olsa da alt-text her zaman
 * o sayfanın diliyle aynı dilde olmalı (karışık dilli alt-text SEO açısından zayıftır).
 * `keyword` burada YALIN bir isim olmalı (ör. "Kadıköy", "Oto Çekici", "BMW") — "çekici
 * hizmeti" gibi ekler zaten şablonlarda var, keyword'e tekrar eklenirse çift ifade oluşur.
 */
const ALT_TEMPLATES: Record<"tr" | "en" | "ar", ((keyword: string) => string)[]> = {
  tr: [
    (k) => `${k} 7/24 oto çekici hizmeti`,
    (k) => `${k} bölgesinde platformlu oto çekici aracı`,
    (k) => `${k} için yol yardım ve oto kurtarıcı hizmeti`,
  ],
  en: [
    (k) => `${k} 24/7 tow truck service`,
    (k) => `Flatbed tow truck for ${k}`,
    (k) => `Roadside assistance and vehicle recovery for ${k}`,
  ],
  ar: [
    (k) => `خدمة سطحة سحب سيارات على مدار الساعة لـ${k}`,
    (k) => `شاحنة سحب بمنصة مسطحة لـ${k}`,
    (k) => `مساعدة على الطريق وإنقاذ المركبات لـ${k}`,
  ],
};

/** Basit, deterministik string hash — build'ler arası aynı seed her zaman aynı rotasyonu üretir. */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

export interface TowImagePick extends TowImage {
  alt: string;
}

/**
 * Bir sayfa için (seed = slug, keyword = ilçe/marka/hizmet/konu adı) havuzdan
 * `count` adet görsel döndürür; havuz içinde rotasyonla dağıtır, her sayfada
 * SEO alt-text konuya özgü ve sayfa diliyle aynı dilde üretilir.
 */
/**
 * "çekici hizmeti" / "tow truck service" / "سطحة سحب" ifadesinin başlık içinde NEREDE geçtiğine
 * bakmaksızın (başta, sonda, ortada) temizler — Türkçe büyük noktalı İ harfi JS'te /i bayrağıyla
 * ASCII "i" ile eşleşmediği için "İstanbul" varyantı ayrıca bir karakter sınıfıyla ele alınır.
 */
const TITLE_NOISE: Record<"tr" | "en" | "ar", RegExp[]> = {
  tr: [/çekici hizmeti(\s+[iİ]stanbul)?/gi, /üzerinde araç arızası ve çekici/gi],
  en: [/tow truck service(\s+istanbul)?/gi],
  ar: [/خدمة سطحة سحب سيارات/gi, /خدمة سطحة سحب/gi, /سطحة سحب سيارات/gi, /سطحة سحب/gi],
};

/** "7/24" / "24/7" / "على مدار الساعة" gibi zaman ifadeleri tek başına anlamlı bir anahtar kelime değildir. */
const TIME_TOKENS: Record<"tr" | "en" | "ar", RegExp> = {
  tr: /7\/24/gi,
  en: /24\/7/gi,
  ar: /على مدار الساعة/gi,
};

const FALLBACK_KEYWORD: Record<"tr" | "en" | "ar", string> = {
  tr: "İstanbul",
  en: "Istanbul",
  ar: "إسطنبول",
};

/**
 * Blog başlığından alt-text için yalın anahtar kelime çıkarır (ör. "Kadıköy Çekici Hizmeti | 7/24"
 * → "Kadıköy", "BMW Çekici Hizmeti İstanbul | 7/24" → "BMW"). Amaç: getTowImages'in ürettiği
 * alt-text şablonlarıyla "çekici hizmeti çekici hizmeti" gibi tekrar oluşmasını önlemek.
 * Geriye anlamlı bir kelime kalmazsa (ör. salt "24/7 Tow Truck Service Istanbul" başlığı) şehir
 * adına düşer.
 */
export function blogAltKeyword(title: string, locale: "tr" | "en" | "ar" = "tr"): string {
  let result = title.split("|")[0].trim();
  for (const re of TITLE_NOISE[locale]) {
    result = result.replace(re, " ");
  }
  result = result
    .replace(TIME_TOKENS[locale], " ")
    .replace(/[?!,.:;-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return result || FALLBACK_KEYWORD[locale];
}

export function getTowImages(
  seed: string,
  keyword: string,
  count = 2,
  locale: "tr" | "en" | "ar" = "tr"
): TowImagePick[] {
  const start = hashSeed(seed) % TOW_IMAGES.length;
  const templates = ALT_TEMPLATES[locale];
  const picks: TowImagePick[] = [];
  for (let i = 0; i < count; i++) {
    const img = TOW_IMAGES[(start + i) % TOW_IMAGES.length];
    const alt = templates[i % templates.length](keyword);
    picks.push({ ...img, alt });
  }
  return picks;
}
