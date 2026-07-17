/**
 * SİTE GENELİ SABİTLER — NAP tutarlılığı için telefon/isim/adres SADECE buradan kullanılır.
 * Hiçbir sayfada fiyat/rakam yazılmaz; tüm CTA'lar bu sabitlere bağlanır.
 */

export const SITE = {
  name: "Çekici Hizmeti İstanbul",
  legalName: "İstanbul 7/24 Oto Çekici Hizmeti",
  domain: "cekicihizmeti.com",
  url: "https://cekicihizmeti.com",
  phone: "0535 404 80 44",
  phoneHref: "tel:+905354048044",
  phoneIntl: "+90 535 404 80 44",
  whatsappNumber: "905354048044",
  email: "info@cekicihizmeti.com",
  foundingYear: 2012,
  k1Belge: "K1 Yetki Belgeli",
  city: "İstanbul",
  country: "TR",
  geo: { lat: 41.0082, lng: 28.9784 },
  openingHours: "Mo-Su 00:00-24:00",
  description:
    "İstanbul'un tüm ilçelerinde 7/24 oto çekici, yol yardım ve oto kurtarma hizmeti. Anadolu ve Avrupa Yakası'nda ortalama 20-40 dakikada yanınızdayız. K1 belgeli, sigortalı ve resmi kayıtlı.",
} as const;

/** WhatsApp linki üretir; mesaj ön-doldurulmuş gelir (örn. "Merhaba, Ümraniye'de aracım bozuldu"). */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MESSAGE =
  "Merhaba, aracım için çekici hizmeti almak istiyorum. Fiyat bilgisi alabilir miyim?";

export const CTA_TEXT = {
  callNow: "Hemen Ara: 0535 404 80 44",
  priceCall: "Fiyat almak için hemen arayınız: 0535 404 80 44",
  whatsapp: "WhatsApp'tan Yazın",
  shareLocation: "Konumunu Paylaş",
} as const;

/** Sosyal / dizin profilleri (NAP tutarlılığı — sameAs schema alanında kullanılır) */
export const PROFILES: string[] = [
  // Google Business Profile, Yandex, Apple Maps vb. profiller yayına alındıkça eklenecek
];

export const STATS = {
  yearsInService: new Date().getFullYear() - SITE.foundingYear,
  vehiclesRescued: 25000,
  avgArrivalMinutes: "20-40",
  districtsCovered: 39,
} as const;
