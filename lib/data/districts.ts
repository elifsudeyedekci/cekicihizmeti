import type { District } from "./types";
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

/** Google Maps embed URL — ilçe adına göre benzersiz harita */
export function districtMapEmbed(name: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${name} İstanbul çekici hizmeti`)}&output=embed&hl=tr`;
}

export const YAKA_LABEL: Record<"anadolu" | "avrupa", string> = {
  anadolu: "Anadolu Yakası",
  avrupa: "Avrupa Yakası",
};
