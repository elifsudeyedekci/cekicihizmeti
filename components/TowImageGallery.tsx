import Image from "next/image";
import { getTowImages } from "@/lib/data/images";

/**
 * Sayfa/blog başına 2-3 çekici görseli — merkezi havuzdan (lib/data/images.ts) rotasyonla,
 * konuya özgü SEO alt-text ile. `seed` sayfa slug'ı olmalı (rotasyon deterministik olsun diye);
 * `keyword` ilçe/marka/hizmet/konu adı olmalı (alt-text'e girer).
 */
export function TowImageGallery({
  seed,
  keyword,
  count = 2,
  locale = "tr",
}: {
  seed: string;
  keyword: string;
  count?: number;
  locale?: "tr" | "en" | "ar";
}) {
  const images = getTowImages(seed, keyword, count, locale);
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {images.map((img, i) => (
        <figure key={img.id + i} className="overflow-hidden rounded-xl border border-[var(--color-navy-100)]">
          <Image
            src={img.file}
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            className="h-48 w-full object-cover sm:h-56"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </figure>
      ))}
    </div>
  );
}
