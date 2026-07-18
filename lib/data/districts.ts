import type { District } from "./types";
import { SITE } from "../config";
import { anadolu1 } from "./d-anadolu-1";
import { anadolu2 } from "./d-anadolu-2";
import { avrupa1 } from "./d-avrupa-1";
import { avrupa2 } from "./d-avrupa-2";
import { avrupa3 } from "./d-avrupa-3";
import { avrupa4 } from "./d-avrupa-4";

/** 39 ilçenin tamamı — alfabetik sıralı */
export const districts: District[] = [
  ...anadolu1,
  ...anadolu2,
  ...avrupa1,
  ...avrupa2,
  ...avrupa3,
  ...avrupa4,
].sort((a, b) => a.name.localeCompare(b.name, "tr"));

export const anadoluDistricts = districts.filter((d) => d.yaka === "anadolu");
export const avrupaDistricts = districts.filter((d) => d.yaka === "avrupa");

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

/** İki koordinat arası mesafe (km) — Haversine formülü */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Verilen koordinata en yakın ilçeyi (gerçek mesafe hesabıyla) döndürür.
 * GeoDetect bileşeni bunu kullanır — yaka (Anadolu/Avrupa) tahmini veya rastgele seçim YAPMAZ.
 */
export function nearestDistrict(lat: number, lng: number): District {
  let closest = districts[0];
  let minDist = Infinity;
  for (const d of districts) {
    const dist = haversineKm(lat, lng, d.lat, d.lng);
    if (dist < minDist) {
      minDist = dist;
      closest = d;
    }
  }
  return closest;
}

/**
 * Google Maps embed URL — sadece ilçe/bölge adını sorgular (ör. "Kadıköy, İstanbul").
 * DİKKAT: Sorguya "çekici hizmeti" gibi bir hizmet/işletme anahtar kelimesi EKLEME —
 * bu durumda Google harita, aramaya uyan RAKİP firmaları da pin olarak gösterir.
 * Sadece yer adı sorgulanırsa harita o bölgenin tek bir konum işaretiyle (nötr) açılır.
 */
export function districtMapEmbed(name: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${name}, İstanbul`)}&output=embed&hl=tr`;
}

/**
 * Firmamızın kendi konumunu (koordinat bazlı, işletme adı/kategorisi OLMADAN) pinleyen harita.
 * Koordinat sorgusu her zaman tek bir nokta gösterir — rakip firma listesi riski yoktur.
 * İletişim sayfası gibi "bizim konumumuz" gösterilen yerlerde bunu kullan, districtMapEmbed'i değil.
 */
export function businessMapEmbed(): string {
  return `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed&hl=tr`;
}

export const YAKA_LABEL: Record<"anadolu" | "avrupa", string> = {
  anadolu: "Anadolu Yakası",
  avrupa: "Avrupa Yakası",
};
