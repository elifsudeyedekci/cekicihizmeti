import type { Brand } from "./types";
import { brands1 } from "./brands-1";
import { brands2 } from "./brands-2";

/** 20 marka — birleşik liste */
export const brands: Brand[] = [...brands1, ...brands2];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
